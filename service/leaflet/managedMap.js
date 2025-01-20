/* Depends on leaflet ~= 1.9.4 */

import { DirectedPushpin } from "../../model/directedPushpin.js";
import { getMinimumEnclosingRectangle } from "../location.js";
import { Directions } from "../../model/directions_impacted.js";
import { LatitudeLongitude } from "../../model/latitudeLongitude.js";

// Define constants

const PUSHPIN_CLASS = "map-pushpin-style"

const ICON_PATH = '../mapgraphics/';


function centeredIconProperties(iconX, iconY) {
    return {
        iconSize: [iconX, iconY],
        tooltipAnchor: [Math.floor(iconX / 2) - 9, Math.floor(iconY / 2) - 5] 
     };
}
     
const ICON_SIZE = [16, 16];       
const MAP_GRAPHIC_DIRECTORY_AFTER_ROOT = "/mapgraphics";

// Core map class

// http://127.0.0.1:5500/visualdisplay/undefined/mapgraphics/CompassS.svg

class ManagedMap {
    
    /**
     * Creates an instance of ManagedMap.
     *
     * @constructor
     * @param {HTMLElement} element
     * @param {Array<DirectedPushpin>} pushpinRequests
     * @param {string} pathToRepoRoot Path to repo root for the file where the map is imported
     */
    constructor(element, pathToRepoRoot, pushpinRequests) {
        this.populateRequests = 0;
        this.pushpinData = new Map();
        this.iconMappings = this.getDirectionIconMap(pathToRepoRoot);
        this.leafletMap = null;
        this.element = element;
        this.initialize();
        if (pushpinRequests !== undefined) {
            this.populate(pushpinRequests);
        }
    }


    /**
     * Map direction strings to icons
     *
     * @param {string} repoRoot Path relative to root where managedMap is invoked
     */
    getDirectionIconMap(repoRoot) {
        const iconPath = `${repoRoot}${MAP_GRAPHIC_DIRECTORY_AFTER_ROOT}`;

        console.log("About to make icons...");
        const iconNorth = L.icon({iconUrl: `${iconPath}/CompassN.svg`, ...centeredIconProperties(...ICON_SIZE)});
        const iconSouth = L.icon({iconUrl: `${iconPath}/CompassS.svg`, ...centeredIconProperties(...ICON_SIZE)})
        const iconEast = L.icon({iconUrl: `${iconPath}/CompassE.svg`, ...centeredIconProperties(...ICON_SIZE)})
        const iconWest = L.icon({iconUrl: `${iconPath}/CompassW.svg`,...centeredIconProperties(...ICON_SIZE)})
        const iconSmiley = L.icon({iconUrl: `${iconPath}/Smiley.svg`, ...centeredIconProperties(...ICON_SIZE)});


        const iconMappings = new Map();
            iconMappings.set(Directions.NORTH, iconNorth);
            iconMappings.set(Directions.SOUTH, iconSouth);
            iconMappings.set(Directions.WEST, iconWest);
            iconMappings.set(Directions.EAST, iconEast);
            iconMappings.set(Directions.STATIONARY, iconSmiley);

        return iconMappings;
    }

    /**
     * Get icon mapping for a direction
     *
     * @param {string} direction
     * @returns {L.Icon}
     */
    getIconForDirection(direction) {
        // for some reason, cannot retrieve data from this map using this GET call
        const icon = this.iconMappings.get(direction);
        if (icon === undefined) {
            throw new Error(`Missing icon mapping for ${direction}!`);
        }
        return icon;
    }

    initialize() {
        this.leafletMap = L.map(this.element).setView([39.9453, -75.1418], 14);
       // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
           {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
           }).addTo(this.leafletMap);
    }

    /**
     * Zoom to the rectangle that encloses given locations
     *
     * @param {Array<LatitudeLongitude>} locations 
     */
    zoomToLocations(locations) {
        this.leafletMap.flyToBounds(getMinimumEnclosingRectangle(locations));
    }
    
    
    /**
     * Zoom in to a location (such as "you are here")
     *
     * @param {LatitudeLongitude} location 
     */
    zoomAroundLocation(location) {
        this.leafletMap.flyTo([location.latitude, location.longitude], 15);
    }

    
    /**
     * Draw a pushpin
     *
     * @param {DirectedPushpin} pushpinRequest
     * @returns {L.marker} 
     */
    _drawPushpin(pushpinRequest) {
        const icon = this.getIconForDirection(pushpinRequest.direction);
        const newPushpin = L.marker([pushpinRequest.latitude, pushpinRequest.longitude], {icon: icon});
        newPushpin
            .addTo(this.leafletMap)
            .bindTooltip(pushpinRequest.name, {
              permanent: true,         // Always show the label
              direction: 'top',
              opacity: 1.0,
              className: 'map-pushpin-style' // Add a CSS class for styling
            });
        this.pushpinData.set(pushpinRequest, newPushpin);
        return newPushpin;
    }

    /**
     * Adds pushpins to the map
     *
     * @param {Array<DirectedPushpin>} pushpinRequests
     * @param {LatitudeLongitude} userLocation
     */
    populate(pushpinRequests, userLocation) {
        this.clearPushpins();
        for (const pushpinRequest of pushpinRequests) {
            this._drawPushpin(pushpinRequest);
        }
        if (location !== undefined) {
            this._drawPushpin(new DirectedPushpin(
                userLocation.latitude, userLocation.longitude, "You!", Directions.STATIONARY
            ));
            this.zoomAroundLocation(userLocation);
        }
        this.populateRequests += 1;

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