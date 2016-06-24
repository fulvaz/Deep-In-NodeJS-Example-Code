import Promise from './p84_Promise'

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