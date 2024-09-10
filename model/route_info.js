import { Directions } from "./directions_impacted";
import { createReactiveDataHolder, DataHolder } from "./data_holder";

const LOCATIONS = "locations";
const ALERTS = "alerts";
const NO_DIRECTION = "noDirectionFound"

const _empty_locations_alerts = () => {
    const locationsAlerts = createReactiveDataHolder([LOCATIONS], [ALERTS]);
    locationsAlerts[LOCATIONS] = [];
    locationsAlerts[ALERTS] = [];
    return locationsAlerts;
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

class RouteInfo extends DataHolder {
    constructor(...routes) {
        super(...routes);
        console.log(`RouteInfo: ${JSON.stringify(this)} routes: ${routes}`);
        for (let route of routes) {
            this[route] = _empty_info_by_direction();
        }
        console.log(`RouteInfo: ${JSON.stringify(this)} routes: ${routes}`);
    }
}

export { RouteInfo, NO_DIRECTION, LOCATIONS, ALERTS }