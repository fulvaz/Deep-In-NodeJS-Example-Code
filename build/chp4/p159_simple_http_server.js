'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_http2.default.createServer(function (req, res) {
    console.log(req.method);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('hello world \n');

    var buffers = [];
    req.on('data', function (trunk) {
        buffers.push(trunk);
    });

    req.on('end', function () {
        var buffer = Buffer.concat(buffers);
        res.end('hi~');
    });
}).listen(1337, '127.0.0.1');

console.log('Server running');

// var cluster = require('cluster');
// var http = require('http');
// var numCPUs = require('os').cpus().length;
//
// if (cluster.isMaster) {
//     // Fork workers.
//     for (var i = 0; i < 5; i++) {
//         cluster.fork();
//     }
//
//     cluster.on('exit', function(worker, code, signal) {
//         console.log('worker ' + worker.process.pid + ' died');
//     });
// } else {
//     // Workers can share any TCP connection
//     // In this case its a HTTP server
//     http.createServer(function(req, res) {
//
//         var buffer = new Buffer("hello world");
//         var length = Buffer.byteLength("hello world");
//         res.statusCode = 200;
//         res.setHeader('Content-Length', length);
//         res.end(buffer);
//
//         /*
//          util.getValue(function(reply){
//          var buffer = new Buffer(reply);
//          var length = Buffer.byteLength(reply);
//          res.statusCode = 200;
//          res.setHeader('Content-Length', length);
//          res.end(buffer);
//          });*/
//
//     }).listen(1337);
// }
//# sourceMappingURL=p159_simple_http_server.js.map