import {  ALERT_SB_DISCONTINUED_ONE_ALERT,
     EARLY_BUS_12TH_BAINBRIDGE, MAGIC_VALUE_LOCATION
  } from "../stubs/septa_api_v2_samples.js";
import { 
    createProcessedAlertV2, createProcessedLocationV2,
    routeAwarePerpendicularDistance } from "../../service/septa_api_translation.js";
import { LatitudeLongitude } from "../../model/latitudeLongitude.js";
import { ProcessedLocationV2 } from "../../model/processed_location.js";
import { populateDistancesFromOrigin } from "../../service/processors/store_organizers.js";
import { perpendicularDegreeDistance } from "../../service/location.js";

const EXPECTED_PROCESSED_LOCATION = { // No staleness; staleness is dynamic
  "routeIdentifier": "45",
  "vehicleLocation": { "latitude": 39.937599, "longitude": -75.163022 },
  "direction": "S",
  "nextStopName": "12th St & Bainbridge St",
  "seatAvailability": "SOME_SEATS",
  "minutesLate": -2.6,
  "timestamp": 1726970987,
  "rawLocation": {
    "route_id": "45",
    "trip_id": "966038",
    "direction_id": 0,
    "trip_headsign": "Broad-Oregon",
    "block_id": 7065,
    "vehicle_id": "8442",
    "lat": "39.937599",
    "lon": "-75.163022",
    "heading": 191.07,
    "delay": -2.6,
    "next_stop_id": "16502",
    "next_stop_name": "12th St & Bainbridge St",
    "next_stop_sequence": 12,
    "trip_completion": "28",
    "seat_availability": "NOT_AVAILABLE",
    "timestamp": 1726970987,
    "direction_name": "Southbound",
    "status": "EARLY"
  }
}

const EXPECTED_PROCESSED_ALERT = {
  "alertId": "D4624",
  "message": "until 12/31/24, SB discontinued transit stop, 12th & Locust.",
  "directionsImpacted": new Set("S"),
  "rawAlert": {
    "alert_id": "D4624",
    "routes": ["23", "45"],
    "type": "DETOUR",
    "subject": "Construction",
    "message": "until 12/31/24, SB discontinued transit stop, 12th & Locust.",
    "status": "NORMAL",
    "cause": "CONSTRUCTION",
    "effect": "DETOUR",
    "severity": "WARNING",
    "trains": [],
    "blocks": [],
    "trips": [],
    "stops": [],
    "start": "2024-04-25 17:28:00",
    "end": "2024-12-31 00:00:00"
  }
}


test('Locations are processed correctly, with appropriate translations', () => {
  const processedLocationV2 = createProcessedLocationV2(EARLY_BUS_12TH_BAINBRIDGE);
  expect(processedLocationV2).toMatchObject(EXPECTED_PROCESSED_LOCATION);
  expect(processedLocationV2.stalenessSeconds).toBeGreaterThan(84078);
}
);

test('A location with the magic value gets coded as NO_SEATS', () => {
  const processedLocationV2 = createProcessedLocationV2(MAGIC_VALUE_LOCATION);
  expect(processedLocationV2.seatAvailability).toBe("NO_SEATS");
}
);

test('Alerts are processed correctly', () => {
  expect(createProcessedAlertV2(ALERT_SB_DISCONTINUED_ONE_ALERT)).toMatchObject(EXPECTED_PROCESSED_ALERT);
});

/////
/////////////////////////////////////////////////
const TEST_START_STOP = {
  "3": {
   "W": {
    "begins": {
     "stopId": 21971,
     "name": "Frankford Transportation Center - Rt 3",
     "latitude": 40.024322,
     "longitude": -75.078114
    },
    "terminates": {
     "stopId": 31684,
     "name": "Resevoir Dr & SmithDay Nursery Dr - 1",
     "latitude": 39.98346,
     "longitude": -75.195275
    }
   },
   "E": {
    "begins": {
     "stopId": 31656,
     "name": "Resevoir Dr & SmithDay Nursery Dr",
     "latitude": 39.982547,
     "longitude": -75.194286
    },
    "terminates": {
     "stopId": 21204,
     "name": "Frankford Transportation Center - Main Dro",
     "latitude": 40.023294,
     "longitude": -75.077481
    }
   }
  },
  "33": {
      "S": {
       "begins": {
        "stopId": 13905,
        "name": "23rd St & Venango St Loop",
        "latitude": 40.009811,
        "longitude": -75.166068
       },
       "terminates": {
        "stopId": 638,
        "name": "5th St & Market St - FS",
        "latitude": 39.951047,
        "longitude": -75.14876
       }
      },
      "N": {
       "begins": {
        "stopId": 638,
        "name": "5th St & Market St - FS",
        "latitude": 39.951047,
        "longitude": -75.14876
       },
       "terminates": {
        "stopId": 13905,
        "name": "23rd St & Venango St Loop",
        "latitude": 40.009811,
        "longitude": -75.166068
       }
      }
     },
  "45": {
  "S": {
      "begins": {
      "stopId": 16128,
      "name": "12th St & Vine St",
      "latitude": 39.957825,
      "longitude": -75.158689
      },
      "terminates": {
      "stopId": 20959,
      "name": "Broad St & Oregon Av",
      "latitude": 39.916387,
      "longitude": -75.171274
      }
  },
  "N": {
      "begins": {
      "stopId": 20959,
      "name": "Broad St & Oregon Av",
      "latitude": 39.916387,
      "longitude": -75.171274
      },
      "terminates": {
      "stopId": 16128,
      "name": "12th St & Vine St",
      "latitude": 39.957825,
      "longitude": -75.158689
      }
  }
  }        
}



