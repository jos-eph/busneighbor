import { Store } from './flowcontrol/store.js';
import { getTextStore } from './service/displayers/text_only_displayer.js';

// Define routes
const routes = ["45", "33", "38", "29", "47", "4", "40"]

// Create the stores
const store = new Store(routes);
await store.initialize();

// Main body functions
async function cycleRefresh() {
    console.log("Requesting location refresh");
    await store.requestLocationsRefresh();
    store.indexLocations();
}

function showText() {
    // create the text
    const displayText = getTextStore(store);
    console.log(displayText);
    // populate the DOM
    const paragraph = document.getElementById("change-text");
    paragraph.textContent = displayText;
}

// Initial display and cycling
showText();
setInterval(cycleRefresh, 5000);
setInterval(showText, 3000);
