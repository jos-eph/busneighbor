import { Store } from "../../flowcontrol/store.js";
import { Indenter } from "../../common/indenter.js";
import { simpleTextAlert, simpleTextLocation } from "../processors/demonstration_processors.js";
import { LOCATIONS, ALERTS, NO_DIRECTION } from "../processors/indexed_processors.js";


// buggy - figure out why buggy

/**
 * Description placeholder
 *
 * @param {*} route
 * @param {Array} locationData
 * @param {Array} alertData
 */
function oneRoute(route, locationData, alertData) {
    const indenter = new Indenter(4, " ");
    indenter.place(`${route}`);
    for (const direction in locationData) {
        indenter.placeRight(direction);
//        indenter.indent();
        for(const individualLocation of locationData[direction]) {
            indenter.place(simpleTextLocation(individualLocation));
        }
        indenter.place("\n");
        if (alertData && alertData.hasOwnProperty(direction)) {
            for (const individualAlert of alertData[direction]) {
                indenter.place(simpleTextAlert(individualAlert));
            }
        }
        indenter.outdent();
    }
    if (!alertData) {
        return indenter.getFormatted();
    }
    if (alertData.hasOwnProperty(NO_DIRECTION) && alertData[NO_DIRECTION].size > 0) {
        indenter.place("\t\t--Applicable To All Directions--");
//        indenter.indent();
        for (const individualAlert of alertData[NO_DIRECTION]) {
            indenter.place("\t\t" + simpleTextAlert(individualAlert));
        }
        indenter.outdent();
    }

    return indenter.getFormatted();
}

/**
 * Convert a store to a useful text representation
 *
 * @param { Store } store
 */
function getTextStore(store) {
    console.log(store);
    let text = "";
    for (const route in store.sortedLocations.populatedLocations) {
        text += oneRoute(route, store.sortedLocations[route], store.sortedAlerts[route]) + "\n";   
    }
    return text;
}

export { getTextStore }