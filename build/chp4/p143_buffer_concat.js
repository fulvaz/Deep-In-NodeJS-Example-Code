'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _string_decoder = require('string_decoder');

var _string_decoder2 = _interopRequireDefault(_string_decoder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StringDecoder = _string_decoder2.default.StringDecoder;

// 正确处理字符串

var rs = _fs2.default.createReadStream('test.md', { highWaterMark: 4 });
rs.setEncoding('utf8'); // 关键步骤, 这样输出中文就不会因为buffer大小问题而产生乱码了
var data = '';
rs.on('data', function (chunk) {
    data += chunk;
});

rs.on('end', function () {
    console.log(1);
    console.log(data);
});

// decoder处理字符串
var decoder = new StringDecoder('utf8');
var buf1 = new Buffer([0xE5, 0xBA, 0x8A, 0xE5, 0x89, 0x8D, 0xE6, 0x98, 0x8E, 0xE6, 0x9C]);
console.log(decoder.write(buf1));
var buf2 = new Buffer([0x88, 0xE5, 0x85, 0x89, 0xEF, 0xBC, 0x8C, 0xE7, 0x96, 0x91, 0xE6]);
console.log(decoder.write(buf2));

// 正确拼接Buffer
var chunks = [];
var size = 0;
var rs2 = _fs2.default.createReadStream('test.md', { highWaterMark: 4 });
rs2.on('data', function (chunk) {
    chunks.push(chunk);
    size += chunk.length;
});

rs2.on('end', function () {
    var buffer = Buffer.concat(chunks, size);
    console.log(buffer.toString());
});
//# sourceMappingURL=p143_buffer_concat.js.map