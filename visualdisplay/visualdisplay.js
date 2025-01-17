import { Store } from '../flowcontrol/store.js';
import { ManagedMap } from "../service/leaflet/managedMap.js";
import { getPushpins } from '../service/displayers/pushpin_displayer.js';

console.log("Loading demo map painting...");

// Define routes
const routes = ["45", "33", "38", "29", "47", "4", "40"]

const mapElement = document.getElementById("simplemap");
const map = new ManagedMap(mapElement, "..");

const store = new Store(routes);
await store.initialize();

function paintMap() {
  map.clearPushpins();
  map.populate(getPushpins(store), store.userLocation);
  console.log("userLocation for painting: ", store.userLocation);
}

// Main body functions
async function cycleRefresh() {
  console.log("Requesting location refresh");
  await store.requestLocationsRefresh();
  store.indexLocations();
  paintMap();
}

// Main loop
setInterval(cycleRefresh, 5000);