import { getLocationDataV2, getRouteAlertsV2 } from "../septa_api.js";
import { createProcessedAlertV2, createProcessedLocationFactoryV2, PERPENDICULAR_DISTANCE } from "../septa_api_translation.js";
import { processRouteGets } from "./processor_aggregators.js";
import { getCurrentCoordinatesPromise } from "../location.js";

const POPULATED_LOCATIONS = "populatedLocations";
const POPULATED_ALERTS = "populatedAlerts";

async function populateLocationsStore(routes, locationsStore) {
    const currentLocation = await getCurrentCoordinatesPromise();
    const createProcessedLocation = createProcessedLocationFactoryV2(currentLocation);
    return processRouteGets(routes, getLocationDataV2,
        createProcessedLocation, locationsStore, 
        (processedLocation) => processedLocation[PERPENDICULAR_DISTANCE] >= 0,
        (location1, location2) => location1[PERPENDICULAR_DISTANCE] - location2[PERPENDICULAR_DISTANCE]
        );
}

async function populateAlertsStore(routes, alertsStore) {
    return processRouteGets(routes, getRouteAlertsV2,
        createProcessedAlertV2, alertsStore);
}

export { populateAlertsStore, populateLocationsStore, 
    POPULATED_ALERTS, POPULATED_LOCATIONS };