const Directions = {
    NORTH: "N",
    SOUTH: "S",
    WEST: "W",
    EAST: "E"
};

class DirectionsImpacted {
    constructor(directions) {
        this[Directions.NORTH] = directions.includes(Directions.NORTH) ? true : false;
        this[Directions.SOUTH] = directions.includes(Directions.SOUTH) ? true : false;
        this[Directions.EAST] = directions.includes(Directions.EAST) ? true : false;
        this[Directions.WEST] = directions.includes(Directions.WEST) ? true : false;
    }
}

export { Directions, DirectionsImpacted }