import { Store } from "../../flowcontrol/store.js";
import { DirectionLocations } from "../../model/directionLocations.js";
import { ProcessedAlertV2 } from "../../model/processed_alert.js";
import { LOCATIONS, ALERTS, NO_DIRECTION } from "../processors/indexed_processors.js";
import { createStatusLineWithAlertMessage } from "../tabledisplay/tabledisplayservice.js";
import { LOCATIONS_PARAMETER, ALERTS_PARAMETER } from "../tabledisplay/tabledisplayservice.js";

// not yet tested!!



/**
 * Flatten alerts to single string
 *
 * @param {Array[ProcessedAlertV2]} alerts
 * @returns {string}
 */
function flattenAlerts(alerts) {
    if (alerts == undefined) { return undefined; }
    
    const messages = [];
    alerts.forEach(alert => {
        messages.push(alert.message);
    });

    return messages.join(" -- ");
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
    let noDirectionAggregate = undefined;

    if (processedRouteAlerts.hasOwnProperty(NO_DIRECTION) && processedRouteAlerts[NO_DIRECTION].size > 0) {
        noDirectionAggregate = flattenAlerts(processedRouteAlerts[NO_DIRECTION]);
    }
    
    const directionLocationAlerts = {};
    for (const direction in processedRouteLocations) {
        const locations = processedRouteLocations[direction];
        const alerts = processedRouteAlerts[direction];
        directionLocationAlerts[[direction]] = {[LOCATIONS_PARAMETER]: locations, [ALERTS_PARAMETER]: flattenAlerts(alerts)};
    }

    const routeAlertBox = createStatusLineWithAlertMessage(route, directionLocationAlerts)
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