import { defineHiddenProperty, objectOfKeys } from '../common/utilities.js';
import { POPULATED_ALERTS, POPULATED_LOCATIONS } from '../../service/processors/store_creators.js';
import { populateAlertsStore, populateLocationsStore } from '../../service/processors/store_creators.js';
import { indexAlert, indexLocation } from '../../service/processors/indexed_processors.js';
import { processStore } from '../service/processors/processor_aggregators.js';

class Store {
    constructor(routes) {
        this.routes = routes;
        this.locationsStore = {};
        this.alertsStore = {};
        this.sortedAlerts = {};
        this.sortedLocations = {};
    }

    async initialize() {
        await this.requestAlertsRefresh();
        await this.requestLocationsRefresh();
        this.indexAlerts();
        this.indexLocations();
    }

    // Alerts

    async requestAlertsRefresh() {
        return populateAlertsStore(this.routes, this.alertsStore);
    }

    indexAlerts() {
        this.sortedAlerts = objectOfKeys(this.routes);
        defineHiddenProperty(this.sortedAlerts, POPULATED_ALERTS);
        processStore(this.alertsStore, indexAlert, this.sortedAlerts);
    }

    // Locations
    async requestLocationsRefresh() {
        return populateLocationsStore(this.routes, this.locationsStore);
    }

    indexLocations() {
        this.sortedLocations = objectOfKeys(this.routes);
        defineHiddenProperty(this.sortedLocations, POPULATED_LOCATIONS);
        processStore(this.locationsStore, indexLocation, this.sortedLocations);
    }
}

export { Store }