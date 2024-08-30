import { get_location_data, get_route_alerts, raise_for_status } from './service/retrieval.js'
import { DataHolder, wrappedDataHolder } from './model/data_holder.js';
import { getCurrentCoordinatesPromise, compareUserVehicleLocation, LatitudeLongitude} from './service/location.js';

// Get references to elements in your HTML
const welcomeMessage = document.getElementById('welcome-message');
const changeTextButton = document.getElementById('change-text');

// Add an event listener to the button
changeTextButton.addEventListener('click', () => {
  welcomeMessage.textContent = 'The text has been changed!';
});

console.log("Hello!")
let console_text = ''
let retrieved_data = {}
get_location_data("45").then(
  response => {
    console.log("response 1")
    raise_for_status(response)
    response.json().then(
      data => {
        console_text += JSON.stringify(data)
        retrieved_data.location = data
        console.log(JSON.stringify(retrieved_data.location))
     } 
    )
    }
)

get_route_alerts("bus", "45").then(
  response => {
    raise_for_status(response)
    console.log("response 2")
    response.json().then(
      data => {
        console_text += "AND RESP 2..." + JSON.stringify(data)
        retrieved_data.alerts = data
        console.log(JSON.stringify(retrieved_data.alerts))
      }
    )
  }
)

function produceTestCase(userCoordinates, shouldIncrease, shouldLatitude, direction) {
  if (shouldLatitude) {
    const newLatitude = shouldIncrease ? userCoordinates.latitude + 0.1 : userCoordinates.latitude - 0.1
    return [userCoordinates, new LatitudeLongitude(newLatitude, userCoordinates.longitude), direction];
  } else {
    const newLongitude = shouldIncrease ? userCoordinates.longitude + 0.1 : userCoordinates.longitude - 0.1;
    return [userCoordinates, new LatitudeLongitude(userCoordinates.latitude, newLongitude), direction]
  }
}

function testDirectionFinder() {
  getCurrentCoordinatesPromise().then( result => {
    console.log("user coordinates:" + JSON.stringify(result));
    const northSouthComingTowards = produceTestCase(result, true, true, "SB"); // true
    const northSouthAlsoComingTowards = produceTestCase(result, false, true, "NB"); // true
    const northSouthGoingAway = produceTestCase(result, false, true, "SB"); // false

    const eastWestComingTowards = produceTestCase(result, true, false, "WB"); // true
    const eastWestAlsoComingTowards = produceTestCase(result, false, false, "EB"); // true
    const eastWestGoingAway = produceTestCase(result, true, false, "EB"); // false

    const testCases = [northSouthAlsoComingTowards, northSouthAlsoComingTowards, 
      northSouthGoingAway, eastWestComingTowards, eastWestAlsoComingTowards, eastWestGoingAway];

    let results = [];
    for (const testCase of testCases) {
      results.push(compareUserVehicleLocation(...testCase));
    }

    console.log(JSON.stringify(results));
    
  });
}

testDirectionFinder();