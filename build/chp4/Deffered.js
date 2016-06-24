'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _p84_Promise = require('./p84_Promise');

var _p84_Promise2 = _interopRequireDefault(_p84_Promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* 触发Promise中的回调方法
*
* */

var Deffered = function () {
    function Deffered() {
        _classCallCheck(this, Deffered);

        this.state = 'unfulfilled';
        this.promise = new _p84_Promise2.default();
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
//# sourceMappingURL=Deffered.js.map