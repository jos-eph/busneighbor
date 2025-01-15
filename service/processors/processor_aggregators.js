/**
 * Aggregate for a particular route
 *
 * @async
 * @param {Array} routes
 * @param {function} restGetter
 * @param {function} individualProcessor
 * @param {Object} targetStore
 * @param {function} arrayFilter
 * @param {function} arraySorter
 * @returns {*}
 */
async function processRouteGets(routes, restGetter, individualProcessor, targetStore,
                                  arrayFilter, arraySorter
) {
    const allNewData = [];
    for (const route of routes) {
        const dataArray = await restGetter(route);
        //
        let newData = [];
        for (const individualData of dataArray) {
            const processedData = individualProcessor(individualData);
            newData.push(processedData);
        }
        console.log("Logging data prior to filtering...");
        console.log(newData);
        
        newData = (arrayFilter) ? newData.filter(arrayFilter) : newData;
        newData = (arraySorter) ? newData.toSorted(arraySorter) : newData;
        targetStore[route] = newData;
        allNewData.push(newData);
        console.log("Logging data post filtering...");
        console.log(newData);
    }
    return allNewData;
}

function processStore(store, processor, objectToPopulate) {
    const processed = [];
    for (const route of Object.keys(store)) {
        for (const data of store[route]) {
            processed.push(processor(route, data, objectToPopulate));
        }
    }
    return processed;
}

export { processRouteGets, processStore }