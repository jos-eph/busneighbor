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
        const deserialized = JSON.parse(value);
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
        const retrieved = this.deserialize(this.get(setKey));
        if (retrieved) {
            console.log(`Returning stored set ${JSON.stringify(retrieved)}`);
            return new TypedSet(retrieved);
        }
        return null;
    }
    
}

export { LocalStoragePickle }