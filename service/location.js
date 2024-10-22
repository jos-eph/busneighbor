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
 * @param {WEST, EAST} vehicleDirection
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
 * @param {NORTH, SOUTH} vehicleDirection
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


class LatitudeLongitude {
    constructor(latitude, longitude) {
        this.latitude = parseFloat(latitude);
        this.longitude = parseFloat(longitude);
    }
}

/**
 * Compare two locations given the direction of the vehicle
 *
 * @param {LatitudeLongitude} userLocation
 * @param {LatitudeLongitude} vehicleLocation
 * @param {NORTH, SOUTH, WEST, EAST} vehicleDirection
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
    const settings = vehicleDirectionDistanceParams[vehicleDirection];
    const dimension = settings[COMPARE_TO]
    const multiplier = settings[INVERT_DIFFERENCE] ? -1 : 1;

    return (userPosition[dimension] - vehiclePosition[dimension]) * multiplier;
}


export { getCurrentCoordinatesPromise, isApproachingMe, 
    isLatitudeApproaching,
    isLongitudeApproaching,
    LatitudeLongitude, NORTH, SOUTH, EAST, WEST,
    perpendicularDegreeDistance 
}