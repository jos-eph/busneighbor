import { testPickleable } from "./utils";

class TypedSet extends Set {
    constructor(initialSet) {
        for (const item of initialSet) {
            testPickleable(item);
        }
        super(initialSet);
    }

    add(item) {
        testPickleable(item);
        super.add(item);
    }

    toJsonString() {
        return JSON.stringify(Array.from(this));
    }
}

export { TypedSet }