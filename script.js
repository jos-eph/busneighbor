import { get_location_data, get_route_alerts, raise_for_status } from './service/septa_api.js'
import { DataHolder, wrappedDataHolder } from './model/data_holder.js';
import { getCurrentCoordinatesPromise, isApproachingMe, LatitudeLongitude} from './service/location.js';

// Get references to elements in your HTML

console.log("Hello! I don't do anything, yet.")