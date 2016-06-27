import dgram from 'dgram'

let server = dgram.createSocket('udp4');

server.on('message', (msg, rinfo) => {
    console.log('received from ' + rinfo.address + ':' + rinfo.port);
});

server.on('listening', () => {
    console.log('listening on '+ server.address().address + ':' + server.address().port);
});

server.bind(41234);