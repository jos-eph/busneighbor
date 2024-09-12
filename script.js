import { get_location_data, get_route_alerts, raise_for_status } from './service/septa_api.js'
import { createReactiveDataHolder } from './model/data_holder.js';
import { getCurrentCoordinatesPromise, isApproachingMe, LatitudeLongitude} from './service/location.js';
import { createStore } from './service/create_store.js';


// setInterval(testMe, 3000);
function dude(par1, par2, par3, par4) {
    console.out(`${par1} | ${par2} | ${par3} | ${par4}`)
}

console.log("Hello, world")
var store = createStore(["45"], dude, dude);