// Filters

import { ProcessedLocationV2 } from "../../model/processed_location.js";
import { isApproachingMe, LatitudeLongitude } from "../location.js";

const validLocation = (processedLocation) => 
        Boolean(processedLocation.nextStopName && processedLocation.vehicleLocation);


/**
 * A filter to be used to determine whether a location is relevant
 *
 * @param {LatitudeLongitude} currentLocation
 * @param {ProcessedLocationV2} processedLocation
 * @returns {Boolean}
 */
function relevantLocationFactory(currentLocation) {
       
        return (processedLocation) => {
                const approaching = isApproachingMe(currentLocation, processedLocation.vehicleLocation, processedLocation.direction);
                return validLocation(processedLocation) && approaching;
        }
}



export { validLocation, relevantLocationFactory } 


