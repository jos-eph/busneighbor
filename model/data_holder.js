let TRAPPED_METHODS = ["get", "set"];

/*  Class for storing data and manipulating handlers, but no proxy */

class DataHolder {
    /**
     * Creates an instance of DataHolder, with default adds and a clear method for supported intercepts.
     * Generates this.getHandlers, this.setHandlers, addGetHandler(), addSetHandler()
     * 
     * @constructor
     * @param {...{string}} restArgs Known data fields
     */
    constructor(...restArgs) {
      // Initialize all expected arguments to undefined
      for (let arg of restArgs) {
        this[arg] = undefined;
      }

      // Declare trapped method handler sets and generate set variable names
      Object.defineProperty(this, 'trappedMethodHandlerCollectionNames', {
        value: [],
        writable: true, 
        enumerable: false
      });
      for (let trappedMethod of TRAPPED_METHODS) {
        this['trappedMethodHandlerCollectionNames'].push(`${trappedMethod}Handlers`);
      }

      this.clearHandlers();

      // Create add methods
      for (let trappedMethodHandlerCollectionName of this.trappedMethodHandlerCollectionNames) {
        let singularMethodHandlerName = trappedMethodHandlerCollectionName.charAt(0).toUpperCase() + trappedMethodHandlerCollectionName.slice(1, -1);       
        let methodName = `add${singularMethodHandlerName}`;
        this[methodName] = (interceptFunction) => {
          this[trappedMethodHandlerCollectionName].add(interceptFunction);
        }
      }
    }

    clearHandlers() {
      for (let setName of this.trappedMethodHandlerCollectionNames) {
        Object.defineProperty(this, [setName], {
          value: new Set(),
          writable: true, 
          enumerable: false
        });
      }
    }
  }
  
/*  Proxy handlers and a wrapper */


/**
 * Wrap the DataHolder in reactive code
 * Set holders only. This cannot easily be rewritten to intercept all methods, because each method has a different Proxy param list.
 * @param {DataHolder} initialDataHolder
 * @returns {Proxy<DataHolder>}
 */
const reactiveDataHolder = (initialDataHolder) => {
  return new Proxy(initialDataHolder, {
      set(originalObject, property, newValue, objectAssignmentDirectedTo) {
          const oldValue = originalObject[property];
          originalObject[property] = newValue;
          console.log(`Here: ${JSON.stringify(originalObject['setHandlers'])}`);
          originalObject['setHandlers'].forEach(callbackFunc => {
            callbackFunc(originalObject, property, newValue, oldValue);
          });

          return true;
      }
  })
}

const createReactiveDataHolder = (...args) => {
  const dataHolder = new DataHolder(...args);
  return reactiveDataHolder(dataHolder);
};

export { createReactiveDataHolder, DataHolder };

