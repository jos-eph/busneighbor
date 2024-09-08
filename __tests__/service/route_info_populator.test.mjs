import { populateRouteInfoAlerts } from "../../model/route_info_populator";
import { createProcessedAlert } from "../../service/septa_api_translation";
import { ALERT_STUB } from "../stubs/septa_api_samples";
import { RouteInfo, NO_DIRECTION } from "../../model/route_info";

test('Invoke processors on stubs', () => {
    const processedAlerts = ALERT_STUB.map(alert => createProcessedAlert(alert));
    let routeInfo = new RouteInfo("45");
    console.log("Using routeInfo: " + JSON.stringify(routeInfo));
    populateRouteInfoAlerts(routeInfo, processedAlerts);
    console.log("GADZOOKS! " + JSON.stringify(routeInfo));
});