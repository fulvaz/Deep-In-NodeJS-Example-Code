import net from 'net'


let server = net.createServer((socket) => {
    socket.on('data', (data) => {
        console.log(data.toString());
        socket.write('received and hi!');
    });

    socket.on('end', () => {
        console.log('connection down');
    });

    socket.write('welcome\n');
});

server.listen(8124, () => {
    console.log('server bound');
});

server.on('connection', () => {
   console.log('server event connection');
});