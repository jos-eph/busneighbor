import { createWrappedDataHolder } from "../model/data_holder";
import { RouteInfo } from "../model/route_info";


/**
 * Description placeholder
 *
 * @param {string} routes Poop
 * @param {function} locationsFactory
 * @param {function} alertsFactory
 */
const createStore = (routes, locationsFactory, alertsFactory) => {
    const routeInfo = new RouteInfo(...routes);
    const locationReferences = createWrappedDataHolder(...routes);
    const alertReferences = createWrappedDataHolder(...routes);

    

    return {
        "routeInfo": routeInfo,
        "locationReferences": locationReferences,
        "alertReferences": alertReferences
    };
};