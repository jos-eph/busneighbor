/* Depends on leaflet ~= 1.9.4 */

import { DirectedPushpin } from "../../model/directedPushpin.js";
import { getMinimumEnclosingRectangle } from "../location.js";
import { Directions } from "../../model/directions_impacted.js";

// Define constants

const PUSHPIN_CLASS = "map-pushpin-style"

const ICON_PATH = '../../mapgraphics/';


function centeredIconProperties(iconX, iconY) {
    return {
        iconSize: [iconX, iconY],
        tooltipAnchor: [Math.floor(iconX / 2) - 9, Math.floor(iconY / 2) - 5] 
     };
}
     
const ICON_SIZE = [20, 20];       

const ICON_NORTH = L.icon({iconUrl: `${ICON_PATH}CompassN.svg`, ...centeredIconProperties(...ICON_SIZE)});
const ICON_SOUTH = L.icon({iconUrl: `${ICON_PATH}CompassS.svg`, ...centeredIconProperties(...ICON_SIZE)})
const ICON_EAST = L.icon({iconUrl: `${ICON_PATH}CompassE.svg`, ...centeredIconProperties(...ICON_SIZE)})
const ICON_WEST = L.icon({iconUrl: `${ICON_PATH}CompassW.svg`,...centeredIconProperties(...ICON_SIZE)})
const ICON_SMILEY = L.icon({iconUrl: `${ICON_PATH}Smiley.svg`, ...centeredIconProperties(...ICON_SIZE)});


const ICON_MAPPINGS = new Map();
    ICON_MAPPINGS.set(Directions.NORTH, ICON_NORTH);
    ICON_MAPPINGS.set(Directions.SOUTH, ICON_SOUTH);
    ICON_MAPPINGS.set(Directions.WEST, ICON_WEST);
    ICON_MAPPINGS.set(Directions.EAST, ICON_EAST);
    ICON_MAPPINGS.set(Directions.STATIONARY, ICON_SMILEY);



/**
 * Get icon mapping for a direction
 *
 * @param {string} direction
 * @returns {L.Icon}
 */
function getIconForDirection(direction) {
    // for some reason, cannot retrieve data from this map using this GET call
    const icon = ICON_MAPPINGS.get(direction);
    if (icon === undefined) {
        throw new Error("Missing icon mapping!");
    }
    return icon;
}

// Core map class

class ManagedMap {
    
    /**
     * Creates an instance of ManagedMap.
     *
     * @constructor
     * @param {HTMLElement} element
     * @param {Array<DirectedPushpin>} pushpinRequests
     */
    constructor(element, pushpinRequests) {
        this.pushpinData = new Map();
        this.leafletMap = null;
        this.element = element;
        this.initialize();
        if (pushpinRequests !== undefined) {
            this.populate(pushpinRequests);
        }
    }

    initialize() {
        this.leafletMap = L.map(this.element).setView([39.9453, -75.1418], 14);
       // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
           {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
           }).addTo(this.leafletMap);
    }


// need to test this

    /**
     * Adds pushpins to the map
     *
     * @param {Array<DirectedPushpin>} pushpinRequests
     */
    populate(pushpinRequests) {
        this.clearPushpins();
        for (const pushpinRequest of pushpinRequests) {
            const icon = getIconForDirection(pushpinRequest.direction);
            const newPushpin = L.marker([pushpinRequest.latitude, pushpinRequest.longitude], {icon: icon});
            console.log(this.leafletMap);
            newPushpin
                .addTo(this.leafletMap)
   //             .bindTooltip(pushpinRequest.name, {
                  .bindTooltip("45", {
                  permanent: true,         // Always show the label
                  direction: 'top',
                  opacity: 1.0,
                  className: 'map-pushpin-style' // Add a CSS class for styling
                });
            this.pushpinData.set(pushpinRequest, newPushpin);
            this.leafletMap.flyToBounds(getMinimumEnclosingRectangle(pushpinRequests));
        }

    }

    clearPushpins() {
        for (const [pushpinRequest, pushpinObject] of this.pushpinData) {
            this.leafletMap.removeLayer(pushpinObject);
            this.pushpinData.delete(pushpinRequest);
        }
        this.pushpins = new Map();
    }

}

export { ManagedMap };