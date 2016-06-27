import iconv from 'iconv-lite'

let buf = iconv.encode('中文', 'GBK');
let str = iconv.decode(buf, 'GBK');
console.log(str);
console.log(buf.toString());

let iconv = new Iconv('GBK', 'UTF-8');
iconv.convert('中文');
