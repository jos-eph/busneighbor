import { ManagedMap } from "../service/leaflet/managed_map.js";
import { SetSelectionData, getResponsiveSetSelectionData } from '../forminput/set_selection_data.js';
import { TypedSet } from '../common/pickling/typedSet.js';
import { LocalStoragePickle } from '../common/pickling/localStoragePickle.js';
import { Store } from "./store/store.js";
import { updateRoutes } from "./service/map_updater/update_location.js";

// Set constants
const DEFAULT_PERMITTED_ROUTES = new TypedSet(["45", "33", "38", "29", "47", "4", "40"]);
const DISPLAYED_BUS_SET_NAME = "displayedBusSet"; 

// Set Defaults
const pickle = new LocalStoragePickle();
let displayedBuses = pickle.retrieveSet(DISPLAYED_BUS_SET_NAME);
displayedBuses = displayedBuses ? displayedBuses : new TypedSet(["45","4"]);
console.log("displayed buses", displayedBuses);

// Identify Elements

const formElement = document.getElementById("routeSubmissionForm");
const inputElement = document.getElementById("busRouteInput");
const submitElement = document.getElementById("submitButton");
const checkboxesElement = document.getElementById("checkboxes");

const setSelectionInput = getResponsiveSetSelectionData(DEFAULT_PERMITTED_ROUTES,
  formElement, inputElement, submitElement, checkboxesElement, displayedBuses );

const mapElement = document.getElementById("simplemap");
const managedMap = new ManagedMap(mapElement, "..");
// Main body functions

// Initialize map
console.log("Loading main loop...");

const store = new Store(managedMap, setSelectionInput);
await store.initialize();
updateRoutes(store, managedMap, setSelectionInput);
setInterval(() => {updateRoutes(store, managedMap, setSelectionInput)}, 3000);

// Main loop
