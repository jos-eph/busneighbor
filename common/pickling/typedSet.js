import { testPickleable } from "./utils.js";

class TypedSet extends Set {
    constructor(initialSet) {
        if (initialSet === null || initialSet === undefined)  {
            super(initialSet);
        } else {
            for (const item of initialSet) {
                testPickleable(item);
            }
            super(initialSet);
        }
    }

    add(item) {
        testPickleable(item);
        super.add(item);
    }

    toArray() {
        return Array.from(this);
    }

    toJsonString() {
        return JSON.stringify(Array.from(this));
    }
}

export { TypedSet }