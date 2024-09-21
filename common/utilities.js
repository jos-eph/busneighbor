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
    console.log(`NowSecs: ${nowSecs} , epoch ${epochTime}`)
    return (nowSecs - epochTime);
}

export { includesAsWord, concatenateStrings, stalenessSeconds };

