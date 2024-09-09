import { createReactiveDataHolder } from "../model/data_holder";
import { RouteInfo, ALERTS, LOCATIONS } from "../model/route_info";

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
 * @param {string} routes
 * @param {function} locationsFactory
 * @param {function} alertsFactory
 */
const createStore = (routes, locationsFactory, alertsFactory) => {
    const routeInfo = new RouteInfo(...routes);
    const locationReferences = createReactiveDataHolder(...routes);
    const alertReferences = createReactiveDataHolder(...routes);
    const workspace = {};

    for (const route of routes) {
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