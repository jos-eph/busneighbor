import { PROXY, LOCATION_URL, ROUTE_ALERTS } from './constants/septa_urls.js'
/**
 * Add Dev Proxy if needed
 *
 * @param {string} url
 * @returns {string}
 */

function _build_url(url) {
  return PROXY + url;
}


/**
 * Handle errors with alerting
 *
 * @param {Response} response
 * @returns {boolean}
 */
function raiseForStatus(response) {
    if (!response.ok) {
        const message = `Error ${response.status}, ${response.body}!`;
        alert(message);
        throw new Error(message);
    }
    return false
}

/**
 * Get location of a route, by ID
 *
 * @async
 * @param {number} route_id
 * @returns {Promise<Response>}
 */
async function getLocationData(route_id) {
    const url = _build_url(LOCATION_URL + new URLSearchParams({route: `${route_id}`}));
    const response = await fetch(url, {
      mode: 'cors',
      method: 'GET'},
    );
    raiseForStatus(response);
    const arrayWithKeyBus = await response.json();
    return Object.values(arrayWithKeyBus)[0];
}



/**
 * Get alerts for route
 *
 * @async
 * @param {string} type (bus, trolley, rr)
 * @param {any} route_id
 * @returns {Promise<Response>}
 */
async function getRouteAlerts(route_id_number, type="bus") {
  let route_id_formatted = `${type}_route_${route_id_number}`
  const url = _build_url(ROUTE_ALERTS + new URLSearchParams({route_id: route_id_formatted}));
  const response = await fetch(url);
  raiseForStatus(response);
  return await response.json();
}


export { getLocationData, getRouteAlerts, raiseForStatus }