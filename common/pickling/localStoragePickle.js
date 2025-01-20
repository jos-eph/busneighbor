import { isPickleable, testPickleable } from "./utils.js";
import { TypedArray } from "./typedArray.js";
import { TypedSet } from "./typedSet.js";

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

    storeSet(key, typedSet) {
        if (!(typedSet instanceof TypedSet)) {
            throw new TypeError("Must add a typed set!");
        }

        const setKey = `${this.setPrefix}${key}`;
        this.set(setKey, typedSet.toJsonString());
    }

    retrieveSet(key) {
        const setKey = `${this.setPrefix}${key}`;
        const retrieved = this.get(setKey);
        return new TypedSet(retrieved);
    }
    
}

export { LocalStoragePickle }