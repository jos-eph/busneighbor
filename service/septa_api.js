import { PROXY, LOCATION_URL, ROUTE_ALERTS, ALERTS_URL_V2, LOCATION_URL_V2 } from '/service/constants/septa_urls.js'
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
 * Get location of a route, by ID. Use the v2 api.
 *
 * @async
 * @param {number} route_id
 * @returns {Promise<Response>}
 */
async function getLocationDataV2(route_id) {
  const url = LOCATION_URL_V2 + new URLSearchParams({route_id: `${route_id}`});
  const response = await fetch(url);
  raiseForStatus(response);
  return await response.json();
}


/**
 * Get alerts for route. Use the v2 api.
 *
 * @async
 * @param {any} route_id
 * @returns {Promise<Response>}
 */
async function getRouteAlertsV2(route_id) {
  const url = ALERTS_URL_V2 + new URLSearchParams({route_id: `${route_id}`});
  const response = await fetch(url);
  raiseForStatus(response);
  const json = await response.json();
  return json;
}


export { raiseForStatus, getLocationDataV2, getRouteAlertsV2 }