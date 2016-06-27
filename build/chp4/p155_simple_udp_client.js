'use strict';

var _dgram = require('dgram');

var _dgram2 = _interopRequireDefault(_dgram);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var message = new Buffer('msg@client');
var client = _dgram2.default.createSocket('udp4');
client.send(message, 0, message.length, 41234, 'localhost', function (err, byte) {
    client.close();
});
//# sourceMappingURL=p155_simple_udp_client.js.map