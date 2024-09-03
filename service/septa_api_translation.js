import { includesAsWord, concatenateStrings } from "../common/utilities";
import { LatitudeLongitude } from "./location";

const RouteTypes = {
    BUS: "bus",
    TROLLEY: "trolley",
    RAIL: "rr"
};

const Directions = {
    NORTH: "N",
    SOUTH: "S",
    WEST: "W",
    EAST: "E"
};

const SeatsAvailable = {
    YES_SEATS: new Set(["MANY_SEATS_AVAILABLE","EMPTY"]),
    SOME_SEATS: new Set(["FEW_SEATS_AVAILABLE", "STANDING_ROOM_ONLY"]),
    NO_SEATS: new Set(["NOT_AVAILABLE", "CRUSHED_STANDING_ROOM_ONLY", "FULL"])
};

function translateSeatClassification(seat_assertion) {
    for (const seatClassification in SeatsAvailable) {
        if (SeatsAvailable[seatClassification].has(seat_assertion)) {
            return seatClassification;
        }
    }
    return "NO_SEATS";
}

const DirectionsLongForm = {
    NORTH: "Northbound",
    SOUTH: "Southbound",
    WEST: "Westbound",
    EAST: "Eastbound"
}

class DirectionsImpacted {
    constructor(directions) {
        this[Directions.NORTH] = directions.includes(Directions.NORTH) ? true : false;
        this[Directions.SOUTH] = directions.includes(Directions.SOUTH) ? true : false;
        this[Directions.EAST] = directions.includes(Directions.EAST) ? true : false;
        this[Directions.WEST] = directions.includes(Directions.WEST) ? true : false;
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
    for (const direction in Directions) {
        const directionBound = `${Directions[direction]}B`; // abbreviation for northbound, southbound
        if (includesAsWord(text, directionBound)) {
            directionsBound.push(Directions[direction]);
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
    determineDirectionsImpacted, createProcessedAlert, translateSeatClassification };