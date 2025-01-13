#!/usr/bin/env python3
# Example usage: ./summarizeStops.py > output.json (filename is stored in FILENAME variable)

"""
Expects a JSON object with a "features" list of routes/stops similar to the below, e.g. one
available from ArcGIS at https://gis-septa.hub.arcgis.com/search as of early 2025.
{
  "type": "FeatureCollection",
  "name": "Bus_Stops_(Summer_2024)",
  "crs": {
    "type": "name",
    "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" }
  },
  "features": [
    {
      "type": "Feature",
      "properties": {
        "FID": 1, 
        "LineAbbr": "10",
        "Direction": "Eastbound",
        "Sequence": 1,
        "StopId": 31294, "StopAbbr": "MALLOOSW",
        "StopName": "63rd-Malvern",
        "Lon": -75.245957,
        "Lat": 39.983838,
        "Mode": "Trolley"
      },
      "geometry": { "type": "Point", "coordinates": [-75.245957, 39.983838] }
    },
    ... ... ...
  ]
}
"""

# Imports

import json
from decimal import Decimal
from collections import defaultdict
from pprint import pprint

FILENAME = "busSummer2024.geojson"
BEGINS = "begins"
TERMINATES = "terminates"

with open(FILENAME) as f:
    raw_json = f.read()

json_dict = json.loads(raw_json, parse_float=Decimal)
raw_stops = json_dict["features"]

# Utility 

def dict_list_factory():
    return defaultdict(list)

def dict_defaultdict_factory():
    return defaultdict(defaultdict)

route_directions = defaultdict(dict_list_factory)

# Organize raw data
for stop in raw_stops:
    stop_properties = stop.get("properties")
    if (route := stop_properties.get("LineAbbr")) and (direction := stop_properties.get("Direction")):
        route_directions[route][direction].append(stop_properties)

for route in route_directions:
    for direction in route_directions[route]:
        route_directions[route][direction].sort(key = lambda stop: stop.get("Sequence"))

# Determine start and stop

route_direction_terminations = defaultdict(dict_defaultdict_factory)

for route in route_directions:
    for direction in route_directions[route]:
        route_direction_terminations[route][direction][BEGINS] = route_directions[route][direction][0]
        route_direction_terminations[route][direction][TERMINATES] = route_directions[route][direction][-1]

"""
The processed data now looks like 

"60": {
      "Westbound": {
         "begins": {
            "FID": 5673,
            "LineAbbr": "60",
            "Direction": "Westbound",
            "Sequence": 1,
            "StopId": 341,
            "StopAbbr": "WESLOONE",
            "StopName": "Richmond St & Westmoreland St Loop",
            "Lon": "-75.099553",
            "Lat": "39.984253",
            "Mode": "Bus"
         },
         "terminates": {
            "FID": 5729,
            "LineAbbr": "60",
            "Direction": "Westbound",
            "Sequence": 57,
            "StopId": 30112,
            "StopAbbr": "35TALLNO",
            "StopName": "35th St & Allegheny Av Loop",
            "Lon": "-75.186728",
            "Lat": "40.006059",
            "Mode": "Bus"
         }
"""

# Convert to something more similar to what the application expects
# name = stopName, latitude, longitude, stopId
LONG_FORM_TO_DIRECTION_CODE = {
    "Northbound": "N",
    "Southbound": "S",
    "Westbound": "W",
    "Eastbound": "E",
    "Loop": "Loop",
    "Inbound": "S",      # This is a workaround and may not be accurate in all cases
    "Outbound": "N"      # This is a workaround and may not be accurate in all cases
}

js_app_reference = defaultdict(dict_defaultdict_factory)
for route in route_directions:
    for direction in route_directions[route]:
        if direction in ('Loop'):
            continue
        for begins_or_terminates in route_direction_terminations[route][direction]:
            stop_properties = route_direction_terminations[route][direction][begins_or_terminates]
            js_app_reference[route][LONG_FORM_TO_DIRECTION_CODE.get(direction)][begins_or_terminates] = {
                "stopId": stop_properties.get("StopId"),
                "name": stop_properties.get("StopName"),
                "latitude": float(stop_properties.get("Lat")),
                "longitude": float(stop_properties.get("Lon")) 
            }

# now sort it in order for easy reading
sorted_routes = sorted(js_app_reference.keys(), key = lambda eachkey: eachkey.zfill(4))
js_app_reference = {key: js_app_reference.get(key) for key in sorted_routes}


# output to JSON

json_output = json.dumps(js_app_reference, indent=1)
print(json_output)
