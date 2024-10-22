import { NO_DIRECTION, ALERTS, LOCATIONS } from "../../model/route_info.js";
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
    }
    if (alert.directionsImpacted.size === 0) {
        if (!alertStore[route].hasOwnProperty(NO_DIRECTION)) {
            alertStore[route][NO_DIRECTION] = new Object();
            alertStore[route][NO_DIRECTION][ALERTS] = new Set();
        }
        alertStore[route][NO_DIRECTION][ALERTS].add(alert);
    }
}

function indexLocation(route, location, locationStore) {
    if (!locationStore[route].hasOwnProperty(location.direction)) {
        locationStore[route][location.direction] = new Object();  
    }
    if (!locationStore[route][location.direction].hasOwnProperty(LOCATIONS)) {
        locationStore[route][location.direction][LOCATIONS] = [];
    }
    locationStore[route][location.direction][LOCATIONS].push(location);
}

export { indexAlert, indexLocation }