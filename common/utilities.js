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

export { includesAsWord, concatenateStrings };

