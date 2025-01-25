const KEYUP_EVENT = "keyup";
const SUBMIT_EVENT = "submit";
const CHANGE_EVENT = "change";
const ENTER_KEY = "Enter";

const PARENT_NAME_SUFFIX = "DivParentSuffix"
const parentDivName = (childName) => `${childName}${PARENT_NAME_SUFFIX}`;

const BUS_EXISTS_COLOR = "lightgreen";
const BUS_IN_SET_COLOR = "grey";
const CANT_SUBMIT_COLOR = "grey";
const INVALID_BUS_COLOR = "red";
const DEFAULT_INPUT_COLOR = "";

export { KEYUP_EVENT, SUBMIT_EVENT, CHANGE_EVENT, ENTER_KEY, PARENT_NAME_SUFFIX, parentDivName,
    BUS_EXISTS_COLOR, BUS_IN_SET_COLOR, CANT_SUBMIT_COLOR, INVALID_BUS_COLOR, DEFAULT_INPUT_COLOR
 };