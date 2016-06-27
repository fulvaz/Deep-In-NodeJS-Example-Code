'use strict';

var _dgram = require('dgram');

var _dgram2 = _interopRequireDefault(_dgram);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = _dgram2.default.createSocket('udp4');

server.on('message', function (msg, rinfo) {
    console.log('received from ' + rinfo.address + ':' + rinfo.port);
});

server.on('listening', function () {
    console.log('listening on ' + server.address().address + ':' + server.address().port);
});

server.bind(41234);
//# sourceMappingURL=p154_simple_udp_server.js.map