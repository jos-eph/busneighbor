import { ManagedMap } from "../../service/leaflet/managedMap.js";
import { DirectedPushpin } from "../../model/directedPushpin.js";
import { Directions } from "../../model/directions_impacted.js";


console.log("Loading demo...");
const mapElement = document.getElementById("mapdemo");

/* Utility function for test only */
function sleepSync(ms) {
    const start = Date.now();
    let now = start;
    while (now - start < ms) {
      now = Date.now();
    }
  }

/* Create pushpin constants */ 

const CITY_HALL = new DirectedPushpin(39.9524, -75.1653, "City Hall", Directions.STATIONARY);
const TRADER_JOES = new DirectedPushpin(39.9517, 75.1607, "Trader Joes", Directions.WEST);
const ARCH_TJS = new DirectedPushpin(39.9773, -75.1620, "Arch TJ's", Directions.NORTH);
const LIBERTY_BELL = new DirectedPushpin(39.9526, -75.1650, "Liberty Bell", Directions.SOUTH);
const BENJERRYS = new DirectedPushpin(39.9512, -75.1901, "Ben & Jerry's", Directions.WEST);
const BENFRANKLIN = new DirectedPushpin(39.9531, -75.1340, "Ben Franklin", Directions.EAST);

const LOVE_PARK = new DirectedPushpin(39.9526, -75.1650, "Love Park", Directions.NORTH);
const SEAPORT_MUSEUM = new DirectedPushpin(39.9453, -75.1418, "Seaport Museum", Directions.EAST);
const ICA = new DirectedPushpin(40.000834, -75.192364, "ICA", Directions.WEST);
const UNIVLUTH = new DirectedPushpin(39.9539, -75.1948, "Univ Lutheran", Directions.WEST)
const BETSYROSS = new DirectedPushpin(39.9859, -75.0667, "Betsy Ross", Directions.SOUTH);

/* Populate map */

const FIRST_SET = [TRADER_JOES, ARCH_TJS, LIBERTY_BELL, BENJERRYS, BENFRANKLIN, CITY_HALL];
const SECOND_SET = [CITY_HALL, LOVE_PARK, SEAPORT_MUSEUM, ICA, UNIVLUTH, BETSYROSS];

console.log("Hi...");
const map = new ManagedMap(mapElement, FIRST_SET);
map.populate(SECOND_SET);


