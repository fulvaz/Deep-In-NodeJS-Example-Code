'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var option = {
    hostname: '127.0.0.1',
    port: 1337,
    path: '/',
    method: 'GET'
};

var req = _http2.default.request(option, function (res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');

    res.on('data', function (chunk) {
        console.log(chunk);
    });
});

req.end();
//# sourceMappingURL=p162_simple_http_client.js.map