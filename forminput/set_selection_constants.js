const KEYUP_EVENT = "keyup";
const SUBMIT_EVENT = "submit";
const CHANGE_EVENT = "change";
const ENTER_KEY = "Enter";

const PARENT_NAME_SUFFIX = "DivParentSuffix"
const parentDivName = (childName) => `${childName}${PARENT_NAME_SUFFIX}`;

const ITEM_EXISTS_COLOR = "lightgreen";
const ITEM_IN_SET_COLOR = "grey";
const CANT_SUBMIT_COLOR = "grey";
const INVALID_ITEM_COLOR = "red";
const DEFAULT_INPUT_COLOR = "";

const CHECKBOX_DIV_CLASS = "checkbox-container";

export { KEYUP_EVENT, SUBMIT_EVENT, CHANGE_EVENT, ENTER_KEY, PARENT_NAME_SUFFIX, parentDivName,
    ITEM_EXISTS_COLOR, ITEM_IN_SET_COLOR , CANT_SUBMIT_COLOR, INVALID_ITEM_COLOR, DEFAULT_INPUT_COLOR,
    CHECKBOX_DIV_CLASS
 };