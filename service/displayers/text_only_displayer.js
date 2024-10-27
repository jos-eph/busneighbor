import { LOCATIONS, ALERTS } from "../../model/route_info.js";
import { Directions } from "../../model/directions_impacted.js";

function insertSpacesAtEnd(text, numSpaces) {
    return text.padEnd(text.length + numSpaces, " ");
  }
  
function insertSpacesAtBeginning(text, numSpaces) {
    return text.padStart(text.length + numSpaces, " ");
}

let INDENT = 5;

// extremely buggy
// refactor
function yieldLocationText(aggregate) {
    console.log(aggregate);
    let output = "";
    for (const route in aggregate) {
        let indent = INDENT;
        if ((Object.keys(aggregate[route]).length)) {
            output += (`${route}\n`);
            for (const direction in aggregate[route]) {
                console.log[route];
                console.log[direction];
                console.log(aggregate[route][direction]);
                if (((Object.keys(aggregate[route][direction])).length) && (LOCATIONS in aggregate[route][direction])) {
                    output += `${insertSpacesAtBeginning(direction, indent)}\n`
                    for (const locationData of aggregate[route][direction][LOCATIONS]) {
                        output += `${insertSpacesAtBeginning(locationData.nextStopName, indent * 2)}`
                    }

                }

            }
            output += "\n";
        }
    }
    return output;
}

export { yieldLocationText }