const ALERT_STUB =
[
    {
      "route_id": "bus_route_45",
      "route_name": "45",
      "current_message": null,
      "advisory_id": null,
      "advisory_message": null,
      "detour_message": "until 12/31/24, SB discontinued transit stop, 12th & Locust.",
      "detour_id": "4624",
      "detour_start_location": "12th & Locust",
      "detour_start_date_time": "4/25/2024   5:28 PM",
      "detour_end_date_time": "12/31/2024  12:00 AM",
      "detour_reason": "Construction",
      "last_updated": "2023-05-27 06:18 pm",
      "isSnow": "N"
    },
    {
      "route_id": "bus_route_45",
      "route_name": "45",
      "current_message": null,
      "advisory_id": null,
      "advisory_message": null,
      "detour_message": "9:00PM to 12:00AM, SB via 10th St, Right on Bigalr St (Slow operation), Right on Broad St, Reg Rre, Layover at Broad & Oregon, Ave",
      "detour_id": "11153",
      "detour_start_location": "10th & Biglar Sts",
      "detour_start_date_time": "8/29/2024   9:50 PM",
      "detour_end_date_time": "9/2/2024  12:30 AM",
      "detour_reason": "Stadium Event",
      "last_updated": "2023-05-27 06:18 pm",
      "isSnow": "N"
    },
    {
      "route_id": "bus_route_45",
      "route_name": "45",
      "current_message": null,
      "advisory_id": null,
      "advisory_message": null,
      "detour_message": "until 6/30/25, SB near side transit stop, discontinued at 12th & Vine., Board passengers SB far, side stop 12th & Vine at the, layover until further notice.",
      "detour_id": "12490",
      "detour_start_location": "12th & Vine",
      "detour_start_date_time": "10/17/2022   9:33 AM",
      "detour_end_date_time": "6/30/2025   6:00 AM",
      "detour_reason": "Construction",
      "last_updated": "2023-05-27 06:18 pm",
      "isSnow": "N"
    }
  ];

const ALERT_SB_DISCONTINUED_ONE_ALERT = ALERT_STUB[0];
  
const LOCATION_STUB = 
[
    {
      "lat": "39.941833",
      "lng": "-75.16203",
      "label": "3537",
      "route_id": "45",
      "trip": "966229",
      "VehicleID": "3537",
      "BlockID": "7054",
      "Direction": "Southbound",
      "destination": "Broad-Oregon",
      "heading": null,
      "late": 4,
      "next_stop_id": "16504",
      "next_stop_name": "12th St & Catharine St",
      "next_stop_sequence": 14,
      "estimated_seat_availability": "EMPTY",
      "Offset": 4,
      "Offset_sec": "222",
      "timestamp": 1724645461
    },
    {
      "lat": "39.949947",
      "lng": "-75.15862",
      "label": "3539",
      "route_id": "45",
      "trip": "966254",
      "VehicleID": "3539",
      "BlockID": "7055",
      "Direction": "Northbound",
      "destination": "Noble-12th",
      "heading": null,
      "late": 1,
      "next_stop_id": "32331",
      "next_stop_name": "11th St & Market St",
      "next_stop_sequence": 35,
      "estimated_seat_availability": "MANY_SEATS_AVAILABLE",
      "Offset": 1,
      "Offset_sec": "48",
      "timestamp": 1724645457
    },
    {
      "lat": "39.916387",
      "lng": "-75.171274",
      "label": "0",
      "route_id": "45",
      "trip": "965763",
      "VehicleID": "0",
      "BlockID": "7063",
      "Direction": "Northbound",
      "destination": "Noble-12th",
      "heading": null,
      "late": 998,
      "next_stop_id": null,
      "next_stop_name": null,
      "next_stop_sequence": null,
      "estimated_seat_availability": "NOT_AVAILABLE",
      "Offset": 998,
      "Offset_sec": "0",
      "timestamp": 63240
    },
    {
      "lat": "39.957825",
      "lng": "-75.158689",
      "label": "0",
      "route_id": "45",
      "trip": "965703",
      "VehicleID": "0",
      "BlockID": "7066",
      "Direction": "Southbound",
      "destination": "Broad-Oregon",
      "heading": null,
      "late": 998,
      "next_stop_id": null,
      "next_stop_name": null,
      "next_stop_sequence": null,
      "estimated_seat_availability": "NOT_AVAILABLE",
      "Offset": 998,
      "Offset_sec": "0",
      "timestamp": 63240
    }
  ];  

export { LOCATION_STUB, ALERT_STUB, ALERT_SB_DISCONTINUED_ONE_ALERT };