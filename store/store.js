import { getCurrentCoordinatesPromise } from "/busneighbor/service/location.js";
import { populateDistancesFromOrigin } from "/busneighbor/service/septa_api_translation.js";

class Store {
    constructor(managedMap, setSelectionInput) {
        this.userLocation = undefined;         // updates independent of route updates
        this.distancesFromOrigin = {};  // updates independent of route - but created if does not exist
        this.managedMap = managedMap;
        this.setSelectionInput = setSelectionInput;
        this.routeAlerts = {};     // fetched once
    }

    getRoutes() {
        return this.setSelectionInput.viewSelection();
    }

    async updateUserLocation() {
        this.userLocation = await getCurrentCoordinatesPromise();
    }

    async initialize() {
        await this.refreshUserInfo();
        this.routeAlerts = {}; // await populateRouteAlerts; update once;;
    }

    getDistancesFromOrigin() {
        return this.distancesFromOrigin;
    }

    getUserLocation() {
        return this.userLocation;
    }

    _refreshDistancesFromOrigin() {
        populateDistancesFromOrigin(this.userLocation, this.getRoutes(), this.distancesFromOrigin);        
    }

    async refreshUserInfo() {
        console.log("refresh user info running...");
        await this.updateUserLocation();
        this._refreshDistancesFromOrigin();
        this.managedMap.placeYou(this.getUserLocation());
        this.managedMap.zoomAroundLocation(this.getUserLocation());
    }

}

export { Store }