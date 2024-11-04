import { Indenter } from "../../common/indenter.js";

const eightLevelIndenterTest = (indenter) => {
    indenter.place("Level1");
    indenter.placeRight("Level2");
    indenter.placeRight("Level3");
    indenter.placeRight("Level4");
    indenter.placeLeft("Level5");
    indenter.placeLeft("Level6");
    indenter.placeLeft("Level7");
    indenter.placeLeft("Level8");
    return indenter;
};

const EIGHT_LEVEL_EIGHTSPACE = 
`Level1
        Level2
                Level3
                        Level4
                Level5
        Level6
Level7
Level8`;

const EIGHT_LEVEL_EIGHTSTAR = `Level1
********Level2
****************Level3
************************Level4
****************Level5
********Level6
Level7
Level8`;

const EIGHT_LEVEL_TWOSPACE = 
`Level1
  Level2
    Level3
      Level4
    Level5
  Level6
Level7
Level8`;

const INDENT_SPACER_RUNTEST_EXPECTED = [
    [8, " ", eightLevelIndenterTest, EIGHT_LEVEL_EIGHTSPACE],
    [2, " ", eightLevelIndenterTest, EIGHT_LEVEL_TWOSPACE],
    [8, "*", eightLevelIndenterTest, EIGHT_LEVEL_EIGHTSTAR]
];

test.each(INDENT_SPACER_RUNTEST_EXPECTED)('Indenter test with %j spaces and spacer %j function %p works', (spaces, spacer, testFunc, expected) => {
    const indenter = new Indenter(spaces, spacer);
    testFunc(indenter);
    expect(indenter.getFormatted()).toMatch(expected);
});

test('setLevelMultiplier changes the output spacing without changing the text', () => {
    const indenter = new Indenter(8, " ");
    eightLevelIndenterTest(indenter);
    indenter.setLevelMultiplier(2);
    expect(indenter.getFormatted()).toMatch(EIGHT_LEVEL_TWOSPACE);
});