import { TypedArray } from "../../../common/pickling/typedArray.js";

test('Create TypedArray from permitted types', () => {
    const testArray = new TypedArray();
    testArray.push(null);
    testArray.push(2);
    testArray.push(2.25);
    testArray.push("linger");
    expect(testArray).toMatchObject([null, 2, 2.25, "linger"]);
});

test('typedArray with created with a Map throws a TypeError', () => {
    expect( () => {
        const testArray = new TypedArray();
        testArray.push(new Map());
    } ).toThrow(TypeError);
});