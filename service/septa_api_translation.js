import { NORTH, SOUTH, EAST, WEST } from "./location";

const RouteTypes = {
    BUS: "bus",
    TROLLEY: "trolley",
    RAIL: "rr"
};

const VehicleDirections = {
    NORTH: "NB",
    SOUTH: "SB",
    WEST: "WB",
    EAST: "EB"
}

class DirectionsImpacted {
    constructor(directions) {
        this[VehicleDirections.NORTH] = directions.includes(VehicleDirections.NORTH) ? true : false;
        this[VehicleDirections.SOUTH] = directions.includes(VehicleDirections.SOUTH) ? true : false;
        this[VehicleDirections.EAST] = directions.includes(VehicleDirections.EAST) ? true : false;
        this[VehicleDirections.WEST] = directions.includes(VehicleDirections.WEST) ? true : false;
    }
}

function includesAsWord(text, word) {
    const pattern = new RegExp(`\\b${word}\\b`, 'g'); 
    return Boolean(text.match(pattern));
}




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

export { RouteTypes, includesAsWord, ProcessedAlert, DirectionsImpacted };