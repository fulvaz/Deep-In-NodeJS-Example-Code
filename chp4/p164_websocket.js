import http from 'http'
import crypto from 'crypto'

// clientO
let socket = new WebSocket('ws://127.0.0.1:12010/updates');
socket.onopen = function() {
    setInterval(() => {
        if (socket.bufferedAmount == 0) {
            socket.send('msg from client');
        }
    }, 50);
};

socket.onmessage = function(event) {
    socket.send('receive from server and send ack from client');
};

// server
let server = http.createServer((req, res) => {

});

server.listen(12010);

server.on('upgrade', (req, res, upgradeHead) => {
    let head = new Buffer(upgradeHead.length);

    // 处理Sec-WebSocket-key
    let key = req.headers['Sec-WebSocket-key'];
    let shasum = crypto.createHash('sha1');
    key = shasum.update(key + 'someKeyInServer').digest('base64'); // crypto对象不能重复使用(digest后即失效), update是以append的形式添加

    let protocol = req.headers['Sec-WebSocket-Protocol'];
    let headers = [
        'HTTP/1.1 101 Switching Protocols',
        'Upgrade: websocket',
        'Connection: Upgrade',
        'Sec-WebSocket-Accept: ' + key,
        'Sec-WebSocket-Protocol: ' + protocol
    ];

    // 发送头
    socket.setNoDeplay(true);
    socket.write(headers.concat('', '').join('\r\n'));

});