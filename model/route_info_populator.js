import { RouteInfo, NO_DIRECTION } from "./route_info";
import { Directions } from "./directions_impacted";
import { SeatsAvailable } from "../service/septa_api_translation";

const populateRouteInfoAlerts = (routeInfo, processedAlerts) => {
    for (let processedAlert of processedAlerts) {
        let directionFound = false;
        let route = processedAlert.processedRouteIdentifier;

            for (let direction in Directions) {
                let directionAbbreviation = Directions[direction];
                if (processedAlert.processedDirectionsImpacted[directionAbbreviation] === true) {
                    routeInfo[route][directionAbbreviation].alerts.push(processedAlert);
                    directionFound = true;
                }
            }

            if (!directionFound) {
                routeInfo[route][NO_DIRECTION].alerts.push(processedAlert);
            }
    }
};

const populateRouteInfoLocations = (routeInfo, processedLocations) => {
    for (let processedLocation of processedLocations) {
        const route = processedLocation.processedRouteIdentifier;
        const direction = processedLocation.processedDirection;
        if (Object.keys(routeInfo).includes(processedLocation.processedRouteIdentifier)
        && processedLocation.processedSeatAvailability != "NO_SEATS" ) {
            routeInfo[route][direction].locations.push(processedLocation);
        }
    }
};

const cleanRouteInfo = (routeInfo) => {
    for (const route of Object.keys(routeInfo)) {
        for (const direction of Object.keys(routeInfo[route])) {
            if (direction == [NO_DIRECTION]) { // We do not include locations for unknown directions
                if (routeInfo[route][NO_DIRECTION].alerts.length == 0) {
                    delete routeInfo[route][NO_DIRECTION];
                }
                continue;
            }
            if (routeInfo[route][direction].locations.length == 0 &&
                routeInfo[route][direction].alerts.length == 0) {
                    delete routeInfo[route][direction];
                }
        }
    }
};

export { populateRouteInfoAlerts, populateRouteInfoLocations, cleanRouteInfo };