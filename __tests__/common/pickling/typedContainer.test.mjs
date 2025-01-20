import { TypedContainer } from "../../../common/pickling/typedContainer.js";
import { TypedArray } from "../../../common/pickling/typedArray";


function getTestArray() {
    const arr = new TypedArray();
    arr.push("abc123");
    arr.push(null);
    arr.push(false);
    return arr;
}

function getTestContainer() {
    const container = new TypedContainer();
    container.set("hello", getTestArray());
    const subContainer = new TypedContainer();
    subContainer.set("a", 321);
    subContainer.set("b", true);

    container.set("goodbye", subContainer);

    return container;
}

const EXPECTED_SERIALIZATION =
{   
    "hello": ["abc123",null,false],
    "goodbye": {"a":321, 
                "b":true
               }
}

test('Roundtrip JSON serialization with a TypedContainer works', () => {
    const container = getTestContainer();
    
    const jsonString = JSON.stringify(container);
    const jsonParsed = JSON.parse(jsonString);

    expect(jsonParsed).toMatchObject(EXPECTED_SERIALIZATION);
});

test('TypedContainer get works', () => {
    const container = getTestContainer();

    expect(container.get("hello")).toMatchObject(["abc123",null,false]);
});

test('typedContainer with created with a Map throws a TypeError', () => {
    expect( () => {
        const testContainer = new TypedContainer();
        testContainer.set("myMap", new Map());
    } ).toThrow(TypeError);
});