import { LocalStoragePickle } from "../../common/pickling/localStoragePickle.js";
import { TypedArray } from "../../common/pickling/typedArray.js";
import { TypedSet } from "../../common/pickling/typedSet.js";

const pickle = new LocalStoragePickle();

// Setup
pickle.set("Raul", "Lua R.");
const element = document.getElementById("Whatever");
element.innerText = pickle.get("Raul");
const secondElement = document.getElementById("Whatever2");

// Set property
const setName = "mySet";


function augment() {
    const mySet = pickle.retrieveSet(setName);
    if (mySet.size == 0) {
        mySet.add(1);
    } else {
        const arr = Array.from(mySet);
        const last = arr.at(-1);
        mySet.add(last + 4);
        mySet.add(1);
        mySet.add(last + 4);
        mySet.add(last + 4);
        mySet.add(last + 4);
    }

    return mySet;
}

function refresher() {
    const newSet = augment();
    secondElement.innerText=newSet.toJsonString();
    pickle.storeSet(setName, newSet);
}

setInterval(refresher, 2000);

export { pickle, augment }