import {  INFO_BOX, INFO_TEXT, ROUTE_GROUP, SINGLE_ROUTE_STATUS, VEHICLE_POSITIONS, BUS_NUMBER,
    INDIVIDUAL_DIRECTION, DIRECTION_HEADER, STATUS_HOLDER, STREET_POSITION, ALERT_MESSAGE } from './tabledisplayconstants.js'

import { DirectionLocations } from '../../model/directionLocations.js';
import { stringifySet, unStringifySet } from '../../common/utilities.js';

const newDiv = () => document.createElement('div');

function createDivOfClasses(classes, textContent) {
    let newElement = newDiv();
    for (let cls of classes) {
        newElement.classList.add(cls);
    }
    if (textContent !== undefined) {
        newElement.innerText = textContent;
    }
    return newElement;
}

/**
 * Enclose a bus number in a box
 *
 * @param {string} busNumber
j * @returns {HTMLElement}
 */
function createRouteNumber(busNumber) {
    let enclosingBox = createDivOfClasses([INFO_BOX]);
    let innerBox = createDivOfClasses([INFO_TEXT, BUS_NUMBER], busNumber);
    enclosingBox.appendChild(innerBox);
    return enclosingBox;
}


/**
 * List positions for a bus in a single direction
 *
 * @param {string} direction
 * @param {Array[string]} streets
 * @returns {HTMLElement}
 */
function createBusSingleDirectionPosition(direction, streets) {
    const busDirectionBox = createDivOfClasses([INDIVIDUAL_DIRECTION]);
    
    const directionHeader = createDivOfClasses([DIRECTION_HEADER], direction);
    busDirectionBox.appendChild(directionHeader);

    const statusHolder = createDivOfClasses([STATUS_HOLDER]);
    streets.forEach(street => statusHolder.appendChild(createDivOfClasses[INFO_TEXT, STREET_POSITION]));
    busDirectionBox.appendChild(statusHolder);

    return busDirectionBox;

}

/**
 * List positions for a bus in a single direction
 *
 * @param {string} route
 * @param {Array[DirectionLocations]} directionsInfo
 * @returns {HTMLElement}
 */
function createStatusLineWithAlertMessage(route, directionsInfo) {
    const enclosingBox = createDivOfClasses([SINGLE_ROUTE_STATUS]);
    
    const busNumber = createRouteNumber(route);
    enclosingBox.appendChild(busNumber);


}


// You can store data in e.g. element.dataset['parameter']
// encapsulate the message in a constructor function
// element.dataset.<<property>> = to set

export { createDivOfClasses, createRouteNumber as createBusNumber };