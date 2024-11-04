import { Store } from "../../flowcontrol/store.js";
import { Indenter } from "../../common/indenter.js";
import { simpleTextAlert, simpleTextLocation } from "../processors/demonstration_processors.js";


/**
 * Description placeholder
 *
 * @param { Store } store
 */
function getTextStore(store) {
    const indenter = new Indenter(3, " ");
    for (const route in store.sortedLocations.populatedLocations) {
        console.log("route");   
    }

}

export { getTextStore }