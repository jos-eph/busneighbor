import { Store } from '../flowcontrol/store.js';
import { ManagedMap } from "../service/leaflet/managedMap.js";
import { getPushpins } from '../service/displayers/pushpin_displayer.js';
import { SetSelectionData, getResponsiveSetSelectionData } from '../forminput/set_selection_data.js';
import { TypedSet } from '../common/pickling/typedSet.js';
import { LocalStoragePickle } from '../common/pickling/localStoragePickle.js';
import { setIntersectionLegacy, setsIdentical } from '../common/utilities.js';

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

// Main body functions
function paintMap() {
  map.clearPushpins();
  map.populate(getPushpins(store), store.userLocation);
  console.log("userLocation for painting: ", store.userLocation);
}

function updateSelections() {
  const currentChoices = setSelectionInput.viewSelection();
  console.log("In updateSelections, current choices is ", currentChoices);
  if (!setsIdentical(currentChoices, displayedBuses)) {
    displayedBuses = currentChoices;
    pickle.storeSet(DISPLAYED_BUS_SET_NAME, displayedBuses);
    return true;
  }
  return false;
}


async function refreshAndPaint() {
  const updated = updateSelections();
  if (updated) {
    store = new Store(displayedBuses);
    await store.initialize();
  }
  else {
    console.log("Requesting location refresh");
    await store.requestLocationsRefresh();
    store.indexLocations();
  }
  paintMap();
}

async function cycleRefresh() {
  await refreshAndPaint();
}


// Initialize map
console.log("Loading demo map painting...");
const mapElement = document.getElementById("simplemap");
const map = new ManagedMap(mapElement, "..");

let store = new Store(displayedBuses);
await store.initialize();
paintMap();

// Main loop
setInterval(cycleRefresh, 3000);