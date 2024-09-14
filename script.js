import { getLocationData, getRouteAlerts } from './service/septa_api.js'
import { createProcessedAlert, createProcessedLocation } from './service/septa_api_translation.js';
import { getCurrentCoordinatesPromise, isApproachingMe, LatitudeLongitude} from './service/location.js';
import { getReactiveWrapper } from './model/reactive_service.js';
import { simpleTextAlert } from './service/processors/demonstration_processors.js';

const routes = ["45", "29", "47", "4"]
var locationsStore = getReactiveWrapper({"setHandler": {}});
var alertsStore = getReactiveWrapper({"setHandler": {}});

async function updateLocationsData() {
    const allNewLocations = [];
    for (const route of routes) {
        
        const routeLocationArray = await getLocationData(route);
        const newLocations = [];
        for (const individualVehicleLocation of routeLocationArray) {
            const processedLocation = createProcessedLocation(individualVehicleLocation);
            newLocations.push(processedLocation);    
        }
        locationsStore[route] = newLocations;
        allNewLocations.push(newLocations);
    }
    return allNewLocations;
}

async function updateAlertData() {
    const newAlerts = [];
    for (const route of routes) {
        const routeAlertsArray = await getRouteAlerts(route);
        const routeAlerts = [];
        for (const individualAlert of routeAlertsArray) {
            const processedAlert = createProcessedAlert(individualAlert);
            routeAlerts.push(processedAlert);
            console.log(simpleTextAlert(processedAlert));
        }
        
        alertsStore[route] = routeAlerts;
        newAlerts.push(routeAlerts);
    }
    return newAlerts;
}


function proveTrappedOutput(par1, par2, par3, par4) {
    console.log(`${par1} | ${par2} | ${par3} | ${par4}`);
}

locationsStore.setHandler = proveTrappedOutput;
alertsStore.setHandler = proveTrappedOutput;

function testMe() {
    console.log("Test cycle running");
    updateLocationsData();
}

updateAlertData();
setInterval(testMe, 10000);

console.log("You're in.")