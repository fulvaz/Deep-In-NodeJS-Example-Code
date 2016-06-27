'use strict';

var _net = require('net');

var _net2 = _interopRequireDefault(_net);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = _net2.default.createServer(function (socket) {
    socket.on('data', function (data) {
        console.log(data.toString());
        socket.write('received and hi!');
    });

    socket.on('end', function () {
        console.log('connection down');
    });

    socket.write('welcome\n');
});

server.listen(8124, function () {
    console.log('server bound');
});

server.on('connection', function () {
    console.log('server event connection');
});
//# sourceMappingURL=p151_simple_tcp_server.js.map