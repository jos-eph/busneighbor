class ProcessedLocationV2 {
    constructor(processedRouteIdentifier, processedVehicleLocation, processedDirection, processedNextStopName, processedSeatAvailability, processedMinutesLate, processedStalenessSeconds, 
        timestamp, rawLocation) {
            this.routeIdentifier = processedRouteIdentifier,
            this.vehicleLocation = processedVehicleLocation;
            this.direction = processedDirection;
            this.nextStopName = processedNextStopName;
            this.seatAvailability = processedSeatAvailability;
            this.minutesLate = processedMinutesLate;
            this.stalenessSeconds = processedStalenessSeconds;
            this.timestamp = timestamp;
            this.rawLocation = rawLocation;
           }
}

export { ProcessedLocationV2 };