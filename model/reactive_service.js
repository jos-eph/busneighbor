/**
 * Make any object reactive. Place a function taking the trapped arguments in the "setHandler"
 * property. Set to be non-enumerable so that Object.keys() can iterate.
 * @param {Object} dataObject
 * @returns {*}
 */
const getReactiveWrapper = (dataObject) => {
    Object.defineProperty(dataObject, "setHandler", {
        value: (originalObject, property, newValue, objectAssignmentDirectedTo) => {},
        writable: true,
        enumerable: false
    });

    return new Proxy(dataObject, {
        set(originalObject, property, newValue, objectAssignmentDirectedTo) {
            const oldValue = originalObject[property];
            originalObject[property] = newValue;
            originalObject.setHandler(originalObject, property, newValue, oldValue);
            return true;
        }
    });
}

const getNewReactiveObject = () => {
    return getReactiveWrapper({});
}

export { getReactiveWrapper, getNewReactiveObject };