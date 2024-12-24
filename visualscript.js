import { Store } from './flowcontrol/store.js';
import { getTabulizedStore } from './service/displayers/tabular_displayer.js';

// Define routes
const routes = ["45", "29", "47", "4", "40"]

// Create the stores
const store = new Store(routes);
await store.initialize();

// Main body functions
async function cycleRefresh() {
    console.log("Requesting location refresh");
    await store.requestLocationsRefresh();
    store.indexLocations();
}

function showTables() {
    // create the text
    const displayTables = getTabulizedStore(store);
    console.log(displayTables);
    // populate the DOM
    const groupHolder = document.getElementById("demoArea");
    groupHolder.replaceChildren(...displayTables);
}

// Initial display and cycling
showTables();
setInterval(cycleRefresh, 5000);
// setInterval(showTables, 300000);