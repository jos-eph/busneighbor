import { includesAsWord, concatenateStrings, stalenessSeconds } from "../common/utilities.js";
import { LatitudeLongitude } from "./location.js";
import { DirectionsImpacted, Directions } from "../model/directions_impacted.js";
import { ProcessedAlert, ProcessedAlertV2 } from "../model/processed_alert.js";
import { ProcessedLocation, ProcessedLocationV2 } from "../model/processed_location.js";

const RouteTypes = {
    BUS: "bus",
    TROLLEY: "trolley",
    RAIL: "rr"
};

const SeatsAvailable = {
    YES_SEATS: new Set(["MANY_SEATS_AVAILABLE","EMPTY"]),
    SOME_SEATS: new Set(["FEW_SEATS_AVAILABLE", "STANDING_ROOM_ONLY", "NOT_AVAILABLE"]),
    NO_SEATS: new Set(["CRUSHED_STANDING_ROOM_ONLY", "FULL"])
};

const MAGIC_TIMESTAMP_FOR_STOPPED_BUS = 63240;

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

function translateDirectionLongForm(text) {
    for (const direction in DirectionsLongForm) {
        if (DirectionsLongForm[direction].toUpperCase() == text.toUpperCase()) {
            return Directions[direction];
        }
    }
}

function createProcessedLocation(locationJson) {
        return new ProcessedLocation(
            new LatitudeLongitude(locationJson.lat, locationJson.lng),
            locationJson.route_id,
            locationJson.trip,
            locationJson.VehicleID, 
            locationJson.BlockID,
            translateDirectionLongForm(locationJson.Direction),
            locationJson.destination,
            locationJson.heading,
            Number(locationJson.Offset_sec),
            locationJson.next_stop_id,
            locationJson.next_stop_name,
            locationJson.estimated_seat_availability,

            locationJson.timestamp === MAGIC_TIMESTAMP_FOR_STOPPED_BUS 
            ? "NO_SEATS" 
            : translateSeatClassification(locationJson.estimated_seat_availability),

            locationJson.timestamp,
            stalenessSeconds(Number(locationJson.timestamp))
        );

    }


function createProcessedLocationV2(locationJsonV2) {
    return new ProcessedLocationV2(
        locationJsonV2.route_id,
        new LatitudeLongitude(locationJsonV2.lat, locationJsonV2.lon),
        translateDirectionLongForm(locationJsonV2.direction_name),
        locationJsonV2.next_stop_name,
        locationJsonV2.timestamp === MAGIC_TIMESTAMP_FOR_STOPPED_BUS 
        ? "NO_SEATS" 
        : translateSeatClassification(locationJsonV2.seat_availability),
        locationJsonV2.delay,
        stalenessSeconds(Number(locationJsonV2.timestamp)),
        locationJsonV2.timestamp,
        locationJsonV2
    );
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

function createProcessedAlertV2(alertJsonV2) {
    return new ProcessedAlertV2(
       alertJsonV2.alert_id,
       alertJsonV2.message,
       determineDirectionsImpacted(alertJsonV2.message),
       alertJsonV2
    );
}

export { RouteTypes,
    determineDirectionsImpacted, createProcessedAlert, translateSeatClassification,
translateDirectionLongForm, createProcessedLocation, createProcessedAlertV2,
createProcessedLocationV2, MAGIC_TIMESTAMP_FOR_STOPPED_BUS, SeatsAvailable };