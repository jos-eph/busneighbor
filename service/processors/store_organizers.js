import { getLocationDataV2, getRouteAlertsV2 } from "../septa_api.js";
import { createProcessedAlertV2, createProcessedLocationFactoryV2, PERPENDICULAR_DISTANCE } from "../septa_api_translation.js";
import { processRouteGets } from "./processor_aggregators.js";
import { getCurrentCoordinatesPromise, perpendicularDegreeDistance } from "../location.js";
import { LatitudeLongitude } from "../../model/latitudeLongitude.js";
import { startStop } from '../../startStop.js'

const POPULATED_LOCATIONS = "populatedLocations";
const POPULATED_ALERTS = "populatedAlerts";

function locationFilter(processedLocation) {
    return processedLocation[PERPENDICULAR_DISTANCE] >= 0 && processedLocation.nextStopName != null;
}

function locationSorter(location1, location2) {
    return location1[PERPENDICULAR_DISTANCE] - location2[PERPENDICULAR_DISTANCE];
}

async function populateLocationsStore(routes, locationsStore, distancesFromOrigin) {
    const currentLocation = await getCurrentCoordinatesPromise();
    console.log("Logging startStop at pLs...");
    console.log(startStop);
    populateDistancesFromOrigin(currentLocation, routes, distancesFromOrigin, startStop);
    const createProcessedLocation = createProcessedLocationFactoryV2(currentLocation, distancesFromOrigin, startStop);
    return processRouteGets(routes, getLocationDataV2,
        createProcessedLocation, locationsStore, locationFilter, locationSorter
        );
}


/**
 * Populate `directionsFromOrigin` with a list of all route-directions 
 * origins' distance from the current position
 *
 * @param {LatitudeLongitude} currentLocation User's location 
 * @param {Array<string>} routes 
 * @param {object} distancesFromOrigin Object of the form { "1": {"N": <<number>>,
     "S": <<number>> }} etc.
 */
function populateDistancesFromOrigin(currentLocation, routes, distancesFromOrigin) {
    for (const route of Object.keys(startStop)) {
        for (const direction of Object.keys(startStop[route])) {
            const routeOriginPosition = startStop?.[route]?.[direction]?.begins;
            if (routeOriginPosition !== undefined) {
                const perpendicularDistance = perpendicularDegreeDistance(currentLocation, routeOriginPosition, direction);
                distancesFromOrigin[route] = distancesFromOrigin[route] || {}
                distancesFromOrigin[route][direction] = perpendicularDistance;
            }
        }
    }
}

async function populateAlertsStore(routes, alertsStore) {
    return processRouteGets(routes, getRouteAlertsV2,
        createProcessedAlertV2, alertsStore);
}

export { populateAlertsStore, populateLocationsStore, populateDistancesFromOrigin,
    POPULATED_ALERTS, POPULATED_LOCATIONS };