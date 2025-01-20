const PERMITTED_TYPES = ["string", "boolean", "number"];

const PICKLEABLE_FLAG = "_isPickleable";

function setPickleable(obj) {
    Object.defineProperty(obj, PICKLEABLE_FLAG, {
        writable: false,
        enumerable: false,
        value: true
    })
}

function isPickleable(obj) {
    console.log("Testing this obj", obj);
    if (obj === null) {
        return true;
    }

    for (const type of PERMITTED_TYPES) {
        if (typeof obj === type) {
            return true;
        }
    }

    if (obj[PICKLEABLE_FLAG] === true) {
        return true;
    }

    return false;
}

function testPickleable(obj) {
    if (!isPickleable(obj)) {
        throw new TypeError(`Can't pickle ${JSON.stringify(obj)}`);s
    }
}

export { isPickleable, testPickleable, setPickleable }