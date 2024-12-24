import {  INFO_BOX, INFO_TEXT, ROUTE_GROUP, SINGLE_ROUTE_STATUS, VEHICLE_POSITIONS, BUS_NUMBER,
    INDIVIDUAL_DIRECTION, DIRECTION_HEADER, STATUS_HOLDER, STREET_POSITION, ALERT_MESSAGE,
SOME_SEATS_CSS, YES_SEATS_CSS } from './tabledisplayconstants.js'

import { DirectionLocations } from '../../model/directionLocations.js';

const ALERT_TEXT = "directionAlertText";
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
 * @param { Object } streetFullnesses
 * @returns {HTMLElement}
 */
function createBusSingleDirectionPosition(direction, streetFullnesses) {
    const busDirectionBox = createDivOfClasses([INDIVIDUAL_DIRECTION]);
    
    const directionHeader = createDivOfClasses([DIRECTION_HEADER], direction);
    busDirectionBox.appendChild(directionHeader);

    console.log("Street fullnesses: ", streetFullnesses);
    const statusHolder = createDivOfClasses([STATUS_HOLDER]);
    for (const street in streetFullnesses) {
        const availabilityClass = (streetFullnesses[[street]] === "YES_SEATS") 
                                   ? YES_SEATS_CSS : SOME_SEATS_CSS;
        const streetPosition = createDivOfClasses([INFO_TEXT, STREET_POSITION, availabilityClass]);
        streetPosition.innerText =  street;
        statusHolder.appendChild(streetPosition);
    }
    busDirectionBox.appendChild(statusHolder);
    return busDirectionBox;

}

/**
 * List positions for a bus in a single direction
 *
 * @param {string} route
 * @param {Array[DirectionLocations]} directionsInfo array of {"direction": string, "locations": Object, "alert": string}
 * @returns {HTMLElement}
 */
function createStatusLineWithAlertMessage(route, directionsInfo) {
    const statusLineWithAlertMessage = createDivOfClasses([SINGLE_ROUTE_STATUS]);
    
    const statusLine = createDivOfClasses([VEHICLE_POSITIONS])
    const busNumber = createRouteNumber(route);
    statusLine.appendChild(busNumber);

    const directionAlerts = {};
    directionsInfo.forEach(directionInfo => {
        console.log("Direction info for HTML appending: ", directionInfo);
        statusLine.appendChild(
            createBusSingleDirectionPosition(directionInfo.direction, directionInfo.locations)
        );

        if (directionInfo.alert !== undefined) {
            directionAlerts[[directionInfo.direction]] = directionInfo.alert;
            statusLine.dataset[[directionInfo.direction]] = directionInfo.alert;
        }
    });
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

export { createDivOfClasses, createRouteNumber, createStatusLineWithAlertMessage };