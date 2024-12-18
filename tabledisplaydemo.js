import {  INFO_BOX, INFO_TEXT, ROUTE_GROUP, SINGLE_ROUTE_STATUS, VEHICLE_POSITIONS, BUS_NUMBER,
    INDIVIDUAL_DIRECTION, DIRECTION_HEADER, STATUS_HOLDER, STREET_POSITION, ALERT_MESSAGE } 
    from './service/tabledisplay/tabledisplayconstants.js'

import { createDivOfClasses } from './service/tabledisplay/tabledisplayservice.js'

alert("Table demo script started!")

function createAndAppend(classes, text) {
    const newElement = createDivOfClasses(classes, text);
    document.body.append(newElement);
}

createAndAppend([INFO_BOX, INFO_TEXT, BUS_NUMBER], "ŸotAo");
createAndAppend([[INFO_BOX, STREET_POSITION], "yellow"]);
createAndAppend([INFO_BOX, INFO_TEXT, ALERT_MESSAGE], "Hello alert!")