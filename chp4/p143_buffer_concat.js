import fs from 'fs'
import sd from 'string_decoder'

let StringDecoder = sd.StringDecoder;

// 正确处理字符串

let rs = fs.createReadStream('test.md', {highWaterMark: 4});
rs.setEncoding('utf8'); // 关键步骤, 这样输出中文就不会因为buffer大小问题而产生乱码了
let data = '';
rs.on('data', (chunk) => {
    data += chunk;
});

rs.on('end', () => {
    console.log(1);
    console.log(data);
});

// decoder处理字符串
let decoder = new StringDecoder('utf8');
let buf1 = new Buffer([0xE5, 0xBA, 0x8A, 0xE5, 0x89, 0x8D, 0xE6, 0x98, 0x8E, 0xE6, 0x9C]);
console.log(decoder.write(buf1));
let buf2 = new Buffer([0x88, 0xE5, 0x85, 0x89, 0xEF, 0xBC, 0x8C, 0xE7, 0x96, 0x91, 0xE6]);
console.log(decoder.write(buf2));

// 正确拼接Buffer
let chunks = [];
let size = 0;
let rs2 = fs.createReadStream('test.md', {highWaterMark: 4});
rs2.on('data', (chunk) => {
    chunks.push(chunk);
    size += chunk.length;
});

rs2.on('end', () => {
    let buffer = Buffer.concat(chunks, size);
    console.log(buffer.toString());
});


