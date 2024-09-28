import { getCurrentCoordinatesPromise, isApproachingMe, LatitudeLongitude} from './service/location.js';
import { getNewReactiveObject } from './model/reactive_service.js';
import { simpleTextAlert, simpleTextLocation } from './service/processors/demonstration_processors.js';
import { populateAlertsStore, populateLocationsStore } from './service/processors/store_creators.js';
import { processStore } from './service/processors/processor_aggregators.js';

const routes = ["45", "29", "47", "4"]
var locationsStore = getNewReactiveObject();
var alertsStore = getNewReactiveObject();


locationsStore.setHandler = (data) => {
    const locations = processStore(data, simpleTextLocation);
    for (const locationMessage of locations) {
        console.log(locationMessage);
    }
};

alertsStore.setHandler = (data) => {
    const alerts = processStore(data, simpleTextAlert);
    for (const alert of alerts) {
        console.log(alert);
    }
};

populateAlertsStore(routes, alertsStore);

function testMe() {
    console.log("Test cycle running");
    populateLocationsStore(routes, locationsStore);
}


setInterval(testMe, 10000);

console.log("You're in.")