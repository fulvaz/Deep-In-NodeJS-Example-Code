'use strict';

var _iconvLite = require('iconv-lite');

var _iconvLite2 = _interopRequireDefault(_iconvLite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buf = _iconvLite2.default.encode('中文', 'GBK');
var str = _iconvLite2.default.decode(buf, 'GBK');
console.log(str);
console.log(buf.toString());
//# sourceMappingURL=p143_encodingConv.js.map