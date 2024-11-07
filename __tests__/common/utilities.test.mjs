import { includesAsWord, concatenateStrings, defineHiddenProperty,
    iterableToString, objectOfKeys, safeAddToKeyedSet} from "../../common/utilities.js";

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

test('Iterables are properly converted to strings and accept a custom delimiter', () => {
    expect(iterableToString(new Set(["A","B","c"]), "$$")).toBe("A$$B$$c")
});

const EXPECTED_CUSTOM_FACTORY = {
    "49": "49er",
    "76": "76er",
    "99": "99er"
}

const EXPECTED_DEFAULT_FACTORY = {
    "49": {},
    "76": {},
    "99": {}
}


const objectKeys = new Set(["49", "76", "99"]);

test('Able to build a function from an iterable of keys and a factory that takes the key as a parameter',
    () => {
        const factory = (key) => `${key}er`;
        expect(objectOfKeys(objectKeys, factory)).toMatchObject(EXPECTED_CUSTOM_FACTORY);   
    }
)

test('Default factory for objectOfKeys is an empty object',
    () => {
        expect(objectOfKeys(objectKeys)).toMatchObject(EXPECTED_DEFAULT_FACTORY);   
    }
)

test('Confirm that sets are initialized properly',
    () => {
        let newObject = {};
        let expected = {'a': new Set([1,2,5]), 'b': new Set(['A', 'B'])};

        safeAddToKeyedSet(newObject, 'a', 2);
        safeAddToKeyedSet(newObject, 'a', 2);
        safeAddToKeyedSet(newObject, 'a', 1);
        safeAddToKeyedSet(newObject, 'a', 5);
        safeAddToKeyedSet(newObject, 'b', 'A');
        safeAddToKeyedSet(newObject, 'b', 'A');
        safeAddToKeyedSet(newObject, 'b', 'B');

        expect(newObject).toMatchObject(expected);
    }
)

test('Confirm error on attempt to add set member to object with an array',
    () => {
        let oldObject = {'a': [1,2,3]};

        expect(() => safeAddToKeyedSet(oldObject, 'a', 1)).toThrow("Existing key does not hold a Set.");
    }

)


test('test defineHiddenProperty',
    () => {
        const obj = {'a': 2};
        defineHiddenProperty(obj, "parc");
        expect(obj.hasOwnProperty("parc")).toBe(true);
    }
)

