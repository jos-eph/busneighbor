import { testPickleable } from "./utils.js";

class TypedSet extends Set {
    constructor(initialSet) {
        if (initialSet === null || initialSet === undefined)  {
            super(initialSet);
        } else {
            for (const item of initialSet) {
                testPickleable(item);
            }
            console.log("Calling Set constructor on ...", initialSet);
            super(initialSet);    
        }
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