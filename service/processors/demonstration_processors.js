import { ProcessedAlert } from "../../model/processed_alert.js";
import { ProcessedLocation } from "../../model/processed_location.js";



/**
 * Convert alerts to a simple text string
 *
 * @param {ProcessedAlert} alert
 * @returns {string}
 */
function simpleTextAlert(alertV2) {
    let directionsString = "";
    for (const [key, value] of Object.entries(alertV2.directionsImpacted)) {
        if (value == true) {
            directionsString += key;
        }
    }
    return (!directionsString) ? undefined
    : `going ${directionsString}: ${alertV2.message}`;
}

/**
 * Convert locations to a simple text string
 *
 * @param {ProcessedLocationV2} location
 * @returns {string}
 */
function simpleTextLocation(location) {
    return (!location.direction) ? "<<empty>>"
    : `${location.rawLocation.vehicle_id}\t${location.routeIdentifier} going ${location.direction}: ${location.nextStopName} \t ${location.seatAvailability} ${location.stalenessSeconds}`;
}




export { simpleTextAlert, simpleTextLocation };