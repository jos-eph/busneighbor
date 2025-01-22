// Identify elements

const ROUTE_SUBMISSION_FORM = "routeSubmissionForm";
const ROUTE_SUBMISSION_INPUT = "busRouteInput";
const KEYUP_EVENT = "keyup";
const SUBMIT_EVENT = "submit";
const ENTER_KEY = "Enter";

const formElement = document.getElementById(ROUTE_SUBMISSION_FORM);
const inputElement = document.getElementById(ROUTE_SUBMISSION_INPUT);

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
 * Description placeholder
 *
 * @param {*} submitEvent 
 */
function handleSubmitEvent(submitEvent) {
    testEventOfType(submitEvent, SUBMIT_EVENT);
    alert("Submit event triggered!");
}



// Register listeners
inputElement.addEventListener(KEYUP_EVENT, handleKeyPress);
formElement.addEventListener(SUBMIT_EVENT, handleSubmitEvent);

console.log("Hello, world!");