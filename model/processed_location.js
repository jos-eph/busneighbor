class ProcessedLocation {
    constructor(processedVehicleLocation, routeId, trip, vehicleId, blockId,
         processedDirection, destination, heading, processedSecondsLate, nextStopId,
          nextStopName, seatAvailabilityRaw, processedSeatAvailability,
           positionTimestamp, processedStalenessSeconds) {
            this.processedRouteIdentifier = routeId;
            this.processedVehicleLocation = processedVehicleLocation;
            this.processedDirection = processedDirection;
            this.processedSeatAvailability = processedSeatAvailability;
            this.processedSecondsLate = processedSecondsLate;
            this.routeId = routeId;
            this.trip = trip;
            this.vehicleId = vehicleId;
            this.blockId = blockId;
            this.destination = destination;
            this.heading = heading;
            this.nextStopId = nextStopId;
            this.nextStopName = nextStopName;
            this.seatAvailabilityRaw = seatAvailabilityRaw;
            this.positionTimestamp = positionTimestamp;
            this.processedStalenessSeconds = processedStalenessSeconds;
           }
}

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

export { ProcessedLocation, ProcessedLocationV2 };