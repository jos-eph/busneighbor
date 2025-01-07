/* Depends on leaflet ~= 1.9.4 */

import { DirectedPushpin } from "../../model/directedPushpin.js";

const ICON_PATH = '../../mapgraphics/';
const ICON_SIZE = [35, 35];

const ICON_NORTH = L.icon({iconUrl: `${ICON_PATH}CompassN.svg`, iconSize: ICON_SIZE});
const ICON_SOUTH = L.icon({iconUrl: `${ICON_PATH}CompassS.svg`, iconSize: ICON_SIZE});
const ICON_EAST = L.icon({iconUrl: `${ICON_PATH}CompassE.svg`, iconSize: ICON_SIZE});
const ICON_WEST = L.icon({iconUrl: `${ICON_PATH}CompassW.svg`, iconSize: ICON_SIZE});
const ICON_SMILEY = L.icon({iconUrl: `${ICON_PATH}Smiley.svg`, iconSize: ICON_SIZE});

class ManagedMap {
    
    /**
     * Creates an instance of ManagedMap.
     *
     * @constructor
     * @param {HTMLElement} element
     * @param {Array<DirectedPushpin>} pushpins
     */
    constructor(element, pushpins) {
        this.pushpins = [];
        this.leafletMap = null;
        this.element = element;
        this.initialize();
        if (pushpins !== undefined) {
            this.populate(pushpins);
        }
    }

    initialize() {
        this.leafletMap = L.map(element);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(this.leafletMap);
    }

    /**
     * Adds a pushpin to the map
     *
     * @param {DirectedPushpin} pushpin
     */
    populate(pushpins) {
        this.clearPushpins();
        return;
    }

    clearPushpins() {
        for (const pushpin of this.pushpins) {
            this.leafletMap.removeLayer(pushpin); // is this the right way to remove a pushpin?
        }
        this.pushpins = [];
    }


}
