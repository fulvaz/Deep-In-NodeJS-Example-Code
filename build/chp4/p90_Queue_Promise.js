'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by fulvaz on 16/6/25.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Promise then链式调用, 另外去除了时间, 直接让Promise与Defer交互
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Promise = function () {
    function Promise() {
        _classCallCheck(this, Promise);

        this.queue = [];
        this.isPromise = true;
    }

    _createClass(Promise, [{
        key: 'then',
        value: function then(fulfilledHandler, errorHandler, progressHandler) {
            var handler = {};
            if (typeof fulfilledHandler === 'function') {
                handler.fulfill = fulfilledHandler;
            }
            if (typeof errorHandler === 'function') {
                handler.error = errorHandler;
            }
            if (typeof progressHandler === 'function') {
                handler.progress = progressHandler;
            }
            this.queue.push(handler);
            return this;
        }
    }]);

    return Promise;
}();

var Defer = function () {
    function Defer() {
        _classCallCheck(this, Defer);

        this.promise = new Promise();
    }

    _createClass(Defer, [{
        key: 'makeNodeResolver',
        value: function makeNodeResolver() {
            var self = this;
            return function (error, value) {
                if (error) {
                    self.reject(error);
                } else if (arguments.length > 2) {
                    self.resolve([].slice.call(arguments, 1));
                } else {
                    self.resolve(value);
                }
            };
        }
    }, {
        key: 'reject',
        value: function reject(error) {
            var promise = this.promise;
        }
    }, {
        key: 'resolve',
        value: function resolve(value) {
            var promise = this.promise;
            var handler = void 0;
            // 取出一个handler
            while (handler = promise.queue.shift()) {
                if (handler && handler.fulfill) {
                    var ret = handler.fulfill(value);
                    if (ret && ret.isPromise) {
                        ret.queue = promise.queue;
                        this.promise = ret;
                        return;
                    }
                }
            }

            // 运行那个handler

            // 将当前promise的queue复制给下一个promise  外面调用必定返回promise
        }
    }]);

    return Defer;
}();

// usage


var readFile = function readFile(file, encoding) {
    var defer = new Defer();
    _fs2.default.readFile(file, encoding, defer.makeNodeResolver()); // 应该设置为静态方法
    return defer.promise;
};

var promise1 = readFile('./path.txt', 'utf8');

promise1.then(function (data) {
    console.log(data.trim());
    return readFile(data.trim(), 'utf8');
}).then(function (data) {
    console.log(data);
});
//# sourceMappingURL=p90_Queue_Promise.js.map