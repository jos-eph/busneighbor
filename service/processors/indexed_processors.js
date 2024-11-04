import { NO_DIRECTION, ALERTS, LOCATIONS } from "../../model/route_info.js";
import { safeAddToKeyedSet } from "../../common/utilities.js";
import { POPULATED_ALERTS, POPULATED_LOCATIONS } from "./store_organizers.js";
/*
    45
    N
        alerts
        locations
    S
        directions
        alerts
    NO_DIRECTION
        alerts

*/




function indexAlert(route, alert, alertStore) {
    for (const direction of alert.directionsImpacted) {
        if (!alertStore[route].hasOwnProperty(direction)) {
            alertStore[route][direction] = new Object();
        }
        if (!alertStore[route][direction].hasOwnProperty(ALERTS)) {
            alertStore[route][direction][ALERTS] = new Set();
        }
        alertStore[route][direction][ALERTS].add(alert);
        safeAddToKeyedSet(alertStore[POPULATED_ALERTS], route, direction);
        
    }
    if (alert.directionsImpacted.size === 0) {
        if (!alertStore[route].hasOwnProperty(NO_DIRECTION)) {
            alertStore[route][NO_DIRECTION] = new Object();
            alertStore[route][NO_DIRECTION][ALERTS] = new Set();
        }
        alertStore[route][NO_DIRECTION][ALERTS].add(alert);
        safeAddToKeyedSet(alertStore[POPULATED_ALERTS], route, NO_DIRECTION);
    }
}

function indexLocation(route, location, index) {
    if (!index[route].hasOwnProperty(location.direction)) {
        index[route][location.direction] = new Object();  
    }
    if (!index[route][location.direction].hasOwnProperty(LOCATIONS)) {
        index[route][location.direction][LOCATIONS] = [];
    }
    index[route][location.direction][LOCATIONS].push(location);
    safeAddToKeyedSet(index[POPULATED_LOCATIONS], route, location.direction);
}

export { indexAlert, indexLocation, POPULATED_ALERTS, POPULATED_LOCATIONS }