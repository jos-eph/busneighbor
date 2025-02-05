import { setIntersectionLegacy } from "/busneighbor/common/utilities.js";

import { TypedSet } from "/busneighbor/common/pickling/typedSet.js";
import { getHandleKeyPress, getHandleTextChangeEvent, 
    getHandleTextSubmitEvent, populateInitialCheckboxes } from "/busneighbor/forminput/set_selection_functions.js";
import { KEYUP_EVENT, CHANGE_EVENT, SUBMIT_EVENT } from "/busneighbor/forminput/set_selection_constants.js";

const DEFAULT_PERMITTED_SET = new TypedSet(["45", "33", "38", "29", "47", "4", "40"]);

// Stores objects relating to input and the current input
class SetSelectionData {

    constructor(permitted, formElement, textInputElement, submitElement, checkboxesElement, startupSet) {
        this.permittedItems = permitted!==undefined ? permitted : DEFAULT_PERMITTED_SET;
        this.formElement = formElement;
        this.textInputElement = textInputElement;
        this.submitElement = submitElement;
        this.checkboxesElement = checkboxesElement;
        this.afterChangeAction = undefined;

        this.submissionElements = new Set([formElement, textInputElement, submitElement]);

        if (startupSet === undefined) startupSet = DEFAULT_PERMITTED_SET;

        this.selectedSet = new TypedSet(setIntersectionLegacy(this.permittedItems, startupSet)); // Set.prototype.intersection() was just introduced in 2024
        console.log(`SetSelectionInput initialized to ${this.selectedSet.toJsonString()}`);    
    }

    viewSelection() {
        return new TypedSet(this.selectedSet);
    }

    setChangeAction(func) {
        this.afterChangeAction = func;
    }


}

const getResponsiveSetSelectionData = (permitted, formElement, textInputElement,
     submitElement, checkboxesElement, startupSet) => {
        const setSelection = new SetSelectionData(permitted, formElement, 
            textInputElement, submitElement, checkboxesElement, startupSet);
        setSelection.textInputElement.addEventListener(KEYUP_EVENT, getHandleKeyPress(setSelection));
        setSelection.textInputElement.addEventListener(CHANGE_EVENT, getHandleTextChangeEvent(setSelection));
        setSelection.formElement.addEventListener(SUBMIT_EVENT, getHandleTextSubmitEvent(setSelection));
        populateInitialCheckboxes(setSelection);
        return setSelection;
     }


export { SetSelectionData, getResponsiveSetSelectionData };