import { Directions } from "./directions_impacted";

const LOCATIONS = "locations";
const ALERTS = "alerts";
const NO_DIRECTION = "noDirectionFound"

const _empty_locations_alerts = () => {
    return {
        [LOCATIONS]: [],
        [ALERTS]: []
    }
}

const _empty_info_by_direction = () => {
    return {
        [Directions.NORTH]: _empty_locations_alerts(),
        [Directions.SOUTH]: _empty_locations_alerts(),
        [Directions.WEST]: _empty_locations_alerts(),
        [Directions.EAST]: _empty_locations_alerts(),
        [NO_DIRECTION]: { [ALERTS]: [] }
    }
};

class RouteInfo {
    constructor(...routes) {
        for (let route of routes) {
            this[route] = _empty_info_by_direction();
        }
    }
}

export { RouteInfo, NO_DIRECTION }