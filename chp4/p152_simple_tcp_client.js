import net from 'net'

let client = net.connect({port:8124}, () => {
    console.log('client connected');
    client.write('greeting from client');
});

client.on('data', (data) => {
    client.end();
    console.log(data.toString());
});

client.on('end', () => {
    console.log('client disconnect');
});