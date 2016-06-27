"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LimitableMap = function () {
    function LimitableMap(limit) {
        _classCallCheck(this, LimitableMap);

        this.limit = limit;
        this.map = {};
        this.keys = [];
    }

    _createClass(LimitableMap, [{
        key: "set",
        value: function set(key, value) {
            var map = this.map;
            var keys = this.key;

            // 新键, 需要处理满的问题
            if (!map.hasOwnProperty(key)) {
                if (keys.length === this.limit) {
                    var firstKey = keys.shift();
                    delete map[firstKey];
                }
                keys.push(key);
            }
            // 添加或者更新
            map[key] = value;
        }
    }, {
        key: "get",
        value: function get(key) {
            return this.map[key];
        }
    }]);

    return LimitableMap;
}();
//# sourceMappingURL=p128_LimitableMap.js.map