import { get_location_data, get_route_alerts, raise_for_status } from './service/septa_api.js'
import { createWrappedDataHolder } from './model/data_holder.js';
import { getCurrentCoordinatesPromise, isApproachingMe, LatitudeLongitude} from './service/location.js';

// Get references to elements in your HTML

console.log("Hello! I don't do anything, yet.")

let tester = []

const wrappedDh = createWrappedDataHolder("location", "locationsHistory");
wrappedDh.locationsHistory = [];
wrappedDh.addSetHandler( (originalObject, property, newValue) => {
    console.log("property: " + property);
    if (property == "location") {
        console.log(`location newValue: ${newValue}`);
        originalObject.locationsHistory.push(newValue);
        tester.push(newValue);
        console.log(originalObject.locationsHistory);
    }
})

wrappedDh.location = "Minneapolis";
wrappedDh.location = "New York";
wrappedDh.location = "San Francisco";
wrappedDh.location = "Detroit";
console.log("And now...");
console.log(tester);