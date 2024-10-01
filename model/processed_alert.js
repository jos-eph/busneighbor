class ProcessedAlertV2 {
    constructor(alertId, routes, message, directionsImpacted, rawAlert) {
        this.alertId = alertId;
        this.routes = routes,
        this.message = message;
        this.directionsImpacted = directionsImpacted;
        this.rawAlert = rawAlert;
        }
}

export { ProcessedAlertV2 }