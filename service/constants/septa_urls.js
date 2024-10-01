const PROXY = 'https://corsproxy.io/?'
const SEPTA_BASE = 'https://www3.septa.org/api'
const LOCATION_URL = SEPTA_BASE + '/TransitView/index.php?'
const ROUTE_ALERTS = SEPTA_BASE + '/Alerts/get_alert_data.php?'


// https://www3.septa.org/api/v2/trips/?route_id=45
// https://www3.septa.org/api/v2/alerts/?route_id=45

const V2 = SEPTA_BASE + "/v2";
const LOCATION_URL_V2 = V2 + "/trips/?";
const ALERTS_URL_V2 = V2 + "/alerts/?";


export {PROXY, LOCATION_URL, ROUTE_ALERTS, LOCATION_URL_V2, ALERTS_URL_V2}