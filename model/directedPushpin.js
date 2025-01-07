import { LatitudeLongitude } from "./latitudeLongitude.js";

class DirectedPushpin extends LatitudeLongitude {
    constructor(latitude, longitude, direction) {
        super(latitude, longitude);
        this.direction = direction;
    }
}

export { DirectedPushpin }