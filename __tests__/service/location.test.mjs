import { getCurrentCoordinatesPromise, isApproachingMe,
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
console.log(JSON.stringify(northSouthComingTowards));
const northSouthAlsoComingTowards = produceTestCase(STADIUM_COORDINATES, false, true, "NB"); // true
const northSouthGoingAway = produceTestCase(STADIUM_COORDINATES, false, true, "SB"); // false
const eastWestComingTowards = produceTestCase(STADIUM_COORDINATES, true, false, "WB"); // true
const eastWestAlsoComingTowards = produceTestCase(STADIUM_COORDINATES, false, false, "EB"); // true
const eastWestGoingAway = produceTestCase(STADIUM_COORDINATES, true, false, "EB"); // false

const TEST_CASE_EXPECTED_OUTCOME = [
    [northSouthComingTowards, true], 
    [northSouthAlsoComingTowards, true],
    [northSouthGoingAway, false],
    [eastWestComingTowards, true],
    [eastWestAlsoComingTowards, true],
    [eastWestGoingAway, false]
];
  
test.each(TEST_CASE_EXPECTED_OUTCOME)('Expect %j -- to return %p', (testCase, expected) => {
  expect(isApproachingMe(testCase.userCoordinates, testCase.vehicleCoordinates, testCase.vehicleDirection)).toBe(expected);
  });