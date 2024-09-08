import { populateRouteInfoAlerts, populateRouteInfoLocations,
    cleanRouteInfo
 } from "../../model/route_info_populator";
import { createProcessedAlert, createProcessedLocation } from "../../service/septa_api_translation";
import { ALERT_STUB, LOCATION_STUB } from "../stubs/septa_api_samples";
import { RouteInfo, NO_DIRECTION } from "../../model/route_info";
import { ProcessedAlert } from "../../service/septa_api_translation";
import { DirectionsImpacted } from "../../service/septa_api_translation";

test('Invoke alert populator and processors on stub and confirm no-direction population', () => {
    const processedAlerts = ALERT_STUB.map(alert => createProcessedAlert(alert));
    const routeInfo = new RouteInfo("45");
    populateRouteInfoAlerts(routeInfo, processedAlerts);
    expect(routeInfo["45"]["S"].alerts.length).toEqual(3);
});

test('Confirm no_direction population', () => {
    const routeInfo = new RouteInfo("45");
    const noDirectionAlert = new ProcessedAlert();
    noDirectionAlert.processedRouteIdentifier = "45";
    noDirectionAlert.processedDirectionsImpacted = new DirectionsImpacted([]);
    noDirectionAlert.processedCompoundMessage = "Not any direction mentioned";
    populateRouteInfoAlerts(routeInfo, [noDirectionAlert]);
    expect(routeInfo["45"][NO_DIRECTION].alerts.length).toEqual(1);
});

test('Confirm processed locations populated as expected, unavailable buses not listed', () => {
    const routeInfo = new RouteInfo("45");
    const processedLocations = LOCATION_STUB.map(location => createProcessedLocation(location));
    populateRouteInfoLocations(routeInfo, processedLocations);
    expect(routeInfo["45"]["N"].locations.length).toEqual(1);
    expect(routeInfo["45"]["S"].locations.length).toEqual(1);
});

test('Confirm routeInfo cleaned of blank directions', () => {
    const routeInfo = new RouteInfo("45");
    const processedLocations = LOCATION_STUB.map(location => createProcessedLocation(location));
    populateRouteInfoLocations(routeInfo, processedLocations);
    cleanRouteInfo(routeInfo);
    
    expect(Object.keys(routeInfo["45"]).includes([NO_DIRECTION])).toEqual(false);
    expect(Object.keys(routeInfo["45"]).includes("W")).toEqual(false);
});

test('Confirm nonblank alerts not purged for no direction', () => {
    const routeInfo = new RouteInfo("45");
    const processedLocations = LOCATION_STUB.map(location => createProcessedLocation(location));
    populateRouteInfoLocations(routeInfo, processedLocations);
    routeInfo["45"][NO_DIRECTION].alerts.push({"dummy": "alert"});
    cleanRouteInfo(routeInfo);

    expect(Object.keys(routeInfo["45"]).includes([NO_DIRECTION]));
});