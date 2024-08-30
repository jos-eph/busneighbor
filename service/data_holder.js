let TRAPPED_METHODS = ["get", "set"];

/*  Class for storing data and manipulating handlers, but no proxy */

class DataHolder {
    /**
     * Creates an instance of DataHolder, with default adds and a clear method for supported intercepts.
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
      
      this['trappedMethodHandlerCollectionNames'] = []
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
        this[setName] = new Set();
      }
    }
  }
  
/*  Proxy handlers and a wrapper */


/**
 * Wrap the DataHolder in reactive code
 *
 * @param {DataHolder} initialObj
 * @returns {Proxy<DataHolder>}
 */
const wrappedDataHolder = (initialObj) => {
  return new Proxy(initialObj, {
      set(originalObject, property, newValue, objectAssignmentDirectedTo) {
          const oldValue = originalObject[property];
          originalObject[property] = newValue;

          
          originalObject['setHandlers'].forEach(callbackFunc => {
            callbackFunc(newValue, originalObject, property, oldValue);
          });

          return true;
      }
  })
}

// Test it
function dummy(str) {
  console.log("Dummy invoked!");
  console.log("Dummy is outputting: " + str);
}

const myObject = new DataHolder('a', 'beee', 'ceeee');
myObject.addSetHandler( dummy );
const proxyObject = wrappedDataHolder(myObject);

proxyObject.a = 'new a value';
console.log(proxyObject.a)
proxyObject.beee = 2
console.log(proxyObject.beee)