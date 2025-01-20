import { testPickleable, setPickleable } from "./utils.js";

class TypedContainer extends Object {

    constructor(...args) {
        super(...args);
        setPickleable(this);
    }

    set(propertyName, value) {
        testPickleable(value);
        this[propertyName] = value;
    }

    get(propertyName) {
        return this[propertyName];
    }
}

export { TypedContainer };