import { getCurrentCoordinatesPromise, isApproachingMe, LatitudeLongitude} from './service/location.js';
import { getNewReactiveObject } from './model/reactive_service.js';
import { simpleTextAlert, simpleTextLocation } from './service/processors/demonstration_processors.js';
import { populateAlertsStore, populateLocationsStore } from './service/processors/store_creators.js';
import { indexAlert, indexLocation } from './service/processors/indexed_processors.js';
import { processStore } from './service/processors/processor_aggregators.js';
import { objectOfKeys } from './common/utilities.js';

const routes = ["45", "29", "47", "4"]
var locationsStore = getNewReactiveObject();
var alertsStore = getNewReactiveObject();

const templateIndex = objectOfKeys(routes);
let compiledData = new Object();

locationsStore.setHandler = (data) => {
    const locations = processStore(data, simpleTextLocation);
    for (const locationMessage of locations) {
//        console.log(locationMessage);
    }
};

alertsStore.setHandler = (data) => {
    const alerts = processStore(data, simpleTextAlert);
    processStore(data, indexAlert, templateIndex);
    for (const alert of alerts) {
//        console.log(alert);
    }
};

populateAlertsStore(routes, alertsStore);

function testMe() {
    console.log("Test cycle running");
    populateLocationsStore(routes, locationsStore);
    const aggregate = structuredClone(templateIndex);
    processStore(locationsStore, indexLocation, aggregate);
    compiledData = aggregate;
    console.log(aggregate);
}


setInterval(testMe, 10000);

console.log("You're in.")