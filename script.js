import { getLocationData, getRouteAlerts } from './service/septa_api.js'
import { createProcessedAlert, createProcessedLocation } from './service/septa_api_translation.js';
import { getCurrentCoordinatesPromise, isApproachingMe, LatitudeLongitude} from './service/location.js';
import { getNewReactiveObject } from './model/reactive_service.js';
import { simpleTextAlert, simpleTextLocation } from './service/processors/demonstration_processors.js';
import { aggregateForRoutes, processStore } from './service/processors/processor_aggregators.js';

const routes = ["45", "29", "47", "4"]
var locationsStore = getNewReactiveObject();
var alertsStore = getNewReactiveObject();



async function updateLocationsData() {
    return aggregateForRoutes(routes, "bus", getLocationData,
        createProcessedLocation, locationsStore);
}

async function updateAlertData() {
    return aggregateForRoutes(routes, "bus", getRouteAlerts,
        createProcessedAlert, alertsStore);
}



locationsStore.setHandler = (data) => {
    const locations = processStore(data, simpleTextLocation);
    console.log(JSON.stringify(locations));
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

updateAlertData();

function testMe() {
    console.log("Test cycle running");
    updateLocationsData();
}


setInterval(testMe, 10000);

console.log("You're in.")