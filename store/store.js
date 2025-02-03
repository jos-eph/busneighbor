import { getCurrentCoordinatesPromise } from "../service/location.js";
import { populateDistancesFromOrigin } from "../service/septa_api_translation.js";

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
        await this.updateUserLocation();
        this._refreshDistancesFromOrigin();
    }

}

export { Store }