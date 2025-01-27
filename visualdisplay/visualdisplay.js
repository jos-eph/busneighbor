import { Store } from '../flowcontrol/store.js';
import { ManagedMap } from "../service/leaflet/managedMap.js";
import { getPushpins } from '../service/displayers/pushpin_displayer.js';
import { SetSelectionData, getResponsiveSetSelectionData } from '../forminput/set_selection_data.js';
import { TypedSet } from '../common/pickling/typedSet.js';

// Set Defaults
const DEFAULT_PERMITTED_ROUTES = new TypedSet(["45", "33", "38", "29", "47", "4", "40"]);

// Identify Elements

const formElement = document.getElementById("routeSubmissionForm");
const inputElement = document.getElementById("busRouteInput");
const submitElement = document.getElementById("submitButton");
const checkboxesElement = document.getElementById("checkboxes");

const setSelectionInput = getResponsiveSetSelectionData(DEFAULT_PERMITTED_ROUTES,
  formElement, inputElement, submitElement, checkboxesElement);

// Main body functions
function paintMap() {
  map.clearPushpins();
  map.populate(getPushpins(store), store.userLocation);
  console.log("userLocation for painting: ", store.userLocation);
}


async function refreshAndPaint() {
  console.log("Requesting location refresh");
  await store.requestLocationsRefresh();
  store.indexLocations();
  paintMap();
}

async function cycleRefresh() {
  await refreshAndPaint();
}


// Define routes
const routes = ["45", "33", "38", "29", "47", "4", "40"]


// Initialize map
console.log("Loading demo map painting...");
const mapElement = document.getElementById("simplemap");
const map = new ManagedMap(mapElement, "..");

const store = new Store(routes);
await store.initialize();
await refreshAndPaint();

// Main loop
setInterval(cycleRefresh, 5000);