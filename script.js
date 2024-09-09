import { get_location_data, get_route_alerts, raise_for_status } from './service/septa_api.js'
import { createWrappedDataHolder } from './model/data_holder.js';
import { getCurrentCoordinatesPromise, isApproachingMe, LatitudeLongitude} from './service/location.js';


function testMe() {
    console.log(Date.now());
}

setInterval(testMe, 3000);
