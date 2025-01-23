// Identify elements

const ROUTE_SUBMISSION_FORM = "routeSubmissionForm";
const ROUTE_SUBMISSION_INPUT = "busRouteInput";
const CHECKBOXES_DIV = "checkboxes";
const KEYUP_EVENT = "keyup";
const SUBMIT_EVENT = "submit";
const CHANGE_EVENT = "change";
const ENTER_KEY = "Enter";

const formElement = document.getElementById(ROUTE_SUBMISSION_FORM);
const inputElement = document.getElementById(ROUTE_SUBMISSION_INPUT);
const checkboxesElement = document.getElementById(CHECKBOXES_DIV);

const PARENT_NAME_SUFFIX = "DivParentSuffix"
const parentDivName = (childName) => `${childName}${PARENT_NAME_SUFFIX}`;

// Organize globals
const globalSet = new Set();

// Create handlers
function testEventOfType(event, type) {
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
function testElementOfTag(element, tag) {
    if (element.tagName.toLowerCase() !== tag.toLowerCase()) {
        throw new Error(`Tag was ${element.tagName}, not ${tag} as expected!`);
    }
    return true;
}

/**
 * React to keypresses
 *
 * @param {Event} keyUpEvent 
 */
function handleKeyPress(keyUpEvent) {
    testEventOfType(keyUpEvent, KEYUP_EVENT);
    if (keyUpEvent.key === ENTER_KEY) {
        alert("Triggering fake submit!");
    }
}


/**
 * Handle submit event
 *
 * @param {*} submitEvent 
 */
function handleSubmitEvent(submitEvent) {
    testEventOfType(submitEvent, SUBMIT_EVENT);
    alert("Submit event triggered!");
}

/**
 * React to change events, generic
 *
 * @param {Event} changeEvent 
 */
function handleChangeEvent(changeEvent) {
    testEventOfType(changeEvent, CHANGE_EVENT);
    alert(`Target ${changeEvent.target}, ${changeEvent.currentTarget}`);
}

/**
 * React to change events, checkboxes
 *
 * @param {Event} changeEvent 
 * @param {Function} uncheckedAction
 */
function checkboxRemovalFactory(uncheckedAction) {
    return (event) => {
        testEventOfType(event, CHANGE_EVENT);
        const checkbox = event.target;
        testElementOfTag(checkbox, "input");
        if (uncheckedAction === undefined) {
            throw new Error("No action assigned for checkbox unchecked!");
        }
        if (checkbox.checked === false) {
            uncheckedAction(checkbox);
        }
    };
}



// Generate checkbox
function removeCheckedCheckbox(checkbox) {
    const name = checkbox.name;
    globalSet.delete(name);
    
    const parentDiv = document.getElementById(parentDivName(name));
    parentDiv.remove();
}


function generateCheckbox(checkboxText) {
    const newDiv = document.createElement("div");
    newDiv.setAttribute("id", parentDivName(checkboxText));

    const newInput = document.createElement("input");
    newInput.setAttribute("type", "checkbox");
    newInput.setAttribute("id", checkboxText);
    newInput.setAttribute("name", checkboxText);
    newInput.checked = true;
    newInput.addEventListener(CHANGE_EVENT, checkboxRemovalFactory(removeCheckedCheckbox)); //

    const newLabel = document.createElement("label");
    newLabel.setAttribute("for", checkboxText);
    newLabel.innerText = checkboxText;

    newDiv.appendChild(newInput);
    newDiv.appendChild(newLabel);

    return newDiv;

}


// Register listeners
inputElement.addEventListener(KEYUP_EVENT, handleKeyPress);
inputElement.addEventListener(CHANGE_EVENT, handleChangeEvent);
formElement.addEventListener(SUBMIT_EVENT, handleSubmitEvent);
checkboxesElement.appendChild(generateCheckbox("A"));
checkboxesElement.appendChild(generateCheckbox("Bee"));

console.log("Hello, world!");