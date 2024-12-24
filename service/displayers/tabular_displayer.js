import { Store } from "../../flowcontrol/store.js";
import { DirectionLocations } from "../../model/directionLocations.js";
import { LOCATIONS, ALERTS, NO_DIRECTION } from "../processors/indexed_processors.js";
import { createStatusLineWithAlertMessage } from "../tabledisplay/tabledisplayservice.js";


// not yet tested!!

/**
 * Convert information to relevant text for display
 *
 * @param {string} direction
 * @param { Object } processedRouteLocations
 * @param { Object } processedRouteAlerts
 * @returns {DirectionLocations}
 */
function flattenToDirectionLocations(direction, processedRouteLocations, processedRouteAlerts) {
    const streets = [];
    let directionAlerts = "";

    console.log("Processed route alerts: ", processedRouteAlerts, direction);

    for (const individualLocation of processedRouteLocations[[direction]]) {
        console.log("Individual location: ", individualLocation);
        streets.push(individualLocation.nextStopName);
    }

    if (direction in processedRouteAlerts) {
        for (const individualAlert of processedRouteAlerts[[direction]]) {
            console.log("One loop iteration");
            directionAlerts += directionAlerts + " -- " + individualAlert.message;
        }    
    }

    console.log("Streets: ", streets);

    return new DirectionLocations(direction, streets, directionAlerts);
}


/**
 * Process one route into a display box
 *
 * @param {string} route
 * @param {Object} processedRouteLocations
 * @param {Object} processedRouteAlerts
 * @returns {HTMLElement}
 */
function oneRoute(route, processedRouteLocations, processedRouteAlerts) {
    const directionsInfo = [];
    console.log("Processed route locations: ", processedRouteLocations);
    for (const direction in processedRouteLocations) {
        directionsInfo.push(flattenToDirectionLocations(direction, processedRouteLocations, processedRouteAlerts));
    }

    const aggregatedNoDirectionAlerts = [];
    if (processedRouteAlerts.hasOwnProperty(NO_DIRECTION) && processedRouteAlerts[NO_DIRECTION].size > 0) {
        for (const individualAlert of processedRouteAlerts[NO_DIRECTION]) {
            aggregatedNoDirectionAlerts.push(individualAlert.message);
        }
    }
    const noDirectionAggregate = aggregatedNoDirectionAlerts.join(" -- ");

    console.log("Directions info: ", directionsInfo);
    const routeAlertBox = createStatusLineWithAlertMessage(route, directionsInfo);
    routeAlertBox.dataset[[NO_DIRECTION]] = noDirectionAggregate;

    return routeAlertBox;
}

/**
 * Convert a store to a useful tabular representation
 *
 * @param { Store } store
 */
function getTabulizedStore(store) {
    console.log(store);
    const routesTabulized = [];
    for (const route in store.sortedLocations.populatedLocations) {
        routesTabulized.push(oneRoute(route, store.sortedLocations[route], store.sortedAlerts[route]));   
    }
    return routesTabulized; // wrap them in an enclosed container;
}

export { getTabulizedStore }