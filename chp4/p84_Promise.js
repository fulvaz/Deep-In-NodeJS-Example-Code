import events from 'events'

/**
 * Promise/A提案
 * - 接受完成态, 错误态的回调方法, 在完成操作或者出现错误,将会调用相应方法
 * - 可选地支持progreee事件回调作为第三个方法
 * - then()方法只接受function对象, 其余对象将被忽略
 * - then()方法继续返回Promise对象, 实现链式调用
 * */

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

/**
 * 触发Promise中的回调方法
 *
 * */
class Deffered {
    constructor() {
        this.state = 'unfulfilled';
        this.promise = new Promise();
    }

    resolve(obj) {
        this.state = 'fulfilled';
        this.promise.emit('success', obj);
    }

    reject(err) {
        this.state = 'failed';
        this.promise.emit('error', err);
    }

    progress(data) {
        this.promise.emit('progress', data);
    }
}

let promisify = function (res) {
    "use strict";
    let deffered = new Deffered();
    let result = '';
    res.on('data', function (chunk) {
        result += chunk;
        deffered.progress(chunk);
    });
    res.on('end', function() {
        deffered.resolve(result);
    });
    res.on('error', function (err) {
        deffered.reject(err);
    });
    return deffered.promise;
};


// 调用
promisify(res).then(function () {
    // sucess handler
}, function(err) {
    // err handler
}, function(chunk) {
    // progress handler
    console.log('BODY: ' + chunk);
});