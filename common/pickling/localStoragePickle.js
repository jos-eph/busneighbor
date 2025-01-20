import { isPickleable, testPickleable } from "./utils.js";
import { TypedArray } from "./typedArray.js";

class LocalStoragePickle {
    constructor() {
        this.setPrefix = "_typedSet_";
    }

    serialize(value) {
        testPickleable(value);
        return JSON.stringify(value);
    }

    deserialize(value) {
        return JSON.parse(value);
    }

    set(key, value) {
        localStorage.setItem(key, this.serialize(value));
    }

    get (key) {
        const retrieved = localStorage.getItem(key);
        return this.deserialize(retrieved);
    }

    


}