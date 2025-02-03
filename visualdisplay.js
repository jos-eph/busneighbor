import { ManagedMap } from "/busneighbor/service/leaflet/managed_map.js";
import { SetSelectionData, getResponsiveSetSelectionData } from '/busneighor/forminput/set_selection_data.js';
import { TypedSet } from '/busneighbor/common/pickling/typedSet.js';
import { LocalStoragePickle } from '/busneighbor/common/pickling/localStoragePickle.js';
import { Store } from "/busneighbor/store/store.js";
import { updateRoutes } from "/busneighbor/service/map_updater/update_location.js";

// Set constants
const DEFAULT_PERMITTED_ROUTES = new TypedSet(["45", "33", "38", "29", "47", "4", "40"]);
const DISPLAYED_BUS_SET_NAME = "displayedBusSet"; 

// Set Defaults
const pickle = new LocalStoragePickle();
let displayedBuses = pickle.retrieveSet(DISPLAYED_BUS_SET_NAME);
displayedBuses = displayedBuses ? displayedBuses : new TypedSet(["45","4"]);
console.log("displayed buses", displayedBuses);

// Identify Elements
const mapElement = document.getElementById("simplemap");
const managedMap = new ManagedMap(mapElement, "..");

const removeRouteFromMap = (routeCheckbox) => {
  managedMap.clearRoute(routeCheckbox.name);
}


const formElement = document.getElementById("routeSubmissionForm");
const inputElement = document.getElementById("busRouteInput");
const submitElement = document.getElementById("submitButton");
const checkboxesElement = document.getElementById("checkboxes");

const setSelectionInput = getResponsiveSetSelectionData(DEFAULT_PERMITTED_ROUTES,
  formElement, inputElement, submitElement, checkboxesElement, displayedBuses, removeRouteFromMap );


// Main body functions

// Initialize map
console.log("Loading main loop...");

const store = new Store(managedMap, setSelectionInput);
await store.initialize();
updateRoutes(store, managedMap, setSelectionInput);
setInterval(() => {
  updateRoutes(store, managedMap, setSelectionInput);
  store.refreshUserInfo();
}, 3000);

// Main loop
