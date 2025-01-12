import { LatitudeLongitude } from "../model/latitudeLongitude.js";
import { includesAsWord, concatenateStrings, stalenessSeconds } from "../common/utilities.js";
import { perpendicularDegreeDistance } from "./location.js";
import { Directions } from "../model/directions_impacted.js";
import { ProcessedAlertV2 } from "../model/processed_alert.js";
import { ProcessedLocationV2 } from "../model/processed_location.js";

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

const PERPENDICULAR_DISTANCE = "perpendicularDistance";

function createProcessedLocationFactoryV2(currentLocation) {
    return (locationJsonV2) => {
        const processedLocation = createProcessedLocationV2(locationJsonV2);
        processedLocation[PERPENDICULAR_DISTANCE] = perpendicularDegreeDistance(currentLocation, processedLocation.vehicleLocation,  processedLocation.direction);
        return processedLocation;
    };
}

function determineDirectionsImpacted(text) {
    let directionsBound = new Set();
    for (const direction in Directions) {
        const directionBound = `${Directions[direction]}B`; // abbreviation for northbound, southbound
        // TODO: add an "or" to translate occasional nonstandard "Northbound", "Southbound", etc.
        if (includesAsWord(text, directionBound)) {
            directionsBound.add(Directions[direction]);
        }
    }

    return directionsBound;
}


function createProcessedAlertV2(alertJsonV2) {
    return new ProcessedAlertV2(
       alertJsonV2.alert_id,
       alertJsonV2.routes,
       alertJsonV2.message,
       determineDirectionsImpacted(alertJsonV2.message),
       alertJsonV2
    );
}

export { RouteTypes,
    determineDirectionsImpacted, translateSeatClassification,
translateDirectionLongForm, createProcessedAlertV2,
createProcessedLocationV2, createProcessedLocationFactoryV2, MAGIC_TIMESTAMP_FOR_STOPPED_BUS, PERPENDICULAR_DISTANCE, SeatsAvailable };