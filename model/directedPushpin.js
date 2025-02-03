import { LatitudeLongitude } from "/busneighbor/model/latitudeLongitude.js";

class DirectedPushpin extends LatitudeLongitude {
    constructor(latitude, longitude, name, direction) {
        super(latitude, longitude);
        this.name = name;
        this.direction = direction;
    }
}

export { DirectedPushpin }