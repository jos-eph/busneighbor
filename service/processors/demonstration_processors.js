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
    console.log(JSON.stringify(alert));
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
    return (location.processedDirection === undefined) ? "<<empty>>"
    : `${location.processedRouteIdentifier} going ${location.processedDirection}: ${location.nextStopName}`;
}




export { simpleTextAlert, simpleTextLocation };