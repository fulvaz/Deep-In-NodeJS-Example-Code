import dgram from 'dgram'

let message = new Buffer('msg@client');
let client = dgram.createSocket('udp4');
client.send(message, 0, message.length, 41234, 'localhost', function(err, byte) {
    client.close();
});
