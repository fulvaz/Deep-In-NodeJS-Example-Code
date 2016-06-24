'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by fulvaz on 16/6/25.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


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

var Q = function () {
    function Q() {
        _classCallCheck(this, Q);

        this.promise = new Promise();
    }

    _createClass(Q, [{
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
            this.promise.emit('error', error);
        }
    }, {
        key: 'resolve',
        value: function resolve(value) {
            this.promise.emit('success', value);
        }
    }]);

    return Q;
}();

// usage


var readFile = function readFile(file, encoding) {
    var deffered = new Q();
    _fs2.default.readFile(file, encoding, deffered.makeNodeResolver());
    return deffered.promise;
};

readFile('./Deffered.js', 'utf8').then(function (data) {
    console.log('success');
    console.log(data);
}, function (err) {
    console.log('failed');
});
//# sourceMappingURL=p86_PromiseA_Q.js.map