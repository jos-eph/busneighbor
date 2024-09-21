// Filters

const validLocation = (processedLocation) => 
        Boolean(processedLocation.nextStopName && processedLocation.processedVehicleLocation);


export { validLocation } 


