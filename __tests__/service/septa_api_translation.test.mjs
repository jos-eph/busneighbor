import { ALERT_SB_DISCONTINUED_ONE_ALERT } from "../stubs/septa_api_samples";
import { ProcessedAlert, DirectionsImpacted, 
    createProcessedAlert, determineDirectionsImpacted } from "../../service/septa_api_translation";



const EXPECTED_ALERT = {
    routeType: "bus",
    routeId: "bus_route_45",
    routeName: "45",
    compoundMessage: "until 12/31/24, SB discontinued transit stop, 12th & Locust.",
    detourId: "4624",
    detourStartLocation: "12th & Locust",
    detourReason: "Construction",
    directionsImpacted: new DirectionsImpacted(["S"])
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