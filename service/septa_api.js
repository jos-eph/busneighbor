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
function raise_for_status(response) {
    if (response.status >= 300) {
        alert(`Error ${response.status}!`)
        return true
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
async function get_location_data(route_id) {
    const url = _build_url(LOCATION_URL + new URLSearchParams({route: route_id}));
    return fetch(url)
}



/**
 * Get alerts for route
 *
 * @async
 * @param {string} type (bus, trolley, rr)
 * @param {any} route_id
 * @returns {Promise<Response>}
 */
async function get_route_alerts(type, route_id_number) {
  let route_id_formatted = `${type}_route_${route_id_number}`
  const url = _build_url(ROUTE_ALERTS + new URLSearchParams({route_id: route_id_formatted}));
  return fetch(url)
}


export { get_location_data, get_route_alerts, raise_for_status }