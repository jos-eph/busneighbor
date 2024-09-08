import { RouteInfo, NO_DIRECTION } from "./route_info";
import { Directions } from "./directions_impacted";

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

export { populateRouteInfoAlerts };