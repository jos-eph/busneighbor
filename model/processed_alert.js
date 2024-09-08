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

export { ProcessedAlert }