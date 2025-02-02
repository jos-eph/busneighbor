import { Store } from "../../store/store.js";
import { getLocationDataV2 } from "../septa_api.js";
/**
 * Update a route in the background
 *
 * @async
 * @param {String} route 
 * @returns {*} 
 */

async function getProcessedLocations(route) {
    const rawLocationData = await getLocationDataV2(route);
    const processedLocations = [];

    for (const rawLocation of rawLocationData) {
        const processedLocation = createProcessedLocationV2(locationJsonV2);
        processedLocation[PERPENDICULAR_DISTANCE] = routeAwarePerpendicularDistance(currentLocation, processedLocation, distancesFromOrigin);
        processedLocations.push(processedLocation);
    }

    return processedLocations;
}

// Store updates currentLocation and distancesFromOrigin in the background

/**
 * Description placeholder
 *
 * @async
 * @param {String} route 
 * @param {Store} store 
 */
async function updateRouteLocations(route, store) {
    const processedLocations = await getProcessedLocations(route);

    for (const rawLocation of rawLocationData) {
        const processedLocation = createProcessedLocationV2(locationJsonV2);
        processedLocation[PERPENDICULAR_DISTANCE] = routeAwarePerpendicularDistance(currentLocation, processedLocation, distancesFromOrigin);
            return processedLocation;
    }
    
    
}