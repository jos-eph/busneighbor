import { LatitudeLongitude } from '../model/latitudeLongitude.js';

function getCurrentCoordinatesPromise() {
    return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => { resolve(position.coords) } ,
                (error) => reject(error)
            );
        } else {
            reject(new Error("Geolocation not supported by this browser."));
        }
    });
}

/*


                    -W             +E
 /\  +N
  |                      Longitude
  |  Latitude       <--------------->
  |
 \/  -S

*/

const NORTH = "N"
const SOUTH = "S"
const WEST = "W"
const EAST = "E"

const DIRECTIONS = new Set([NORTH, SOUTH, EAST, WEST]);
const LONGITUDE_DIRECTIONS = new Set([WEST, EAST]);
const LATITUDE_DIRECTIONS = new Set([NORTH, SOUTH]);

/**
 * Longitude comparison
 *
 * @param {number} userLongitude
 * @param {number} vehicleLongitude
 * @param {[WEST, EAST]} vehicleDirection
 * @returns {boolean}
 */
function isLongitudeApproaching(userLongitude, vehicleLongitude, vehicleDirection) {
    const direction = vehicleDirection.slice(0, 1).toUpperCase();
    if (!LONGITUDE_DIRECTIONS.has(direction)) {
        throw new Error(`${vehicleDirection} is not a valid direction`);
    }

    if (direction == EAST) {
        return userLongitude > vehicleLongitude ? true : false;
    } else if (direction == WEST) {
        return userLongitude < vehicleLongitude ? true: false;
    }
}

/**
 * Latitude comparison
 *
 * @param {number} userLatitude
 * @param {number} vehicleLatitude
 * @param {string} vehicleDirection
 * @returns {boolean}
 */
function isLatitudeApproaching(userLatitude, vehicleLatitude, vehicleDirection) {
    const vehicleDirectionStandard = vehicleDirection.slice(0, 1).toUpperCase();
    if (!LATITUDE_DIRECTIONS.has(vehicleDirectionStandard)) {
        throw new Error(`${vehicleDirection} is not a valid direction`);
    }

    if (vehicleDirectionStandard == NORTH) {
        return userLatitude > vehicleLatitude ? true : false;
    } else if (vehicleDirectionStandard == SOUTH) {
        return userLatitude < vehicleLatitude ? true: false;
    }
}

/**
 * Compare two locations given the direction of the vehicle
 *
 * @param {LatitudeLongitude} userLocation
 * @param {LatitudeLongitude} vehicleLocation
 * @param {[NORTH, SOUTH, WEST, EAST]} vehicleDirection
 */
function isApproachingMe(userLocation, vehicleLocation, vehicleDirection) {
    const direction = vehicleDirection.slice(0, 1).toUpperCase();
    if (LATITUDE_DIRECTIONS.has(direction)) {
        return isLatitudeApproaching(userLocation.latitude, vehicleLocation.latitude, vehicleDirection);
    } else {
        return isLongitudeApproaching(userLocation.longitude, vehicleLocation.longitude, vehicleDirection);
    }
}


// Define necessary operations
const LATITUDE = "latitude";
const LONGITUDE = "longitude";
const COMPARE_TO = "compareTo";
const INVERT_DIFFERENCE = "invertSign" // whether to invert the sign of me distance - vehicle distance; positive indicates approaching

const vehicleDirectionDistanceParams = {
    [NORTH]: {
        [COMPARE_TO]: [LATITUDE],
        [INVERT_DIFFERENCE]: false,
    },

    [SOUTH]: {
        [COMPARE_TO]: [LATITUDE],
        [INVERT_DIFFERENCE]: true
    },

    [EAST]: {
        [COMPARE_TO]: [LONGITUDE],
        [INVERT_DIFFERENCE]: false,
    },

    [WEST]: {
        [COMPARE_TO]: [LONGITUDE],
        [INVERT_DIFFERENCE]: true
    }
}


/**
 * Show the perpendicular distance, in degrees. User position - vehicle position.
 * Lower numbers are closer, but negative numbers must be discarded because they are beyond the user and traveling away.
 *
 * @param {LatitudeLongitude} userPosition
 * @param {LatitudeLongitude} vehiclePosition
 * @param {string} vehicleDirection
 * @returns {number} distance
 */
function perpendicularDegreeDistance(userPosition, vehiclePosition, vehicleDirection) {
    console.log(`VehicleDirection looked up: ${vehicleDirection}`)
    const settings = vehicleDirectionDistanceParams[vehicleDirection];
    const dimension = settings[COMPARE_TO]
    const multiplier = settings[INVERT_DIFFERENCE] ? -1 : 1;
    console.log(`Looked up multiplier: ${multiplier}`);

    return (userPosition[dimension] - vehiclePosition[dimension]) * multiplier;
}



/**
 * Take a list of locations and return the extremes of those locations
 * Math.min(), Math.max()
 * @param {LatitudeLongitude[]} positions
 * @returns {Object}
 */
function getExtremePositions(positions) {
    const latitudes = positions.map(position => position.latitude);
    const longitudes = positions.map(position => position.longitude);
    
    return {
        latitude: {
            min: Math.min(...latitudes),
            max: Math.max(...latitudes)
        },
        
        longitude: {
            min: Math.min(...longitudes),
            max: Math.max(...longitudes)
        }
    };
}

function getMinimumEnclosingRectangle(positions) {
    const extremes = getExtremePositions(positions);
    const [latitudes, longitudes] = [extremes.latitude, extremes.longitude];
    
    const upperLeft = [latitudes.max, longitudes.min];
    const lowerRight = [latitudes.min, longitudes.max];
    
    return [upperLeft, lowerRight];
}


export { getCurrentCoordinatesPromise, isApproachingMe, 
    isLatitudeApproaching,
    isLongitudeApproaching,
    NORTH, SOUTH, EAST, WEST,
    perpendicularDegreeDistance,
    getExtremePositions,
    getMinimumEnclosingRectangle
}