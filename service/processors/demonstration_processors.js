import { ProcessedAlertV2 } from "../../model/processed_alert.js";
import { iterableToString } from "../../common/utilities.js";

/**
 * Convert alerts to a simple text string
 *
 * @param {ProcessedAlertV2} alert
 * @returns {string}
 */
// function simpleTextAlert(alertV2) {
//     return (alertV2.directionsImpacted.size === 0) ? undefined
//     : `${iterableToString(alertV2.routes)} going ${iterableToString(alertV2.directionsImpacted)}: ${alertV2.message}`;
// }
function simpleTextAlert(alertV2) {
    return `${alertV2.message}`;
}

/**
 * Convert locations to a simple text string
 *
 * @param {ProcessedLocationV2} location
 * @returns {string}
 */
// function simpleTextLocation(locationV2) {
//     return `${locationV2.rawLocation.vehicle_id}\t${locationV2.routeIdentifier} going ${locationV2.direction}: ${locationV2.nextStopName} \t ${locationV2.seatAvailability} ${locationV2.stalenessSeconds}`;
// }
function simpleTextLocation(locationV2) {
    return `\t ${locationV2.nextStopName} \t\t ${locationV2.seatAvailability}`;
}




export { simpleTextAlert, simpleTextLocation };