/* Depends on leaflet ~= 1.9.4 */

import { DirectedPushpin } from "../../model/directedPushpin.js";
import { getMinimumEnclosingRectangle } from "../location.js";
import { LatitudeLongitude } from "../../model/latitudeLongitude.js";
import { getDirectionIconMap } from "./icon_functions.js";
import { ProcessedLocationV2 } from "../../model/processed_location.js";
import { safeAddToKeyedSet } from "../../common/utilities.js";

const PUSHPIN_STYLE = "map-pushpin-style";

// http://127.0.0.1:5500/visualdisplay/undefined/mapgraphics/CompassS.svg

class ManagedMap {
    
    /**
     * Creates an instance of ManagedMap.
     *
     * @constructor
     * @param {HTMLElement} element
     * @param {string} pathToRepoRoot Path to repo root for the file where the map is imported
     */
    constructor(element, pathToRepoRoot) {
        this.populateRequests = 0;
        this.leafletMap = null;
        this.element = element;
        this.iconMappings = getDirectionIconMap(pathToRepoRoot);
        this.initialize();

        this.vehicleIdLocations = new Map();
        this.pushpinLocations = new Map();
        this.vehicleIdPushpins = new Map();
        this.routePushpins = new Map();
    }

    /**
     * Get icon mapping for a direction
     *
     * @param {string} direction
     * @returns {L.Icon}
     */
    _getIconForDirection(direction) {
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
        const icon = this._getIconForDirection(pushpinRequest.direction);
        const newPushpin = L.marker([pushpinRequest.latitude, pushpinRequest.longitude], {icon: icon});
        newPushpin
            .addTo(this.leafletMap)
            .bindTooltip(pushpinRequest.name, {
              permanent: true,         // Always show the label
              direction: 'top',
              opacity: 1.0,
              className: PUSHPIN_STYLE // Add a CSS class for styling
            });
        return newPushpin;
    }

    _clearPushpin(pushpin) {
        const location = this.pushpinLocations.get(pushpin);
        const vehicleId = location.vehicleId;
        const route = location.routeIdentifier;

        this.vehicleIdLocations.delete(location);
        this.pushpinLocations.delete(pushpin);
        this.vehicleIdPushpins.delete(vehicleId);
        this.routePushpins.get(route).delete(pushpin);

        this.leafletMap.removeLayer(pushpin);
    }

    _registerPushpin(pushpin, location) {
        this.pushpinLocations.set(pushpin, location);
        this.vehicleIdLocations.set(location.vehicleId, location);
        this.vehicleIdPushpins.set(location.vehicleId, pushpin);
        safeAddToKeyedSet(this.routePushpins, location.routeIdentifier,
            pushpin
        );
    }


    
    /**
     * Add and track pushpins based on location
     *
     * @param {ProcessedLocationV2} location 
     */
    addPushpin(location) {
        const newPushpin = this._drawPushpin({
            latitude: location.vehicleLocation.latitude,
            longitude: location.vehicleLocation.longitude,
            name: location.vehicleLocation.routeIdentifier,
            direction: location.direction
        });

        const oldPushpin = this.vehicleIdPushpins.get(location.vehicleId);
        if (oldPushpin !== undefined) {
            this._clearPushpin(oldPushpin);            
        }

        this._registerPushpin(location, pushpin);
    }


}

export { ManagedMap };