import { SetSelectionData } from "./set_selection_data.js"
import { KEYUP_EVENT, SUBMIT_EVENT, CHANGE_EVENT, ENTER_KEY, PARENT_NAME_SUFFIX, parentDivName,
    ITEM_EXISTS_COLOR, ITEM_IN_SET_COLOR, CANT_SUBMIT_COLOR, INVALID_ITEM_COLOR, DEFAULT_INPUT_COLOR } 
    from "./set_selection_constants.js";
import { assertEventOfType, assertElementOfTag } from "../common/interaction_utils.js";

const COLOR_BLINK_LENGTH = 150;

const assertEventForInputBox = (setSelection, event) => {
    if (setSelection.submissionElements.has(event.target)) { return; } 
    else {
        throw new Error("Tested event is not for box!");        
    }
}

const resetColors = (setSelection) => {
    setSelection.textInputElement.style.backgroundColor = DEFAULT_INPUT_COLOR;
    setSelection.submitElement.style.backgroundColor = DEFAULT_INPUT_COLOR;
}

const invalidItemColorize = (setSelection) => {
    setSelection.textInputElement.style.backgroundColor = INVALID_ITEM_COLOR;
    setSelection.submitElement.style.backgroundColor = INVALID_ITEM_COLOR;
}

const isValidRoute = (setSelection, route) => setSelection.permittedItems.has(route);

const preSubmissionColor = (setSelection) => {
    const currentInput = setSelection.textInputElement.value;
    if (setSelection.permittedItems.has(currentInput)) {
        if (setSelection.selectedSet.has(currentInput)) {
            setSelection.textInputElement.style.backgroundColor = ITEM_IN_SET_COLOR;
            setSelection.submitElement.style.backgroundColor = CANT_SUBMIT_COLOR;
        }
        else {
            setSelection.textInputElement.style.backgroundColor = ITEM_EXISTS_COLOR;
            setSelection.submitElement.style.backgroundColor = ITEM_EXISTS_COLOR;
        }
    } else {
        setSelection.textInputElement.style.backgroundColor = DEFAULT_INPUT_COLOR;
        setSelection.submitElement.style.backgroundColor = DEFAULT_INPUT_COLOR;
    }
}


const checkboxRemovalFactory = (setSelection, uncheckedAction) => {
    return (event) => {
        assertEventOfType(event, CHANGE_EVENT);
        const checkbox = event.target;
        assertElementOfTag(checkbox, "input");
        if (uncheckedAction === undefined) {
            throw new Error("No action assigned for checkbox unchecked!");
        }
        if (checkbox.checked === false) {
            uncheckedAction(setSelection, checkbox);
        }
    };
}

    const removeCheckedCheckbox = (setSelection, checkbox) => {
        const name = checkbox.name;
        setSelection.selectedSet.delete(name);
        const parentDiv = document.getElementById(parentDivName(name));
        parentDiv.remove();
    }


const generateCheckbox = (setSelection, checkboxText) => {
    // debugger
    const newDiv = document.createElement("div");
    newDiv.setAttribute("id", parentDivName(checkboxText));

    const newInput = document.createElement("input");
    newInput.setAttribute("type", "checkbox");
    newInput.setAttribute("id", checkboxText);
    newInput.setAttribute("name", checkboxText);
    newInput.checked = true;

    const removeCheckboxAndDiv = checkboxRemovalFactory(setSelection, removeCheckedCheckbox);
    newInput.addEventListener(CHANGE_EVENT, removeCheckboxAndDiv);

    const newLabel = document.createElement("label");
    newLabel.setAttribute("for", checkboxText);
    newLabel.innerText = checkboxText;

    newDiv.appendChild(newInput);
    newDiv.appendChild(newLabel);

    return newDiv;

}
const getHandleKeyPress = (setSelection) => {
    return (keyUpEvent) => {
        console.log("Key up event firing!");
        assertEventOfType(keyUpEvent, KEYUP_EVENT);
        assertEventForInputBox(setSelection, keyUpEvent);
        keyUpEvent.preventDefault();
        if (keyUpEvent.key === ENTER_KEY) {
            console.log("Enter key recognized!"); // swap out the input step? Form submit event is triggered anyway
        }
        preSubmissionColor(setSelection);
    }
}

const getHandleTextChangeEvent = (setSelection) => {
    return (changeEvent) => {
        console.log("Handle text change event firing!");
        assertEventOfType(changeEvent, CHANGE_EVENT);
        assertEventForInputBox(setSelection, changeEvent);
        changeEvent.preventDefault();
        console.log("About to reset colors...");
        preSubmissionColor(setSelection);
    }
}

const textInputToCheckbox = (setSelection) => {
    const inputValue = setSelection.textInputElement.value;
    if (!setSelection.permittedItems.has(inputValue)) {
        invalidItemColorize(setSelection);
        setTimeout( () => resetColors(setSelection), COLOR_BLINK_LENGTH);
        return;
    }
    if (inputValue && !setSelection.selectedSet.has(inputValue)) {
        // debugger;
        setSelection.selectedSet.add(inputValue);
        setSelection.checkboxesElement.appendChild(generateCheckbox(setSelection, inputValue));
    }
    setSelection.textInputElement.value = ""; // generates its own change event
    setTimeout( () => resetColors(setSelection), COLOR_BLINK_LENGTH );
}

const getHandleTextSubmitEvent = (setSelection) => {
    return (submitEvent) => {
        console.log("Text submit event firing!");
        assertEventOfType(submitEvent, SUBMIT_EVENT);
        assertEventForInputBox(setSelection, submitEvent);
        submitEvent.preventDefault();
        // debugger;
        textInputToCheckbox(setSelection);
    }
}

const addCheckbox = (setSelection, checkBoxText) => {
    const checkbox = generateCheckbox(setSelection, checkBoxText);
    setSelection.checkboxesElement.appendChild(checkbox);
}

const populateInitialCheckboxes = (setSelection) => {
    for (const item of setSelection.selectedSet) {
        addCheckbox(setSelection, item);
    }
};


export { getHandleKeyPress, getHandleTextChangeEvent, getHandleTextSubmitEvent, populateInitialCheckboxes };