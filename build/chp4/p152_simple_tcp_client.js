'use strict';

var _net = require('net');

var _net2 = _interopRequireDefault(_net);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var client = _net2.default.connect({ port: 8124 }, function () {
    console.log('client connected');
    client.write('greeting from client');
});

client.on('data', function (data) {
    client.end();
    console.log(data.toString());
});

client.on('end', function () {
    console.log('client disconnect');
});
//# sourceMappingURL=p152_simple_tcp_client.js.map