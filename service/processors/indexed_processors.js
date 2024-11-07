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

const LOCATIONS = "locations";
const ALERTS = "alerts";
const NO_DIRECTION = "noDirectionFound"


function indexAlert(route, alert, alertStore) {
    for (const direction of alert.directionsImpacted) {
        if (!alertStore[route].hasOwnProperty(direction)) {
            alertStore[route][direction] = new Set();
        }
        alertStore[route][direction].add(alert);
        safeAddToKeyedSet(alertStore[POPULATED_ALERTS], route, direction);
        
    }
    if (alert.directionsImpacted.size === 0) {
        if (!alertStore[route].hasOwnProperty(NO_DIRECTION)) {
            alertStore[route][NO_DIRECTION] = new Set();
        }
        alertStore[route][NO_DIRECTION].add(alert);
        safeAddToKeyedSet(alertStore[POPULATED_ALERTS], route, NO_DIRECTION);
    }
}

function indexLocation(route, location, index) {
    if (!index[route].hasOwnProperty(location.direction)) {
        index[route][location.direction] = new Set();  
    }
    index[route][location.direction].add(location);
    safeAddToKeyedSet(index[POPULATED_LOCATIONS], route, location.direction);
}

export { indexAlert, indexLocation, POPULATED_ALERTS, POPULATED_LOCATIONS, LOCATIONS, ALERTS, NO_DIRECTION }