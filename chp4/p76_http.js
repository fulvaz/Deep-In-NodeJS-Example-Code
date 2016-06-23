var http = require('http');

var option = {
  host: 'www.baidu.com',
  port: 80,
  path: '/s',
  method: 'get'
};

var req = http.request(option, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERs' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function(chunk) {
    console.log('Body: ' + chunk);
  });
  res.on('end', function() {
    console.log('done!');
  });
  res.on('error', function(e) {
    console.log('error: ' + e.message);
  });
});

req.end();
