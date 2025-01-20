import { Store } from "../../flowcontrol/store.js";
import { LOCATIONS, ALERTS, NO_DIRECTION } from "../processors/indexed_processors.js";
import { DirectedPushpin } from "../../model/directedPushpin.js";

function oneRoute(route, locationData, alertData) {
    const oneRoutePushpins = [];
    for (const direction in locationData) {
        for (const individualLocation of locationData[direction]) {
            const individualPushpin = new DirectedPushpin(
                individualLocation.vehicleLocation.latitude, 
                individualLocation.vehicleLocation.longitude,
                route, direction
            );
            oneRoutePushpins.push(individualPushpin);
        }
    }
    return oneRoutePushpins;
}

function getPushpins(store) {
    console.log(store);
    const allRoutePushpins = [];
    for (const route in store.sortedLocations.populatedLocations) {
        const oneRoutePushpins = oneRoute(route, store.sortedLocations[route], store.sortedAlerts[route]);
        allRoutePushpins.push(...oneRoutePushpins);  
    }
    console.log("allRoutePushpins: ", allRoutePushpins);
    return allRoutePushpins;
}

export { getPushpins };