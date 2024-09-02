import { includesAsWord, concatenateStrings } from "../../common/utilities";

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

test('Falsy items concatenate as empty strings', () => {
    expect(concatenateStrings(null, "   ", "ab", "", "cd", undefined, NaN)).toBe("   abcd");
});