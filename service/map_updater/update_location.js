import { Store } from "/busneighbor/store/store.js";
import { ManagedMap } from "/busneighbor/service/leaflet/managed_map.js";
import { getLocationDataV2 } from "/busneighbor/service/septa_api.js";
import { SetSelectionData } from "/busneighbor/forminput/set_selection_data.js";
import { createProcessedLocationV2 } from "/busneighbor/service/septa_api_translation.js";
import { PERPENDICULAR_DISTANCE } from "/busneighbor/service/septa_api_translation.js";
import { routeAwarePerpendicularDistance } from "/busneighbor/service/septa_api_translation.js";

/**
 * Update a route in the background
 *
 * @async
 * @param {String} route 
 * @returns {*} 
 */

async function getProcessedLocations(route, currentLocation, distancesFromOrigin) {
    const rawLocationData = await getLocationDataV2(route);
    const processedLocations = [];

    for (const rawLocation of rawLocationData) {
        const processedLocation = createProcessedLocationV2(rawLocation);
        processedLocation[PERPENDICULAR_DISTANCE] = routeAwarePerpendicularDistance(currentLocation, processedLocation, distancesFromOrigin);
        processedLocations.push(processedLocation);
    }

    return processedLocations;
}

// Store updates currentLocation and distancesFromOrigin in the background

/**
 * Do everything needed when new location data comes in 
 *
 * @async
 * @param {String} route 
 * @param {Store} store 
 * @param {ManagedMap} managedMap
 */
async function updateRouteLocations(route, store, managedMap) {
    const processedLocations = await getProcessedLocations(route, store.getUserLocation(), store.getDistancesFromOrigin());
    
    for (const processedLocation of processedLocations) {
        // debugger;
        managedMap.addPushpin(processedLocation);
    }

}



/**
 * Description placeholder
 *
 * @param {Store} store 
 * @param {ManagedMap} managedMap 
 * @param {SetSelectionData} setSelection 
 */
function updateRoutes(store, managedMap, setSelection) {
    for (const route of setSelection.viewSelection()) {
        updateRouteLocations(route, store, managedMap);
    }
}

export { updateRoutes, updateRouteLocations };