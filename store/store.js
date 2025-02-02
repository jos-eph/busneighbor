import { getCurrentCoordinatesPromise } from "../service/location.js";

class Store {
    constructor() {
        this.userLocation = undefined;         // updates independent of route updates
        this.distancesFromOrigin = undefined;  // updates independent of route - but created if does not exist
        this.routeLocations = {}; // updates in the background
        this.routeAlerts = {};     // fetched once
    }

    async initialize() {
        this.userLocation = await getCurrentCoordinatesPromise(); // update on cycle;
        this.routeAlerts = {}; // await populateRouteAlerts; update once;
        // this.populateRoutes(); // update continuously;
    }
}

export { Store }