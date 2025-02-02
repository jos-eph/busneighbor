/* Depends on leaflet ~= 1.9.4 */
import { Directions } from "../constants/directions.js";

function _centeredIconProperties(iconX, iconY) {
    return {
        iconSize: [iconX, iconY],
        tooltipAnchor: [Math.floor(iconX / 2) - 9, Math.floor(iconY / 2) - 5] 
     };
}
     
const ICON_SIZE = [16, 16];       
const MAP_GRAPHIC_DIRECTORY_AFTER_ROOT = "/mapgraphics";

/**
 * Map direction strings to icons
 *
 * @param {string} repoRoot Path relative to root where managedMap is invoked
 */
function getDirectionIconMap(repoRoot) {
    const iconPath = `${repoRoot}${MAP_GRAPHIC_DIRECTORY_AFTER_ROOT}`;

    console.log("About to make icons...");
    const iconNorth = L.icon({iconUrl: `${iconPath}/CompassN.svg`, ..._centeredIconProperties(...ICON_SIZE)});
    const iconSouth = L.icon({iconUrl: `${iconPath}/CompassS.svg`, ..._centeredIconProperties(...ICON_SIZE)})
    const iconEast = L.icon({iconUrl: `${iconPath}/CompassE.svg`, ..._centeredIconProperties(...ICON_SIZE)})
    const iconWest = L.icon({iconUrl: `${iconPath}/CompassW.svg`,..._centeredIconProperties(...ICON_SIZE)})
    const iconSmiley = L.icon({iconUrl: `${iconPath}/Smiley.svg`, ..._centeredIconProperties(...ICON_SIZE)});


    const iconMappings = new Map();
        iconMappings.set(Directions.NORTH, iconNorth);
        iconMappings.set(Directions.SOUTH, iconSouth);
        iconMappings.set(Directions.WEST, iconWest);
        iconMappings.set(Directions.EAST, iconEast);
        iconMappings.set(Directions.STATIONARY, iconSmiley);

    return iconMappings;
}

export { getDirectionIconMap }