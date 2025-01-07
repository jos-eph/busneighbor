import { LatitudeLongitude } from "../../model/latitudeLongitude.js";

import { getCurrentCoordinatesPromise, isApproachingMe, isLatitudeApproaching, isLongitudeApproaching,
     perpendicularDegreeDistance, getExtremePositions, getMinimumEnclosingRectangle } from "../../service/location";

class TestCase {
  constructor (userCoordinates, vehicleCoordinates, vehicleDirection) {
    this.userCoordinates = userCoordinates;
    this.vehicleCoordinates = vehicleCoordinates;
    this.vehicleDirection = vehicleDirection
  }
}

function produceTestCase(userCoordinates, shouldIncrease, selectLatitude, vehicleDirection) {
    if (selectLatitude) {
      const newLatitude = shouldIncrease ? userCoordinates.latitude + 0.1 : userCoordinates.latitude - 0.1
      return new TestCase(userCoordinates, new LatitudeLongitude(newLatitude, userCoordinates.longitude), vehicleDirection);
    } else {
      const newLongitude = shouldIncrease ? userCoordinates.longitude + 0.1 : userCoordinates.longitude - 0.1;
      return new TestCase(userCoordinates, new LatitudeLongitude(userCoordinates.latitude, newLongitude), vehicleDirection);
    }
  }

const STADIUM_COORDINATES = new LatitudeLongitude(-39.9012, -75.1720);
const northSouthComingTowards = produceTestCase(STADIUM_COORDINATES, true, true, "SB"); // true
const northSouthAlsoComingTowards = produceTestCase(STADIUM_COORDINATES, false, true, "NB"); // true
const northSouthGoingAway = produceTestCase(STADIUM_COORDINATES, false, true, "SB"); // false
const eastWestComingTowards = produceTestCase(STADIUM_COORDINATES, true, false, "WB"); // true
const eastWestAlsoComingTowards = produceTestCase(STADIUM_COORDINATES, false, false, "EB"); // true
const eastWestGoingAway = produceTestCase(STADIUM_COORDINATES, true, false, "EB"); // false

const TEST_APPROACHING_EXPECTED_OUTCOME = [
    [northSouthComingTowards, true], 
    [northSouthAlsoComingTowards, true],
    [northSouthGoingAway, false],
    [eastWestComingTowards, true],
    [eastWestAlsoComingTowards, true],
    [eastWestGoingAway, false]
];
  
test.each(TEST_APPROACHING_EXPECTED_OUTCOME)
('Expect %j -- to return %p', (testCase, expected) => {
  expect(isApproachingMe(testCase.userCoordinates, testCase.vehicleCoordinates, testCase.vehicleDirection)).toBe(expected);
  });

test('Proper inequalities are triggered for latitude comparison', () => { 
  expect(isLatitudeApproaching(STADIUM_COORDINATES.latitude, STADIUM_COORDINATES.latitude + 0.02, "NB")).toBe(false);
  expect(isLatitudeApproaching(STADIUM_COORDINATES.latitude, STADIUM_COORDINATES.latitude - 1, "SB")).toBe(false);
});

test('Proper inequalities are triggered for longitude comparison', () => { 
  expect(isLongitudeApproaching(STADIUM_COORDINATES.longitude, STADIUM_COORDINATES.longitude - 0.02, "WB")).toBe(false);
  expect(isLongitudeApproaching(STADIUM_COORDINATES.longitude, STADIUM_COORDINATES.longitude + 0.02, "EB")).toBe(false);
});


test('getCurrentCoordinatesPromise calls navigator.geolocation.getCurrentPosition', async () => {
  navigator.geolocation = jest.fn(); 
  const getCurrentPositionMock = jest.fn(); // Create a mock function
  navigator.geolocation.getCurrentPosition = getCurrentPositionMock;
  const resultPromise = getCurrentCoordinatesPromise();
  delete navigator.geolocation;
  expect(getCurrentPositionMock).toHaveBeenCalled(); // Assert that the mock was called
}, 10000);

test('isApproachingMe throws an error with an invalid direction', () => {
  expect(() => isApproachingMe(STADIUM_COORDINATES, STADIUM_COORDINATES, "OverTheHill")).toThrow(Error);
});

test('isLatitudeApproaching throws an error with an invalid direction', () => {
  expect(() => isLatitudeApproaching(STADIUM_COORDINATES.latitude, 
    STADIUM_COORDINATES.latitude, "OverTheHill")).toThrow(Error);
});

test('isLongitudeApproaching throws an error with an invalid direction', () => {
  expect(() => isLongitudeApproaching(STADIUM_COORDINATES.longitude, 
    STADIUM_COORDINATES.longitude, "N")).toThrow(Error);
});


