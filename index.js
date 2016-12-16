'use strict';

const net = require('net');
const md5 = require('md5');
const fs = require('fs');
const rpio = require('rpio');

rpio.init({
    gpiomem: false,
    mapping: 'physical',
});

const SECRET = md5('SOMREALLYLONGSECRETCODE');
const MODULES_DIR = './modules/';

const modules = fs
    .readdirSync(MODULES_DIR)
    .map(item => require(MODULES_DIR + item));

function onNewConnection (socket) {
    let isAuthenticated = false;

    socket.on('data', (bufferData) => {
        const data = bufferData.toString('utf8');
        const [key, value] = data.split('|');

        if (!isAuthenticated && value !== SECRET) {
            socket.end('Auth failed');
            return;
        }

        if (!isAuthenticated && value === SECRET) {
            isAuthenticated = true;
            return;
        }

        modules.forEach(module => module(key, value));
    });
}

net
    .createServer(onNewConnection)
    .listen(5000);

console.log("Running at port 5000\n");
