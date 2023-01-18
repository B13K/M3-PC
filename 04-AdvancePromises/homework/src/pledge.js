'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:

function $Promise(executor){
    if(typeof executor !== "function"){
        throw TypeError ("executor must be a function")
    }

    this._state = "pending"
    this._value = undefined
    this._handlerGroups = []

    
    const callHandlers = (value) => {
        // this._handlerGroups.forEach(current => {
        //     this._state === 'fulfilled' && current.successCb && current.successCb()
        //     this._state === 'rejected' && current.errorCb && current.errorCb()
        // })

        while(this._handlerGroups.length > 0){
            const currentHandler = this._handlerGroups.shift();
            this._state === 'fulfilled' &&
                            currentHandler.successCb &&
                            currentHandler.successCb(value);
            this._state === 'rejected' &&
                            currentHandler.errorCb &&
                            currentHandler.errorCb(value);
        }
     }

    this._internalResolve = (someData) => {
        
        if(this._state !== 'pending') return;
        this._state = 'fulfilled'
        this._value = someData
        callHandlers(someData)
        
    }
    this._internalReject = (myReason) => {
        if(this._state !== 'pending') return;
        this._state = "rejected"
        this._value = myReason;
        callHandlers(myReason)
    }

    let resolve = (resolve) => {this._internalResolve(resolve)}
    let reject = (reject) => {this._internalReject(reject)}

    executor(resolve,reject)


     this.then = (success, error) => {
        let successCb = typeof success === 'function' 
                        ? success
                        : false
        let errorCb = typeof error === 'function'
                        ? error
                        : false
        let downstreamPromise = new $Promise(()=>{})
        this._handlerGroups.push({successCb: successCb,
                                    errorCb:errorCb,
                                    downstreamPromise})

        this._state !== 'pending' && callHandlers(this._value)

        return downstreamPromise;
     }

     this.catch = (myFunc) => {
        return this.then(null, myFunc)
     }

}



module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
