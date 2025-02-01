import { getCurrentCoordinatesPromise } from "../service/location";

class Store {
    constructor() {
        this.userLocation = undefined;
        this.routeLocations = {};
        this.routeAlerts = {};
    }

    async initialize() {
        this.userLocation = await getCurrentCoordinatesPromise(); // update on cycle;
        this.routeAlerts = {}; // await populateRouteAlerts; update once;
        // this.populateRoutes(); // update continuously;
    }
}