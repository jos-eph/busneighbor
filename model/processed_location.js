class ProcessedLocation {
    constructor(vehicleLocation, routeId, trip, vehicleId, blockId,
         direction, destination, heading, secondsLate, nextStopId,
          nextStopName, seatAvailabilityRaw, seatAvailabilityTranslated,
           positionTimestamp) {
            this.vehicleLocation = vehicleLocation;
            this.routeId = routeId;
            this.trip = trip;
            this.vehicleId = vehicleId;
            this.blockId = blockId;
            this.direction = direction;
            this.destination = destination;
            this.heading = heading;
            this.secondsLate = secondsLate;
            this.nextStopId = nextStopId;
            this.nextStopName = nextStopName;
            this.seatAvailabilityRaw = seatAvailabilityRaw;
            this.seatAvailabilityTranslated = seatAvailabilityTranslated;
            this.positionTimestamp = positionTimestamp;
           }
}

export { ProcessedLocation };