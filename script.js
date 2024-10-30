import { getCurrentCoordinatesPromise, isApproachingMe, LatitudeLongitude} from './service/location.js';
import { getNewReactiveObject } from './model/reactive_service.js';
import { simpleTextAlert, simpleTextLocation } from './service/processors/demonstration_processors.js';
import { populateAlertsStore, populateLocationsStore } from './service/processors/store_creators.js';
import { indexAlert, indexLocation } from './service/processors/indexed_processors.js';
import { processStore } from './service/processors/processor_aggregators.js';
import { defineHiddenProperty, objectOfKeys } from './common/utilities.js';
import { yieldLocationText } from './service/displayers/text_only_displayer.js';
import { POPULATED_ALERTS, POPULATED_LOCATIONS } from './service/processors/store_creators.js';

// Define routes
const routes = ["45", "29", "47", "4", "40"]

// Create the stores
var locationsStore = {};
var alertsStore = {};

// Create the alerts store
await populateAlertsStore(routes, alertsStore);
console.log(alertsStore);

// index the alerts store
const sortedAlerts = objectOfKeys(routes);
defineHiddenProperty(sortedAlerts, POPULATED_ALERTS);
processStore(alertsStore, indexAlert, sortedAlerts);
console.log(sortedAlerts);

// Main body execution - populate alerts

let sortedLocations = {}; // placeholder

function testMe() {
    console.log("Test cycle running");
    // grab API data
    populateLocationsStore(routes, locationsStore);
    
    // index the locations store
    sortedLocations = objectOfKeys(routes);
    defineHiddenProperty(sortedLocations, POPULATED_LOCATIONS);
    processStore(locationsStore, indexLocation, sortedLocations);
    // make sure you're indexing the appropriate object
    // then, define a new function that will reference both indices to come up with a display
    let yieldedText = "Test";
    console.log(sortedAlerts);
    console.log(sortedLocations);
    console.log(yieldedText);

    // populate the DOM
    const paragraph = document.getElementById("change-text");
    paragraph.textContent = yieldedText;
}


setInterval(testMe, 10000);

console.log("You're in.")