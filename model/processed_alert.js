class ProcessedAlertV2 {
    constructor(alertId, message, directionsImpacted, rawAlert) {
        this.alertId = alertId;
        this.message = message;
        this.directionsImpacted = directionsImpacted;
        this.rawAlert = rawAlert;
        }
}

export { ProcessedAlertV2 }