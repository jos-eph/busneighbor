import { TypedSet } from "../../../common/pickling/typedSet.js";

const EXPECTED_ARRAY = [1,6,"Hello",null];

test('TypedSet promptly de-dupes valid types', () => {
    const testSet = new TypedSet([1,1,1,6,6,6,"Hello", "Hello",null,6,1,6,null]);
    const resultObject = JSON.parse(testSet.toJsonString());
    expect(resultObject).toMatchObject(EXPECTED_ARRAY);
});

test('TypedSet catches invalid types', () => {
    expect( () => {new TypedSet([2,new Map()])} ).toThrow(TypeError);
});