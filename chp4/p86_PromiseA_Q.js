/**
 * Created by fulvaz on 16/6/25.
 */
import fs from 'fs'
import events from 'events'

class Promise extends events.EventEmitter {
    constructor() {
        super();
    }

    then(fulfilledHandler, errorHandler, progressHandler) {
        if (typeof fulfilledHandler === 'function') {
            this.once('success', fulfilledHandler);
        }
        if (typeof  errorHandler === 'function') {
            this.once('error', errorHandler);
        }
        if (typeof progressHandler === 'function') {
            this.on('progress', progressHandler);
        }

        return this;
    }
}

class Q {
    constructor() {
        this.promise = new Promise();
    }

    makeNodeResolver() {
        let self = this;
        return function(error, value) {
            if (error) {
                self.reject(error);
            } else if (arguments.length > 2) {
                self.resolve([].slice.call(arguments, 1));
            } else {
                self.resolve(value);
            }
        }
    }
    
    reject(error) {
        this.promise.emit('error', error);
    }
    
    resolve(value) {
        this.promise.emit('success', value);
    }
}

// usage
let readFile = function(file, encoding) {
    let deffered = new Q();
    fs.readFile(file, encoding, deffered.makeNodeResolver());
    return deffered.promise;
}

readFile('./Deffered.js', 'utf8').then((data) => {
    console.log('success');
    console.log(data);
}, (err) => {
    console.log('failed');
});