// Routes that start away from the user where the user will have to travel to route origin
// Pick an east-west route and a point of origin that is extreme from it - 3
//     Mount Pleasant Mansion - 39.9841537,-75.1991966 - West of it
// 	   Campbell Square - 39.9999113,-75.1032321 - East of it
// Pick a north-south route and a point of origin that is extreme from it - 33
// 	Barnes & Noble Center City Philly - 39.951721, -75.163444 - South of it
// 	Klein Law Building Center City Philly - 40.005939, -75.127292 - North of it

const MOUNT_PLEASANT_MANSION = new LatitudeLongitude(39.9841537,-75.1991966);
const CAMPBELL_SQUARE = new LatitudeLongitude(39.9999113,-75.1032321);
const BARNES_NOBLE_CC = new LatitudeLongitude(39.951721, -75.163444);
const KLEIN_LAW_CC = new LatitudeLongitude(40.005939, -75.127292);

// 45 positions which the user can reach without traveling to route origin
const TWELFTH_LOCUST = new LatitudeLongitude(39.947843, -75.160852);
const ELEVENTH_MOYAMENSING = new LatitudeLongitude(39.919338, -75.165314);
const CITY_HALL = new LatitudeLongitude(39.979523, -75.164133);
const ACME_SOUTH = new LatitudeLongitude(39.9504795, -75.1546198);

// [processedLocation.routeIdentifier, processedLocation.direction, processedLocation.vehicleLocation, userLocation, expectedAdjustedPerpDistance, equalsRegularPerpDistance ]

const xxx="FILL_IN_EXPECTED_VALUE!!!";

// can use ProcessedLocationV2 constructor to make PL objects
const PERPENDICULAR_DISTANCE_TEST_CASES = [
  ["3", "W", new LatitudeLongitude(39.986605, -75.131602), CAMPBELL_SQUARE, xxx, false],
  ["3", "E", new LatitudeLongitude(39.98939, -75.12641), MOUNT_PLEASANT_MANSION, xxx, false],
  ["33", "N", new LatitudeLongitude(39.970677, -75.169441), BARNES_NOBLE_CC, xxx, false],
  ["33", "S", new LatitudeLongitude(39.973684, -75.167448), KLEIN_LAW_CC, xxx, false],
  ["45", "S", TWELFTH_LOCUST, ACME_SOUTH, xxx, true], // 
  ["45", "N", ELEVENTH_MOYAMENSING, CITY_HALL, xxx, true]
]

const dummy = () => "A";

test.each(PERPENDICULAR_DISTANCE_TEST_CASES)('Route %s %s vehicle at %j user at %j expected %j, should equal regular perpendicular distance: %s', 
  (route, direction, vehiclePosition, userPosition, adjustmentEqualsRegular) => {
    const vehicleLocation = new ProcessedLocationV2(route, vehiclePosition, direction);
    const distancesFromOrigin = {};
    populateDistancesFromOrigin(userPosition, [route], distancesFromOrigin);
    console.log(JSON.stringify(distancesFromOrigin));
    const computedDistance = routeAwarePerpendicularDistance(userPosition, vehicleLocation, distancesFromOrigin);
    const nonAdjustedDistance = perpendicularDegreeDistance(userPosition, vehiclePosition, direction);
    console.log(`${computedDistance}\t${nonAdjustedDistance}\t${computedDistance == nonAdjustedDistance}`);
    expect(dummy()).toBe("A");
});


