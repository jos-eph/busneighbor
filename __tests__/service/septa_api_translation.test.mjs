import { LOCATION_STUB, ALERT_STUB } from "../stubs/septa_api_samples";
import { includesAsWord, ProcessedAlert } from "../../service/septa_api_translation";

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
    detourReason: "Construction"
}

test('Constructor for ProcessedAlert works', () => {
    const resultAlert = new ProcessedAlert(
        EXPECTED_ALERT.routeType,
        EXPECTED_ALERT.routeId,
        EXPECTED_ALERT.routeName,
        EXPECTED_ALERT.compoundMessage,
        EXPECTED_ALERT.detourId,
        EXPECTED_ALERT.detourStartLocation,
        EXPECTED_ALERT.detourReason
    );

    expect(resultAlert).toEqual(EXPECTED_ALERT);
});