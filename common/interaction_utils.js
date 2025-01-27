
/**
 * Confirm an event is of a certain type
 *
 * @param {Event} event 
 * @param {string} type 
 * @returns {boolean} 
 */
function assertEventOfType(event, type) {
    if (!(event instanceof Event)) {
        throw new TypeError("Not an event!");
    }

    if ((event.type) != type) {
        throw new Error(`Type was ${event.type}, not ${type} as expected!`);
    }
    
    return true;
}

/**
 * Confirm an element is of a particular tag
 *
 * @param {HTMLElement} element 
 * @param {string} tag 
 * @returns {boolean} 
 */
function assertElementOfTag(element, tag) {
    if (element.tagName.toLowerCase() !== tag.toLowerCase()) {
        throw new Error(`Tag was ${element.tagName}, not ${tag} as expected!`);
    }
    return true;
}

export { assertElementOfTag, assertEventOfType };
