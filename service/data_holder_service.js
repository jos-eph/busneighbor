// continue this function, perhaps to incorporate memory for key name...

const populateAttributes = (wrappedDataHolder, method, factoryFunction) => {
    let capitalizedMethodHandlerName = method.charAt(0).toUpperCase() + method.slice(1);
    const addMethod = `add${method}Handlers`;
    for (const key of Object.keys(wrappedDataHolder)) {
        wrappedDataHolder[key][addMethod](factoryFunction);
    }
}