import { testPickleable } from "./utils.js";

class TypedSet extends Set {
    constructor(initialSet) {
        if (initialSet === null || initialSet === undefined)  {
            super(initialSet);
        } else {
            console.log("Else statement; initialSet was ", initialSet);
            for (const item of initialSet) {
                testPickleable(item);
            }
            console.log("Calling Set constructor on ...", initialSet);
            super(initialSet);    // is this the problem line? can we just add the items individually???
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