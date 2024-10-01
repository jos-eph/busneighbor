import { getLocationDataV2, getRouteAlertsV2 } from "../septa_api.js";
import { createProcessedAlertV2, createProcessedLocationV2 } from "../septa_api_translation.js";
import { validLocation } from "./display_filters.js";
import { aggregateForRoutes } from "./processor_aggregators.js";

async function populateLocationsStore(routes, locationsStore) {
    return aggregateForRoutes(routes, getLocationDataV2,
        createProcessedLocationV2, locationsStore, validLocation);
}

async function populateAlertsStore(routes, alertsStore) {
    return aggregateForRoutes(routes, getRouteAlertsV2,
        createProcessedAlertV2, alertsStore);
}

export { populateAlertsStore, populateLocationsStore };