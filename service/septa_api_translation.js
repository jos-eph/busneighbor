import { NORTH, SOUTH, EAST, WEST } from "./location";
import { includesAsWord, concatenateStrings } from "../common/utilities";

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

function determineDirectionsImpacted(text) {
    let directionsBound = [];
    for (const direction in VehicleDirections) {
        const directionBound = VehicleDirections[direction]
        if (includesAsWord(text, directionBound)) {
            directionsBound.push(directionBound);
        }
    }

    return new DirectionsImpacted(directionsBound);
}

function createProcessedAlert(alertJson) {
    const routeId = alertJson.route_id;
    const routeType = alertJson.route_id.split("_")[0];
    const routeName = alertJson.route_name;
    const detourId = alertJson.detour_id;
    const detourStartLocation = alertJson.detour_start_location;
    const detourReason = alertJson.detour_reason;

    const compoundMessage = concatenateStrings(alertJson.current_message, 
        alertJson.advisory_message, alertJson.detour_message);
    const directionsImpacted = determineDirectionsImpacted(compoundMessage);
    
    return new ProcessedAlert(routeType, routeId, routeName, compoundMessage, detourId,
        detourStartLocation, detourReason, directionsImpacted);
}

export { RouteTypes, ProcessedAlert, DirectionsImpacted, 
    determineDirectionsImpacted, createProcessedAlert };