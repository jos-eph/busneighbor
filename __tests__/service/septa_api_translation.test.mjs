import { ALERT_SB_DISCONTINUED_ONE_ALERT, LOCATION_AT_12TH_CATHERINE  } from "../stubs/septa_api_samples";
import { ProcessedAlert, 
    createProcessedAlert, determineDirectionsImpacted,
translateSeatClassification, createProcessedLocation, 
translateDirectionLongForm, MAGIC_TIMESTAMP_FOR_STOPPED_BUS } from "../../service/septa_api_translation";
import { DirectionsImpacted } from "../../service/septa_api_translation";


const EXPECTED_ALERT = {
    routeType: "bus",
    routeId: "bus_route_45",
    routeName: "45",
    compoundMessage: "until 12/31/24, SB discontinued transit stop, 12th & Locust.",
    detourId: "4624",
    detourStartLocation: "12th & Locust",
    detourReason: "Construction",
    directionsImpacted: {"N": false, "S": true, "W": false, "E": false}
}

test('Constructor for ProcessedAlert works', () => {
    const resultAlert = new ProcessedAlert(
        EXPECTED_ALERT.routeType,
        EXPECTED_ALERT.routeId,
        EXPECTED_ALERT.routeName,
        EXPECTED_ALERT.compoundMessage,
        EXPECTED_ALERT.detourId,
        EXPECTED_ALERT.detourStartLocation,
        EXPECTED_ALERT.detourReason,
        EXPECTED_ALERT.directionsImpacted
    );

    expect(resultAlert).toEqual(EXPECTED_ALERT);
});


const EXPECTED_DIRECTION_OBJECT_CORRELATIONS = [
    [["N"], {"N": true, "S": false, "W": false, "E": false}],
    [["S"], {"N": false, "S": true, "W": false, "E": false}],
    [["W"], {"N": false, "S": false, "W": true, "E": false}],
    [["E"], {"N": false, "S": false, "W": false, "E": true}],
    [["E", "N"], {"N": true, "S": false, "W": false, "E": true}],
    [["E", "S", "N"], {"N": true, "S": true, "W": false, "E": true}],
]

test.each(EXPECTED_DIRECTION_OBJECT_CORRELATIONS)
('Expect %j to return %s', (testDirections, expected) => {
    expect(new DirectionsImpacted(testDirections)).toEqual(expected);
});

const DIRECTION_TEXT_PROCESSED_IMPACT = [
    ["Hello, this is SB, NB", {"N": true, "S": true, "E": false, "W": false}],
    ["Hello, this is WB, EB", {"N": false, "S": false, "E": true, "W": true}],
    ["NB.", {"N": true, "S": false, "E": false, "W": false}],
    ["SB.", {"N": false, "S": true, "E": false, "W": false}],
    ["EB.", {"N": false, "S": false, "E": true, "W": false}],
    ["WB.", {"N": false, "S": false, "E": false, "W": true}],
]

test.each(DIRECTION_TEXT_PROCESSED_IMPACT)
('Expect %j to return %j', (testString, expectedDirections) => {
    expect(determineDirectionsImpacted(testString)).toEqual(expectedDirections);
});

test('Alerts are processed correctly, with impacted directions', () => {
    expect(createProcessedAlert(ALERT_SB_DISCONTINUED_ONE_ALERT)).toEqual(EXPECTED_ALERT);
});

const RAW_SEAT_DATA_TRANSLATED = [
    ["MANY_SEATS_AVAILABLE", "YES_SEATS"],
    ["EMPTY", "YES_SEATS"],
    ["FEW_SEATS_AVAILABLE", "SOME_SEATS"],
    ["STANDING_ROOM_ONLY", "SOME_SEATS"],
    ["NOT_AVAILABLE", "SOME_SEATS"],
    ["CRUSHED_STANDING_ROOM_ONLY", "NO_SEATS"],
    ["FULL", "NO_SEATS"],
    ["TAYLOR_SWIFT", "NO_SEATS"]
];

test.each(RAW_SEAT_DATA_TRANSLATED)
('Expect %j to be traslated as %j, with proper default values',
(presentValue, expectedTranslation) => {
    expect(translateSeatClassification(presentValue)).toBe(expectedTranslation);
});

const LONG_FORM_DIRECTION_TO_DIRECTION = [
    ["NorthBound", "N"],
    ["Southbound", "S"],
    ["eastbound", "E"],
    ["WestBound", "W"],
    ["Homebound", undefined],
    ["NighNorth", undefined]
]
test.each(LONG_FORM_DIRECTION_TO_DIRECTION)
('Expect %j in long form to translate as %p',
(text, expectedTranslation) => {
    expect(translateDirectionLongForm(text)).toBe(expectedTranslation);
});

const EXPECTED_PROCESSED_LOCATION = {
    vehicleLocation: {"latitude": 39.941833, "longitude": -75.16203},
    routeId: "45",
    trip: "966229",
    vehicleId: "3537",
    blockId: "7054",
    direction: "S",
    destination: "Broad-Oregon",
    heading: null,
    secondsLate: 222,
    nextStopId: "16504",
    nextStopName: "12th St & Catharine St",
    seatAvailabilityRaw: "EMPTY",
    seatAvailabilityTranslated: "YES_SEATS",
    positionTimestamp: 1724645461
}

test('Locations are processed correctly, with appropriate translations', () => {
    expect(createProcessedLocation(LOCATION_AT_12TH_CATHERINE)).toEqual(EXPECTED_PROCESSED_LOCATION);
});

test('The magic timestamp value for a stopped bus results in a NO_SEATS translation', () => {
    let busIsStopped = {...LOCATION_AT_12TH_CATHERINE};
    busIsStopped.timestamp = MAGIC_TIMESTAMP_FOR_STOPPED_BUS;
    expect(createProcessedLocation(busIsStopped).seatAvailabilityTranslated).toBe("NO_SEATS");
});