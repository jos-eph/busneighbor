/**
 * Aggregate for a particular route
 *
 * @async
 * @param {Array} routes
 * @param {function} restGetter
 * @param {function} individualProcessor
 * @param {Object} targetStore
 * @returns {*}
 */
async function aggregateForRoutes(routes, routeType="bus", restGetter, individualProcessor, targetStore) {
    const allNewData = [];
    for (const route of routes) {
        const dataArray = await restGetter(route, routeType);
        const newData = [];
        for (const individualData of dataArray) {
            const processedData = individualProcessor(individualData);
            newData.push(processedData)
        }
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
    console.log(JSON.stringify(processed));
    return processed;
}

export { aggregateForRoutes, processStore }