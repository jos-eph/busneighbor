import { getLocationDataV2, getRouteAlertsV2 } from "../septa_api.js";
import { createProcessedAlertV2, createProcessedLocationFactoryV2, PERPENDICULAR_DISTANCE } from "../septa_api_translation.js";
import { processRouteGets } from "./processor_aggregators.js";
import { getCurrentCoordinatesPromise } from "../location.js";

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
    await populateDistancesFromOrigin(routes, distancesFromOrigin);
    const createProcessedLocation = createProcessedLocationFactoryV2(currentLocation);
    return processRouteGets(routes, getLocationDataV2,
        createProcessedLocation, locationsStore, locationFilter, locationSorter
        );
}

async function populationDistancesFromOrigin(routes, distancesFromOrigin) {
    // for all relevant routes, for all relevant directions, calculate perpendicular distance
    // to route origin using stopStart.json
    // if we are before the route start, use the route origin to calculate distances
}

async function populateAlertsStore(routes, alertsStore) {
    return processRouteGets(routes, getRouteAlertsV2,
        createProcessedAlertV2, alertsStore);
}

export { populateAlertsStore, populateLocationsStore, 
    POPULATED_ALERTS, POPULATED_LOCATIONS };