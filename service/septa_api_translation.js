import { LatitudeLongitude } from "../model/latitudeLongitude.js";
import { includesAsWord, stalenessSeconds } from "../common/utilities.js";
import { perpendicularDegreeDistance } from "./location.js";
import { Directions } from "../model/directions_impacted.js";
import { ProcessedAlertV2 } from "../model/processed_alert.js";
import { ProcessedLocationV2 } from "../model/processed_location.js";
import { startStop } from '../startStop.js'

const RouteTypes = {
    BUS: "bus",
    TROLLEY: "trolley",
    RAIL: "rr"
};

const SeatsAvailable = {
    YES_SEATS: new Set(["MANY_SEATS_AVAILABLE","EMPTY"]),
    SOME_SEATS: new Set(["TBD", "FEW_SEATS_AVAILABLE", "STANDING_ROOM_ONLY", "NOT_AVAILABLE"]),
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
        locationJsonV2.vehicle_id,
        locationJsonV2
    );
}

const PERPENDICULAR_DISTANCE = "perpendicularDistance";


/**
 * Populate `directionsFromOrigin` with a list of all route-directions 
 * origins' distance from the current position
 *
 * @param {LatitudeLongitude} currentLocation User's location 
 * @param {Array<string>} routes 
 * @param {object} distancesFromOrigin Object of the form { "1": {"N": <<number>>,
     "S": <<number>> }} etc.
 */
     function populateDistancesFromOrigin(currentLocation, routes, distancesFromOrigin) {
        for (const route of Object.keys(startStop)) {
            for (const direction of Object.keys(startStop[route])) {
                const routeOriginPosition = startStop?.[route]?.[direction]?.begins;
                if (routeOriginPosition !== undefined) {
                    const perpendicularDistance = perpendicularDegreeDistance(currentLocation, routeOriginPosition, direction);
                    distancesFromOrigin[route] = distancesFromOrigin[route] || {}
                    distancesFromOrigin[route][direction] = perpendicularDistance;
                }
            }
        }
    }


/**
 * Provide a relative perpendicular distance -- from the start of the route, 
 *
 * @param {LatitudeLongitude} userLocation 
 * @param {ProcessedLocationV2} processedLocation 
 * @param {Object} distancesFromOrigin 
 * @returns {number} 
 */
function routeAwarePerpendicularDistance(userLocation, processedLocation, distancesFromOrigin) {
    const [route, direction, vehicleLocation] = [processedLocation.routeIdentifier, processedLocation.direction, processedLocation.vehicleLocation];
    const userToRouteBeginDistance = distancesFromOrigin?.[route]?.[direction];
    const routeBeginningLocation = startStop?.[route]?.[direction]?.begins;
    let referenceLocation;
    if (userToRouteBeginDistance === undefined || userToRouteBeginDistance > 0 || routeBeginningLocation === undefined) {
        referenceLocation = userLocation;
    } else {
        referenceLocation = routeBeginningLocation;
    }
//    console.log(`${route} ${direction} - ${userToRouteBeginDistance} ${JSON.stringify(routeBeginningLocation)}`);
    return perpendicularDegreeDistance(referenceLocation, vehicleLocation, direction);
}

function createProcessedLocationFactoryV2(currentLocation, distancesFromOrigin, startStop) {
    return function (locationJsonV2) {
        const processedLocation = createProcessedLocationV2(locationJsonV2);
        processedLocation[PERPENDICULAR_DISTANCE] = routeAwarePerpendicularDistance(currentLocation, processedLocation, distancesFromOrigin);
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
createProcessedLocationV2, createProcessedLocationFactoryV2, 
MAGIC_TIMESTAMP_FOR_STOPPED_BUS, PERPENDICULAR_DISTANCE, SeatsAvailable,
routeAwarePerpendicularDistance, populateDistancesFromOrigin };