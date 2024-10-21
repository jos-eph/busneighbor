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

export { includesAsWord, concatenateStrings, 
    stalenessSeconds, iterableToString, objectOfKeys
 };

