function includesAsWord(text, word) {
    const pattern = new RegExp(`\\b${word}\\b`, 'g'); 
    return Boolean(text.match(pattern));
}

function concatenateStrings(...args) {
    let concatenated = "";
    for (let arg of args) {
        concatenated += `${arg ? arg : ''}`
    }
    return concatenated;
}

function stalenessSeconds(epochTime) {
    const nowSecs = Math.floor(Date.now() / 1000);
    return (nowSecs - epochTime);
}

function iterableToString(iterable, delimiter=", ") {
    const iterableArray = [...iterable];
    return iterableArray.join(delimiter);
}

function objectOfKeys(iterable, defaultValueFactory) {
    const newObject = {};

    if (defaultValueFactory === undefined) {
        defaultValueFactory = () => new Object();
    }

    for (const key of iterable) {
        newObject[key] = defaultValueFactory(key);
    }

    return newObject;
}

// deal only with objects where you are inserting a set member to a set identified by a key
// if the key does not exist, create a key and initialize it with an empty set
// then, add the item to the set
// e.g. for obj populatedLocations: {
//     "4": {"S"},
//     "6": {"N", "E"}
// }
//
function safeAddToKeyedSet(mapLikeObj, setKey, setMember) {
    if (!Object.keys(mapLikeObj).includes(setKey)) {
        mapLikeObj[setKey] = new Set();
    }

    if (!(mapLikeObj[setKey] instanceof Set)) {
        throw new Error("Existing key does not hold a Set.");
    }

    mapLikeObj[setKey].add(setMember);

}

function defineHiddenProperty(obj, propertyName) {
    Object.defineProperty(obj, propertyName, {
        value: {},
        writable: true,
        enumerable: false
    });
}

function setIntersectionLegacy(setA, setB) {
    const arrayA = Array.from(setA); // Convert setA to an array
    return new Set(arrayA.filter(element => setB.has(element)));
  }
  

export { includesAsWord, concatenateStrings, 
    stalenessSeconds, iterableToString, objectOfKeys, 
    safeAddToKeyedSet, defineHiddenProperty, setIntersectionLegacy
 };

