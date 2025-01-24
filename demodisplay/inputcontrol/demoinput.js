// Identify elements

const ROUTE_SUBMISSION_FORM = "routeSubmissionForm";
const ROUTE_SUBMISSION_INPUT = "busRouteInput";
const SUBMIT_BUTTON = "submitButton";
const CHECKBOXES_DIV = "checkboxes";
const KEYUP_EVENT = "keyup";
const SUBMIT_EVENT = "submit";
const CHANGE_EVENT = "change";
const ENTER_KEY = "Enter";

const formElement = document.getElementById(ROUTE_SUBMISSION_FORM);
const inputElement = document.getElementById(ROUTE_SUBMISSION_INPUT);
const submitElement = document.getElementById(SUBMIT_BUTTON);
const checkboxesElement = document.getElementById(CHECKBOXES_DIV);

const PARENT_NAME_SUFFIX = "DivParentSuffix"
const parentDivName = (childName) => `${childName}${PARENT_NAME_SUFFIX}`;

// Organize globals
const displayedBuses = new Set();
const VALID_ROUTES = new Set(["1","2","3","5","8","13","21", "34"]);
const BUS_EXISTS_COLOR = "lightgreen";
const BUS_IN_SET_COLOR = "grey";
const CANT_SUBMIT_COLOR = "grey";
const INVALID_BUS_COLOR = "red";
const DEFAULT_INPUT_COLOR = "";

// Typing tests

const TRYING_TO_SUBMIT_SET = new Set([inputElement, submitElement, formElement]);
/**
 * Description placeholder
 *
 * @param {Event} event 
 */
function testEventForInputBox(event) {
    if (TRYING_TO_SUBMIT_SET.has(event.target)) {
    } else {
        throw new Error("Tested event is not for box!");        
    }
}

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

// Multi-element functions
function textInputToCheckbox() {
    const inputValue = inputElement.value;
    if (inputValue && !displayedBuses.has(inputValue)) {
        displayedBuses.add(inputValue);
        checkboxesElement.appendChild(generateCheckbox(inputValue));
    }
    inputElement.value = "";
}

function matchInputColor() {
    const currentInput = inputElement.value;
    console.log(currentInput, typeof currentInput);
    if (VALID_ROUTES.has(currentInput)) {
        if (displayedBuses.has(currentInput)) {
            inputElement.style.backgroundColor = BUS_IN_SET_COLOR;
            submitElement.style.backgroundColor = CANT_SUBMIT_COLOR;
        }
        else {
            inputElement.style.backgroundColor = BUS_EXISTS_COLOR;
            submitElement.style.backgroundColor = BUS_EXISTS_COLOR;
        }
    } else {
        inputElement.style.backgroundColor = DEFAULT_INPUT_COLOR;
        submitElement.style.backgroundColor = DEFAULT_INPUT_COLOR;
    }
}


// Create handlers

/**
 * React to keypresses
 *
 * @param {Event} keyUpEvent 
 */
function handleTextInputKeyPress(keyUpEvent) {
    testEventOfType(keyUpEvent, KEYUP_EVENT);
    testEventForInputBox(keyUpEvent);
    keyUpEvent.preventDefault();
    if (keyUpEvent.key === ENTER_KEY) {
        console.log("Enter key recognized!");
    }
    matchInputColor();    
}

/**
 * Handle submit event
 *
 * @param {Event} submitEvent 
 */
function handleTextInputSubmitEvent(submitEvent) {
    testEventOfType(submitEvent, SUBMIT_EVENT);
    testEventForInputBox(submitEvent);
    submitEvent.preventDefault();
    console.log("Input box submit event triggered!");
    textInputToCheckbox();
}

/**
 * React to change events, generic
 *
 * @param {Event} changeEvent 
 */
function handleTextInputChangeEvent(changeEvent) {
    testEventOfType(changeEvent, CHANGE_EVENT);
    testEventForInputBox(changeEvent);
    matchInputColor();
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

// Checkbox handling
function removeCheckedCheckbox(checkbox) {
    const name = checkbox.name;
    displayedBuses.delete(name);
    
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
inputElement.addEventListener(KEYUP_EVENT, handleTextInputKeyPress);
inputElement.addEventListener(CHANGE_EVENT, handleTextInputChangeEvent);
formElement.addEventListener(SUBMIT_EVENT, handleTextInputSubmitEvent);
checkboxesElement.appendChild(generateCheckbox("A"));
checkboxesElement.appendChild(generateCheckbox("Bee"));

console.log("Hello, world!");