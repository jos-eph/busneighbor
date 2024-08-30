import { get_location_data, get_route_alerts, raise_for_status } from './service/retrieval.js'
import { track_object_with_function } from './service/tracked_update.js';

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
        console.log(JSON.stringify(retrieved_data))
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
        console.log(JSON.stringify(retrieved_data))
      }
    )
  }
)

let test_object = {my: "house", mein: "rules"}

function demo(newValue, originalObject, property, oldValue) {
  console.log("New value: " + newValue);
  console.log("original object: " + JSON.stringify(originalObject));
  console.log("property: " + property);
  console.log("oldValue: " + oldValue);

}

let observed = track_object_with_function(test_object, demo);
observed.my = "dog";

console.log("Goodbye...")