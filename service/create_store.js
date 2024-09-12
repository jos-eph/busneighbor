import { createReactiveDataHolder } from "../model/data_holder.js";
import { RouteInfo, ALERTS, LOCATIONS } from "../model/route_info.js";

const ROUTE_INFO_PARAM = "routeInfo";
const LOCATION_REFERENCES_PARAM = "locationReferences";
const ALERT_REFERENCES_PARAM = "alertReferences";
const WORKSPACE_PARAM = "workspace";

/**
 * Create a store with a reactive RouteInfo object (constant across all display implementations to signal updates),
 * location/alert references to take a specific implementation's display reaction functions,
 * and a workspace if needed.
 * 
 * routeInfo is a reactive object that copies references to its new values to locationReferences and alertReferences as appropriate.
 * These references are not actually for data retrieval but to trigger a display handler, since they are themselves reactive.
 *
 * @param {array[str]} routes
 * @param {function} locationsHandler
 * @param {function} alertsHandler
 */
const createStore = (routes, locationsHandler, alertsHandler) => {
    const routeInfo = new RouteInfo(...routes);
    for (const route of Object.keys(routeInfo)) {
        console.log(`Yo, route ${route}`);
    }

    const locationReferences = createReactiveDataHolder(...routes);
    locationReferences.addSetHandler(locationsHandler);

    const alertReferences = createReactiveDataHolder(...routes);
    alertReferences.addSetHandler(alertsHandler);

    const workspace = {};

    // RouteInfo auto-populates 
    for (const route of routes) {
        console.log(`Route: ${route}, ${Object.keys(routeInfo)} ${typeof routeInfo[route].addSetHandler}`);
        routeInfo[route].addSetHandler(
            (originalObj, property, value) => {
                if (property == [LOCATIONS]) {
                    locationReferences[route] = value;
                }
                if (property == [ALERTS]) {
                    alertReferences[route] = value;
                }
            }
        );
    }
    

    return {
        [ROUTE_INFO_PARAM]: routeInfo,
        [LOCATION_REFERENCES_PARAM]: locationReferences,
        [ALERT_REFERENCES_PARAM]: alertReferences,
        [WORKSPACE_PARAM]: workspace
    };
};

export { createStore };