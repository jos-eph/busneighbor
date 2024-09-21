import { ProcessedAlert } from "../../model/processed_alert.js";
import { ProcessedLocation } from "../../model/processed_location.js";



/**
 * Convert alerts to a simple text string
 *
 * @param {ProcessedAlert} alert
 * @returns {string}
 */
function simpleTextAlert(alert) {
    let directionsString = "";
    for (const [key, value] of Object.entries(alert.processedDirectionsImpacted)) {
        if (value == true) {
            directionsString += key;
        }
    }
    return (!directionsString) ? undefined
    : `${alert.processedRouteType} ${alert.processedRouteIdentifier} going ${directionsString}: ${alert.processedCompoundMessage}`;
}

/**
 * Convert locations to a simple text string
 *
 * @param {ProcessedLocation} location
 * @returns {string}
 */
function simpleTextLocation(location) {
    return (!location.processedDirection) ? "<<empty>>"
    : `${location.vehicleId}\t${location.processedRouteIdentifier} going ${location.processedDirection}: ${location.nextStopName} \t ${location.processedSeatAvailability} ${location.processedStalenessSeconds}`;
}




export { simpleTextAlert, simpleTextLocation };