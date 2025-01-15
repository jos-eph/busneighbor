import { Store } from '../flowcontrol/store.js';
import { ManagedMap } from "../service/leaflet/managedMap.js";

console.log("Loading demo map painting...");


// Define routes
const routes = ["45", "33", "38", "29", "47", "4", "40"]

const mapElement = document.getElementById("simplemap");
const map = new ManagedMap(mapElement);

const store = new Store(routes);
await store.initialize();

// Main body functions
async function cycleRefresh() {
  console.log("Requesting location refresh");
  await store.requestLocationsRefresh();
  store.indexLocations();
  // need a buildout of a service to graph the points
}

// Main loop
setInterval(cycleRefresh, 5000);