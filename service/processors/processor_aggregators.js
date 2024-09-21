/**
 * Aggregate for a particular route
 *
 * @async
 * @param {Array} routes
 * @param {function} restGetter
 * @param {function} individualProcessor
 * @param {Object} targetStore
 * @param {function } arrayFilter
 * @param {function} arraySorter
 * @returns {*}
 */
async function aggregateForRoutes(routes, routeType="bus", restGetter, individualProcessor, targetStore,
                                  arrayFilter, arraySorter
) {
    const allNewData = [];
    for (const route of routes) {
        const dataArray = await restGetter(route, routeType);
        let newData = [];
        for (const individualData of dataArray) {
            const processedData = individualProcessor(individualData);
            newData.push(processedData)
        }
        
        newData = (arrayFilter) ? newData.filter(arrayFilter) : newData;
        newData = (arraySorter) ? toSorted(newData) : newData;

        targetStore[route] = newData;
        allNewData.push(newData);
    }
    return allNewData;
}

function processStore(store, processor) {
    const processed = [];
    for (const route of Object.keys(store)) {
        for (const data of store[route]) {
            processed.push(processor(data));
        }
    }
    return processed;
}

export { aggregateForRoutes, processStore }