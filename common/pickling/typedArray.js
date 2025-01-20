import { setPickleable, testPickleable } from "./utils.js";

class TypedArray extends Array {
    constructor(...args) {
        super(...args);
        setPickleable(this);
    }

    push(obj) {
        testPickleable(obj);
        super.push(obj);
    }
}

export { TypedArray }