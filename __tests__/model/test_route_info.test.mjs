import { RouteInfo } from "../../model/route_info";

const EXPECTED_ROUTE_INFO = {
    "12": {
        "N": { 
            "locations": [],
            "alerts": []
        },
        "S": {
            "locations": [],
            "alerts": []
        },
        "W": {
            "locations": [],
            "alerts": []
        },
        "E": {
            "locations": [],
            "alerts": []
        },
        "noDirectionFound": {
            "alerts": []
        }
    },

    "15": {
        "N": { 
            "locations": [],
            "alerts": []
        },
        "S": {
            "locations": [],
            "alerts": []
        },
        "W": {
            "locations": [],
            "alerts": []
        },
        "E": {
            "locations": [],
            "alerts": []
        },
        "noDirectionFound": {
            "alerts": []
        }
    }
}

test('Confirm constructor works as expected', () => {
    expect(new RouteInfo("12", "15")).toMatchObject(EXPECTED_ROUTE_INFO)
});