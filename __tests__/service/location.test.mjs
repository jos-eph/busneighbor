// Buggy - last test won't run

import { getCurrentCoordinatesPromise, isApproachingMe, isLatitudeApproaching, isLongitudeApproaching,
     LatitudeLongitude } from "../../service/location";

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
  // Route, vehicle direction, Latitude, Longitude
  [4, "S", 39.948579, -75.164376],
  [4, "N", 39.92747, -75.168974],
  [40, "E", 39.979545, -75.225339],
  [40, "W", 39.94235, -75.1465],
  ["Fake", "W", 39.952583, -75.165222],
  ["Fake", "N", 39.9521, -75.1636]
]

const MOCK_USER_LOCATION = [39.9289, -75.1645]
const EXPECTED_FAKE_VEHICLE_SCORE_AND_APPROACHING = [
  -1 * (MOCK_USER_LOCATION[0] - FAKE_VEHICLE_LOCATION_AND_DIRECTION[0][2]), true,
  MOCK_USER_LOCATION[0] - FAKE_VEHICLE_LOCATION_AND_DIRECTION[1][2], true,
  MOCK_USER_LOCATION[1] - FAKE_VEHICLE_LOCATION_AND_DIRECTION[2][3], true,
  -1 * (MOCK_USER_LOCATION[1] - FAKE_VEHICLE_LOCATION_AND_DIRECTION[3][3]), true,
  -1 * (MOCK_USER_LOCATION[1] - FAKE_VEHICLE_LOCATION_AND_DIRECTION[4][3]), false,
  MOCK_USER_LOCATION[0] - FAKE_VEHICLE_LOCATION_AND_DIRECTION[5][2], false
]
// need to test above and confirm that these calculations are correct