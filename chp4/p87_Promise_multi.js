/**
 * Created by fulvaz on 16/6/25.
 * Promise中的多异步协助
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

class Defer {
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

    /**
     * promise中的promise
     * */
    all(promises) {
        let count = promises.length;
        let that = this;
        let results = [];
        promises.forEach((promise, i) => {
           promise.then((data) => {
               count--;
               results[i] = data;
               if (count === 0) {
                   that.resolve(results);
               }
           }, (err) => {
               that.reject(err);
           });
        });
        return this.promise;
    }
}

// usage
let readFile = function(file, encoding) {
    let deffered = new Defer();
    fs.readFile(file, encoding, deffered.makeNodeResolver()); // 应该设置为静态方法
    return deffered.promise;
};

let promise1 = readFile('./p76_http.js', 'utf8');
let promise2 = readFile('./p77_event.js', 'utf8');
let deferred = new Defer();
deferred.all([promise1, promise2]).then((result) => {
    console.log(result);
}, (err) => {
    console.log(err);
});
