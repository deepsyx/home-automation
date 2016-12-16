const net = require('net');
const md5 = require('md5');

const SECRET = md5('SOMREALLYLONGSECRETCODE');

const client = new net.Socket();
client.connect(5000, 'localhost', () => {
    console.log('Connected');
    client.write('AUTH|' + SECRET);

    var stdin = process.openStdin();

    stdin.addListener("data", function(d) {
        client.write('' +  d.toString().trim());
    });
});

