import { ALERT_STUB, ALERT_SB_DISCONTINUED_ONE_ALERT,
    LOCATION_STUB, EARLY_BUS_12TH_BAINBRIDGE, MAGIC_VALUE_LOCATION
  } from "../stubs/septa_api_v2_samples";
import { ProcessedAlertV2, 
    createProcessedAlertV2, createProcessedLocationV2, 
    determineDirectionsImpacted, translateSeatClassification, 
translateDirectionLongForm, MAGIC_TIMESTAMP_FOR_STOPPED_BUS } from "../../service/septa_api_translation.js";

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