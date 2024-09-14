import { ProcessedAlert } from "../../model/processed_alert.js";
import { ProcessedLocation } from "../../model/processed_location.js";



/**
 * Description placeholder
 *
 * @param {ProcessedAlert} alert
 * @returns {string}
 */
function simpleTextAlert(alert) {
    let directionsString = "";
    for (const [key, value] of Object.entries(alert.processedDirectionsImpacted)) {
        if (key == undefined) {
            console.log(`Undefined. ${key} ${value}`);
        }
        if (value == true) {
            directionsString += key;
        }
    }
    console.log(`Routes affected reduced to: ${directionsString}`);
    return (!directionsString) ? undefined
    : `${alert.processedRouteType} ${alert.processedRouteIdentifier} going ${directionsString}: ${alert.processedCompoundMessage}`;
}

export { simpleTextAlert };