import { getLocationDataV2, getRouteAlertsV2 } from "../septa_api.js";
import { createProcessedAlertV2, createProcessedLocationV2 } from "../septa_api_translation.js";
import { relevantLocationFactory } from "./display_filters.js";
import { processRouteGets } from "./processor_aggregators.js";
import { getCurrentCoordinatesPromise } from "../location.js";

async function populateLocationsStore(routes, locationsStore) {
    const currentLocation = await getCurrentCoordinatesPromise();
    return processRouteGets(routes, getLocationDataV2,
        createProcessedLocationV2, locationsStore, relevantLocationFactory(currentLocation));
}

async function populateAlertsStore(routes, alertsStore) {
    return processRouteGets(routes, getRouteAlertsV2,
        createProcessedAlertV2, alertsStore);
}

export { populateAlertsStore, populateLocationsStore };