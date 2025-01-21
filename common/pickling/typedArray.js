import { setPickleable, testPickleable } from "./utils.js";

class TypedArray extends Array {
    constructor(...args) {
        for (const arg of args) {
            testPickleable(arg);
        }
        super(...args);
        setPickleable(this);
    }

    push(obj) {
        testPickleable(obj);
        super.push(obj);
    }
}

export { TypedArray }