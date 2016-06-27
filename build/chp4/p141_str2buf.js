'use strict';

var buf = new Buffer(30);
var offset = buf.write('not appended'); // 只是覆盖buffer
buf.write('s'); // 覆盖第一个位置
buf.write('s', offset, 1); // 正确append

console.log(buf.toString());
//# sourceMappingURL=p141_str2buf.js.map