import { RouteInfo, LOCATIONS, ALERTS } from "../model/route_info.js";

function createRouteInfo(alertsStore, locationsStore) {
    let routes = new Set(Object.keys(alertsStore));
    routes = routes.intersection(Object.keys(locationsStore));
    const routeInfo = new RouteInfo(...routes);
    for (const route of routes) {
        if (alertsStore.hasOwnProperty(route)) {
            for (const alert of alertsStore[route]) {
                // nooooo... too many nested for loops
                // there has to be a more efficient way of organizing this
            }
        }
    }

}