#!/usr/bin/env python3

"""
Requires an array of object data with acceptable route IDs in the `route_id` field, e.g. the following available from a GET call to 
https://www3.septa.org/api/v2/trips . Attempts to cache the file as route_ids.json. In the local directory.

[
  {
    "route_id": "1",
    "trip_id": "949973",
    "direction_id": 1,
    ...
  },
  ...
]
"""

from urllib.request import urlopen
from os.path import exists
import json
from pprint import pformat

FILE_NAME = "route_ids.json"
ROUTE_ID = "route_id"
ROUTE_ID_URL = "https://www3.septa.org/api/v2/trips"

if exists(FILE_NAME):
    print("Happy dance!")
else:
    print("Sad puppy!")

def fetchRouteIds() -> str:
    with urlopen(ROUTE_ID_URL) as response:
        if response.status != 200:
            raise RuntimeError("SEPTA did not respond with a response!")
        return response.read().decode('utf-8')

def refreshRouteIds():
    data = fetchRouteIds()
    data = json.dumps(json.loads(data), indent=3)
    with open(FILE_NAME, mode="w") as f:
        f.write(data)

def readRouteIds() -> str:
    with open(FILE_NAME) as f:
        return f.read()

def provideRouteIds() -> dict:
    if not exists(FILE_NAME):
        refreshRouteIds()
    
    data = readRouteIds()
    return json.loads(data)

def padForSorting(item) -> str:
    try:
        test = int(item)
    except ValueError:
        return "9999"
    
    return item.zfill(5)

rawdata = provideRouteIds()
routes = { obj.get(ROUTE_ID) for obj in rawdata}
sorted_output = sorted(list(routes), key=padForSorting)
print(sorted_output)