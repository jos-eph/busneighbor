import {  INFO_BOX, INFO_TEXT, ROUTE_GROUP, SINGLE_ROUTE_STATUS, VEHICLE_POSITIONS, BUS_NUMBER,
    INDIVIDUAL_DIRECTION, DIRECTION_HEADER, STATUS_HOLDER, STREET_POSITION, ALERT_MESSAGE, STATUS_LINE_MESSAGE_GROUPS } 
    from '../service/tabledisplay/tabledisplayconstants.js'

import { createDivOfClasses, createStatusLineWithAlertMessage } from '../service/tabledisplay/tabledisplayservice.js'
import { DirectionLocations } from '../model/directionLocations.js'

// alert("Table demo script started!")

function createFakeDirectionLocation(direction) {
    return new DirectionLocations(
        direction,
        {"Eeny": "YES_SEATS", "Meeny": "SOME_SEATS", "Miny": "SOME_SEATS"},
        direction + "aLeRt!!!!"
    );
}

function createFakeDirectionLocationBundle() {
    const directions = ["North", "South"];
    const allDirections = [];
    directions.forEach(direction => 
        allDirections.push(createFakeDirectionLocation(direction))
    );
    return allDirections;
}

function createFakeRouteBox(route) {
    return createStatusLineWithAlertMessage(route, createFakeDirectionLocationBundle());
}

const statusContainer = createDivOfClasses([STATUS_LINE_MESSAGE_GROUPS]);
const routes = ["35","42","47"];
console.log(routes);
routes.forEach((route) => {
    console.log(route);
    statusContainer.appendChild(
        createFakeRouteBox(route, createFakeRouteBox(route))
    )
});
document.body.appendChild(statusContainer);
