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
    let output = "^ Just output locations...";
    return output;
}

export { yieldLocationText }