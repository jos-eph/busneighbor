function getCurrentCoordinatesPromise() {
    return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => resolve(position.coords),
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
        throw new Error(`${vehicleDirection} is not a valid longitude`)
    }

    if (direction == EAST) {
        return userLongitude > vehicleLongitude ? true : false;
    } else if (direction == WEST) {
        return userLongitude < vehicleLongitude ? true: false;
    }
    return false;
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
    const direction = vehicleDirection.slice(0, 1).toUpperCase();
    if (!LATITUDE_DIRECTIONS.has(direction)) {
        throw new Error(`${vehicleDirection} is not a valid latitude`)
    }

    if (direction == NORTH) {
        return userLatitude > vehicleLatitude ? true : false;
    } else if (direction == SOUTH) {
        return userLatitude < vehicleLatitude ? true: false;
    }
    return false;
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
    console.log(`isApproachingMe ${JSON.stringify(vehicleDirection)} objs: ${JSON.stringify(userLocation)} | ${vehicleLocation} end objs`);
    const direction = vehicleDirection.slice(0, 1).toUpperCase();
    if (LATITUDE_DIRECTIONS.has(direction)) {
        return isLatitudeApproaching(userLocation.latitude, vehicleLocation.latitude, vehicleDirection);
    } else {
        return isLongitudeApproaching(userLocation.longitude, vehicleLocation.longitude, vehicleDirection);
    }
}


export { getCurrentCoordinatesPromise, isApproachingMe, LatitudeLongitude }