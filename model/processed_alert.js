class ProcessedAlert {
    constructor(routeType, routeId, routeName, compoundMessage, detourId, detourStartLocation, detourReason, directionsImpacted) {
        this.routeType = routeType;
        this.routeId = routeId;
        this.routeName = routeName;
        this.compoundMessage = compoundMessage;
        this.detourId = detourId;
        this.detourStartLocation = detourStartLocation;
        this.detourReason = detourReason;
        this.directionsImpacted = directionsImpacted;
    }
}

export { ProcessedAlert }