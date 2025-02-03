class ProcessedLocationV2 {
    constructor(processedRouteIdentifier, processedVehicleLocation, processedDirection, processedNextStopName, processedSeatAvailability, processedMinutesLate, processedStalenessSeconds, 
        timestamp, vehicleId, rawLocation) {
            this.routeIdentifier = processedRouteIdentifier,
            this.vehicleLocation = processedVehicleLocation;
            this.direction = processedDirection;
            this.nextStopName = processedNextStopName;
            this.seatAvailability = processedSeatAvailability;
            this.minutesLate = processedMinutesLate;
            this.stalenessSeconds = processedStalenessSeconds;
            this.timestamp = timestamp;
            this.vehicleId = vehicleId;
            this.rawLocation = rawLocation;
           }
}

export { ProcessedLocationV2 };