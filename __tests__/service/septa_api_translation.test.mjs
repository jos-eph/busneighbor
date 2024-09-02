import { LOCATION_STUB, ALERT_STUB } from "../stubs/septa_api_samples";
import { includesAsWord, ProcessedAlert, DirectionsImpacted } from "../../service/septa_api_translation";

const TEXT_SOUGHT_WORD_EXPECTED_OUTCOME = [
    ["ABC", "ABC", true],
    [" ABC", "ABC", true],
    ["ABC ", "ABC", true],
    ["ABC/DEF", "ABC", true],
    ["abc ", "ABC", false],
    ["kirk", "spock", false],
    ["Affecting NB.", "NB", true],
    ["Affecting NB/SB; some issues remain.", "SB", true]
];
  
test.each(TEXT_SOUGHT_WORD_EXPECTED_OUTCOME)('Expect %j contains %j -- return %p', (text, sought, expected) => {
      expect(includesAsWord(text, sought)).toBe(expected);
  }
);

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
