class ProcessedAlert {
    constructor(processedRouteType, routeId, routeName, 
        processedCompoundMessage, detourId, detourStartLocation, detourReason, 
        processedDirectionsImpacted) {
        this.processedRouteIdentifier = routeName;
        this.processedRouteType = processedRouteType;
        this.processedDirectionsImpacted = processedDirectionsImpacted;
        this.processedCompoundMessage = processedCompoundMessage;
        this.routeId = routeId;
        this.routeName = routeName;
        this.detourId = detourId;
        this.detourStartLocation = detourStartLocation;
        this.detourReason = detourReason;
        }
}

class ProcessedAlertV2 {
    constructor(processedRouteType, processedCompoundMessage, processedDirectionsImpacted, rawAlert) {
        this.processedRouteType = processedRouteType;
        this.processedCompoundMessage = processedCompoundMessage;
        this.processedDirectionsImpacted = processedDirectionsImpacted;
        this.rawAlert = rawAlert;
        }
}

export { ProcessedAlert }