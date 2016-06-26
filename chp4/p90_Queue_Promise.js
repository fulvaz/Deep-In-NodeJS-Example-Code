/**
 * Created by fulvaz on 16/6/25.
 * Promise then链式调用, 另外去除了时间, 直接让Promise与Defer交互
 */
import fs from 'fs'

class Promise {
    constructor() {
        this.queue = [];
        this.isPromise = true;
        
    }

    then(fulfilledHandler, errorHandler, progressHandler) {
        let handler = {};
        if (typeof fulfilledHandler === 'function') {
            handler.fulfill = fulfilledHandler; 
        }
        if (typeof  errorHandler === 'function') {
            handler.error = errorHandler;
        }
        if (typeof progressHandler === 'function') {
            handler.progress = progressHandler;
        }
        this.queue.push(handler);
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
        let promise = this.promise;
    }

    resolve(value) {
        let promise = this.promise;
        let handler;
        // 取出一个handler
        while (handler = promise.queue.shift()) {
            if (handler && handler.fulfill) {
                let ret = handler.fulfill(value);
                if (ret && ret.isPromise) {
                    ret.queue = promise.queue;
                    this.promise = ret;
                    return
                }
            }
        }

        // 运行那个handler

        // 将当前promise的queue复制给下一个promise  外面调用必定返回promise
    }

   
}

// usage
let readFile = function(file, encoding) {
    let defer = new Defer();
    fs.readFile(file, encoding, defer.makeNodeResolver()); // 应该设置为静态方法
    return defer.promise;
};

let promise1 = readFile('./path.txt', 'utf8');

promise1.then((data) => {
    console.log(data.trim());
    return readFile(data.trim(), 'utf8');
}).then((data) => {
   console.log(data);
});
