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
    directionsImpacted: new DirectionsImpacted(["SB"])
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
    [["NB"], {"NB": true, "SB": false, "WB": false, "EB": false}],
    [["SB"], {"NB": false, "SB": true, "WB": false, "EB": false}],
    [["WB"], {"NB": false, "SB": false, "WB": true, "EB": false}],
    [["EB"], {"NB": false, "SB": false, "WB": false, "EB": true}],
    [["EB", "NB"], {"NB": true, "SB": false, "WB": false, "EB": true}],
    [["EB", "SB", "NB"], {"NB": true, "SB": true, "WB": false, "EB": true}],
]

test.each(EXPECTED_DIRECTION_OBJECT_CORRELATIONS)
('Expect %j to return %s', (testDirections, expected) => {
    expect(new DirectionsImpacted(testDirections)).toEqual(expected);
});

const DIRECTION_TEXT_PROCESSED_IMPACT = [
    ["Hello, this is SB, NB", {"NB": true, "SB": true, "EB": false, "WB": false}],
    ["Hello, this is WB, EB", {"NB": false, "SB": false, "EB": true, "WB": true}],
    ["NB.", {"NB": true, "SB": false, "EB": false, "WB": false}],
    ["SB.", {"NB": false, "SB": true, "EB": false, "WB": false}],
    ["EB.", {"NB": false, "SB": false, "EB": true, "WB": false}],
    ["WB.", {"NB": false, "SB": false, "EB": false, "WB": true}],
]

test.each(DIRECTION_TEXT_PROCESSED_IMPACT)
('Expect %j to return %j', (testString, expectedDirections) => {
    expect(determineDirectionsImpacted(testString)).toEqual(expectedDirections);
});

test('Alerts are processed correctly, with impacted directions', () => {
    expect(createProcessedAlert(ALERT_SB_DISCONTINUED_ONE_ALERT)).toEqual(EXPECTED_ALERT);
});