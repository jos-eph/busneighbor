import { LocalStoragePickle } from "../../common/pickling/localStoragePickle.js";
import { TypedArray } from "../../common/pickling/typedArray.js";
import { TypedSet } from "../../common/pickling/typedSet.js";

const pickle = new LocalStoragePickle();

const setName = "mySet";
pickle.storeSet(setName, new TypedSet());
pickle.set("Raul", "Lua R.");
const element = document.getElementById("Whatever");
element.innerText = pickle.get("Raul");
const secondElement = document.getElementById("Whatever2");


function augment() {
    const mySet = pickle.retrieveSet(setName);
    console.log("mySet: ",mySet,"mySet.size: ",`${mySet.size}`);
    if (mySet.size == 0) {
        mySet.add(1);
    } else {
        console.log(mySet);
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
    console.log(`Cycling, ${newSet.toJsonString()}...`);
    pickle.storeSet(setName, newSet);
}

setInterval(refresher, 2000);

export { pickle, augment }