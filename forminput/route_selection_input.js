import { KEYUP_EVENT, SUBMIT_EVENT, CHANGE_EVENT, ENTER_KEY, PARENT_NAME_SUFFIX, parentDivName,
    BUS_EXISTS_COLOR, BUS_IN_SET_COLOR, CANT_SUBMIT_COLOR, INVALID_BUS_COLOR, DEFAULT_INPUT_COLOR } 
    from "./route_selection_constants";

import { testElementOfTag, testEventOfType } from "../common/interaction_utils.js";

class RouteSelectionInput {

    constructor(permittedRoutes, formElement, textInputElement, submitElement, checkboxesElement) {
        this.permittedRoutes = permittedRoutes;
        this.formElement = formElement;
        this.textInputElement = textInputElement;
        this.submitElement = submitElement;
        this.checkboxesElement = checkboxesElement;

        this.submissionElements = new Set([formElement, textInputElement, submitElement]);
    }

    testEventForInputBox(event) {
        if (this.submissionElements.has(event.target)) { return; } 
        else {
            throw new Error("Tested event is not for box!");        
        }
    }
    // TODO:
    // textInputToCheckbox - process input submission; show error if invalid input; reset input
    // matchInputColor - give feedback to the user as the user is typing based on the availability
    // handlers - test types, prevent defaults, colorize or process input
    // checkboxRemovalFactory - factory for removal event; test types, then perform action
    // generateCheckbox - package a checkbox as a div that can easily be popped off


}

export { RouteSelectionInput };