test('getCurrentCoordinatesPromise returns coordinates', async () => {
  global.navigator = global.navigator || {}; // 'global' does not exist in browsers, only in Node
  global.navigator.geolocation = { getCurrentPosition: jest.fn() };
  const mockCoords = { latitude: 37.7749, longitude: -122.4194 }; // Example coordinates
  global.navigator.geolocation.getCurrentPosition.mockImplementationOnce((successCallback) => {
      successCallback({ coords: mockCoords });
  });

  const coords = await getCurrentCoordinatesPromise(); 
  expect(coords).toEqual(mockCoords);
  delete global.navigator;

});

test('getCurrentCoordinatesPromise on getCurrentPosition error, passes it along', () => {
  global.navigator = global.navigator || {};
  global.navigator.geolocation = { getCurrentPosition: jest.fn() };
  global.navigator.geolocation.getCurrentPosition.mockImplementationOnce((successCallback, failureCallback) => {
      failureCallback(new Error("Injected error!"));
  });

  return expect(getCurrentCoordinatesPromise()).rejects.toThrow('Injected error!');
});



test('Unsupported geolocation capability detected', () => {
  if (global.navigator && ('geolocation' in navigator)) {
    delete navigator.geolocation;
  }
  return expect(getCurrentCoordinatesPromise()).rejects.toThrow('Geolocation not supported by this browser.');
})

const FAKE_VEHICLE_LOCATION_AND_DIRECTION = [
  // Test case number, Route, vehicle direction, Latitude, Longitude
  [0, 4, "S", new LatitudeLongitude(39.948579, -75.164376)],
  [1, 4, "N", new LatitudeLongitude(39.92747, -75.168974)],
  [2, 40, "E", new LatitudeLongitude(39.979545, -75.225339)],
  [3, 40, "W", new LatitudeLongitude(39.94235, -75.1465)],
  [4, "Fake", "W", new LatitudeLongitude(39.952583, -75.165222)],
  [5, "Fake", "N", new LatitudeLongitude(39.9521, -75.1636)]
]

const MOCK_USER_LOCATION = new LatitudeLongitude(39.9289, -75.1645)
const EXPECTED_FAKE_VEHICLE_SCORE_AND_APPROACHING = [
  [-1 * (MOCK_USER_LOCATION.latitude - FAKE_VEHICLE_LOCATION_AND_DIRECTION[0][3].latitude), true],
  [MOCK_USER_LOCATION.latitude - FAKE_VEHICLE_LOCATION_AND_DIRECTION[1][3].latitude, true],
  [MOCK_USER_LOCATION.longitude - FAKE_VEHICLE_LOCATION_AND_DIRECTION[2][3].longitude, true],
  [-1 * (MOCK_USER_LOCATION.longitude - FAKE_VEHICLE_LOCATION_AND_DIRECTION[3][3].longitude), true],
  [-1 * (MOCK_USER_LOCATION.longitude - FAKE_VEHICLE_LOCATION_AND_DIRECTION[4][3].longitude), false],
  [MOCK_USER_LOCATION.latitude - FAKE_VEHICLE_LOCATION_AND_DIRECTION[5][3].latitude, false]
]

console.log(`Expected fake vehicle: ${EXPECTED_FAKE_VEHICLE_SCORE_AND_APPROACHING}`);

// need to test above and confirm that these calculations are correct
test.each(FAKE_VEHICLE_LOCATION_AND_DIRECTION)
('%p - Expect correct perpendicular distance for route %p going %p coordinates %p', (testCaseNumber, route, direction, vehicleLocation) => {
  expect(perpendicularDegreeDistance(MOCK_USER_LOCATION, vehicleLocation, direction)).toBe(EXPECTED_FAKE_VEHICLE_SCORE_AND_APPROACHING[testCaseNumber][0])
});


const FAKE_LOCATIONS = [
  new LatitudeLongitude(-89, 170),
  new LatitudeLongitude(-90, -134),
  new LatitudeLongitude(-20, 179.9),
  new LatitudeLongitude(70, 178),
  new LatitudeLongitude(65, -179),
  new LatitudeLongitude(90, 31),
  new LatitudeLongitude(70, 22)
]

const EXPECTED_LOCATION_EXTREMES = {
    latitude: {
        min: -90,
        max: 90
    },
    longitude: {
        min: -179,
        max: 179.9
    }
}

const EXPECTED_ENCLOSING_RECTANGLE = [
    [90, -179],
    [-90, 179.9]
];

test('We find correct maximum and minimum location', () => {
    expect(getExtremePositions(FAKE_LOCATIONS)).toMatchObject(EXPECTED_LOCATION_EXTREMES);
});

test('We enclose a set of points correctly', () => {
    expect(getMinimumEnclosingRectangle(FAKE_LOCATIONS)).toMatchObject(EXPECTED_ENCLOSING_RECTANGLE);
});