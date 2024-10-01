// Filters

const validLocation = (processedLocation) => 
        Boolean(processedLocation.nextStopName && processedLocation.vehicleLocation);


export { validLocation } 


