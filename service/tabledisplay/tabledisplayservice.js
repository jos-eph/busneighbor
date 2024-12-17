import {  INFO_BOX, INFO_TEXT, ROUTE_GROUP, SINGLE_ROUTE_STATUS, VEHICLE_POSITIONS, BUS_NUMBER,
    INDIVIDUAL_DIRECTION, DIRECTION_HEADER, STATUS_HOLDER, STREET_POSITION, ALERT_MESSAGE } from './tabledisplayconstants.js'

function createDivOfClasses(classes, textContent) {
    let newElement = document.createElement('div');
    for (let cls of classes) {
        newElement.classList.add(cls);
    }
    newElement.innerText = textContent;
    return newElement;
}

export { createDivOfClasses };