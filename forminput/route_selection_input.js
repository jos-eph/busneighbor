import { KEYUP_EVENT, SUBMIT_EVENT, CHANGE_EVENT, ENTER_KEY, PARENT_NAME_SUFFIX, parentDivName,
    BUS_EXISTS_COLOR, BUS_IN_SET_COLOR, CANT_SUBMIT_COLOR, INVALID_BUS_COLOR, DEFAULT_INPUT_COLOR } 
    from "./route_selection_constants";

import { setIntersectionLegacy } from "../common/utilities.js";

import { testElementOfTag, testEventOfType } from "../common/interaction_utils.js";
import { TypedSet } from "../common/pickling/typedSet.js";

const DEFAULT_PERMITTED_ROUTES = new TypedSet(["45", "33", "38", "29", "47", "4", "40"]);

// I/O for preferences only
// Manages set and visual appearance
// Other objects manage store
class RouteSelectionInput {

    constructor(permittedRoutes, formElement, textInputElement, submitElement, checkboxesElement, startupRoutes) {
        this.permittedRoutes = permittedRoutes===undefined ? permittedRoutes : DEFAULT_PERMITTED_ROUTES;
        this.formElement = formElement;
        this.textInputElement = textInputElement;
        this.submitElement = submitElement;
        this.checkboxesElement = checkboxesElement;

        this.submissionElements = new Set([formElement, textInputElement, submitElement]);

        if (startupRoutes === undefined) startupRoutes = DEFAULT_PERMITTED_ROUTES;

        this.displayedBuses = new TypedSet(setIntersectionLegacy(this.permittedRoutes, startupRoutes)); // Set.prototype.intersection() was just introduced in 2024
        console.log(`RouteSelectionInput initialized to ${this.displayedBuses.toJsonString()}`);
    }

    testEventForInputBox(event) {
        if (this.submissionElements.has(event.target)) { return; } 
        else {
            throw new Error("Tested event is not for box!");        
        }
    }

    _resetColors() {
        this.inputElement.style.backgroundColor = DEFAULT_INPUT_COLOR;
        this.submitElement.style.backgroundColor = DEFAULT_INPUT_COLOR;
    }

    _invalidBusColorize() {
        this.inputElement.style.backgroundColor = INVALID_BUS_COLOR;
        this.submitElement.style.backgroundColor = INVALID_BUS_COLOR;
        setTimeout(this._resetColors, 2000);
    }

    _isValidRoute(route) {
        return (this.permittedRoutes.has(route));
    }

    preSubmissionColor() {
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

    // Multi-element functions
    textInputToCheckbox() {
        const inputValue = this.inputElement.value;
        if (!VALID_ROUTES.has(inputValue)) {
            this._invalidBusColorize();
            return;
        }
        if (inputValue && !displayedBuses.has(inputValue)) {
            this.displayedBuses.add(inputValue);
            checkboxesElement.appendChild(generateCheckbox(inputValue));
        }
        this.inputElement.value = ""; // generates its own change event
    }

    
    // TODO:
    // textInputToCheckbox - process input submission; show error if invalid input; reset input
    // matchInputColor - give feedback to the user as the user is typing based on the availability
    // handlers - test types, prevent defaults, colorize or process input
    // checkboxRemovalFactory - factory for removal event; test types, then perform action
    // generateCheckbox - package a checkbox as a div that can easily be popped off


}

export { RouteSelectionInput };