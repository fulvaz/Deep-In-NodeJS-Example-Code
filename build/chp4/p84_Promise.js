'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Promise/A提案
 * - 接受完成态, 错误态的回调方法, 在完成操作或者出现错误,将会调用相应方法
 * - 可选地支持progreee事件回调作为第三个方法
 * - then()方法只接受function对象, 其余对象将被忽略
 * - then()方法继续返回Promise对象, 实现链式调用
 * */

var Promise = function (_events$EventEmitter) {
    _inherits(Promise, _events$EventEmitter);

    function Promise() {
        _classCallCheck(this, Promise);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Promise).call(this));
    }

    _createClass(Promise, [{
        key: 'then',
        value: function then(fulfilledHandler, errorHandler, progressHandler) {
            if (typeof fulfilledHandler === 'function') {
                this.once('success', fulfilledHandler);
            }
            if (typeof errorHandler === 'function') {
                this.once('error', errorHandler);
            }
            if (typeof progressHandler === 'function') {
                this.on('progress', progressHandler);
            }

            return this;
        }
    }]);

    return Promise;
}(_events2.default.EventEmitter);

/**
 * 触发Promise中的回调方法
 *
 * */


var Deffered = function () {
    function Deffered() {
        _classCallCheck(this, Deffered);

        this.state = 'unfulfilled';
        this.promise = new Promise();
    }

    _createClass(Deffered, [{
        key: 'resolve',
        value: function resolve(obj) {
            this.state = 'fulfilled';
            this.promise.emit('success', obj);
        }
    }, {
        key: 'reject',
        value: function reject(err) {
            this.state = 'failed';
            this.promise.emit('error', err);
        }
    }, {
        key: 'progress',
        value: function progress(data) {
            this.promise.emit('progress', data);
        }
    }]);

    return Deffered;
}();

var promisify = function promisify(res) {
    "use strict";

    var deffered = new Deffered();
    var result = '';
    res.on('data', function (chunk) {
        result += chunk;
        deffered.progress(chunk);
    });
    res.on('end', function () {
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
}, function (err) {
    // err handler
}, function (chunk) {
    // progress handler
    console.log('BODY: ' + chunk);
});
//# sourceMappingURL=p84_Promise.js.map