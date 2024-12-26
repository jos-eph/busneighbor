import {  INFO_BOX, INFO_TEXT, ROUTE_GROUP, SINGLE_ROUTE_STATUS, VEHICLE_POSITIONS, BUS_NUMBER,
    INDIVIDUAL_DIRECTION, DIRECTION_HEADER, STATUS_HOLDER, STREET_POSITION, ALERT_MESSAGE,
SOME_SEATS_CSS, YES_SEATS_CSS } from './tabledisplayconstants.js'

import { DirectionLocations } from '../../model/directionLocations.js';
import { ProcessedLocationV2 } from '../../model/processed_location.js';

const ALERT_TEXT = "directionAlertText";
const newDiv = () => document.createElement('div');
const LOCATIONS_PARAMETER = "locations";
const ALERTS_PARAMETER = "alerts";

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
 * @param { Array[ProcessedLocationV2] } directionLocations
 * @returns {HTMLElement}
 */
function createBusSingleDirectionPosition(direction, directionLocations) {
    const busDirectionBox = createDivOfClasses([INDIVIDUAL_DIRECTION]);
    
    const directionHeader = createDivOfClasses([DIRECTION_HEADER], direction);
    busDirectionBox.appendChild(directionHeader);

    const statusHolder = createDivOfClasses([STATUS_HOLDER]);
    console.log("directionLocations: ", directionLocations);
    for (const location of directionLocations) {
        const availabilityClass = (location.seatAvailability === "YES_SEATS") 
                                   ? YES_SEATS_CSS : SOME_SEATS_CSS;
        const streetPosition = createDivOfClasses([INFO_TEXT, STREET_POSITION, availabilityClass]);
        streetPosition.innerText =  location.nextStopName;
        statusHolder.appendChild(streetPosition);
    }
    busDirectionBox.appendChild(statusHolder);
    return busDirectionBox;

}

/**
 * List positions for a bus in a single direction
 *
 * @param {string} route
 * @param {Object} directionLocationAlerts {<<direction>>: {locations: Array[processedLocationV2], alert: string}}
 * @returns {HTMLElement}
 */
function createStatusLineWithAlertMessage(route, directionLocationAlerts) {
    const statusLineWithAlertMessage = createDivOfClasses([SINGLE_ROUTE_STATUS]);
    
    const statusLine = createDivOfClasses([VEHICLE_POSITIONS])
    const busNumber = createRouteNumber(route);
    statusLine.appendChild(busNumber);

    const directionAlerts = {};
    Object.keys(directionLocationAlerts).forEach(direction => {
        const oneDirection = createBusSingleDirectionPosition(direction, directionLocationAlerts[[direction]][[LOCATIONS_PARAMETER]]);
        statusLine.appendChild(oneDirection);
        statusLine.dataset[[direction]] = directionLocationAlerts[[direction]][[ALERTS_PARAMETER]];
        directionAlerts[[direction]] = directionLocationAlerts[[direction]][[ALERTS_PARAMETER]];
        }
    );



    statusLine.dataset[[ALERT_TEXT]] = JSON.stringify(directionAlerts); // this is just for testing and should be broken down by direction
    statusLineWithAlertMessage.appendChild(statusLine);
    

    // leave it blank and insert it last
    // text will be inserted dynamically based on JavaScript from the data.alertText object
    const alertMessage = createDivOfClasses([ALERT_MESSAGE]);
    alertMessage.innerText = JSON.stringify(directionAlerts);
    statusLineWithAlertMessage.appendChild(alertMessage); 

    return statusLineWithAlertMessage;

}


// You can store data in e.g. element.dataset['parameter']
// encapsulate the message in a constructor function
// element.dataset.<<property>> = to set

export { createDivOfClasses, createRouteNumber, createStatusLineWithAlertMessage, LOCATIONS_PARAMETER, ALERTS_PARAMETER};