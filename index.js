'use strict';

const md5 = require('md5');
const fs = require('fs');
const rpio = require('rpio');
const WebSocketServer = require('ws').Server;

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

    socket.on('message', (data) => {
        const [key, value] = data.split('|');

        if (!isAuthenticated && value !== SECRET) {
            socket.close();
            return;
        }

        if (!isAuthenticated && value === SECRET) {
            isAuthenticated = true;
        }

        modules.forEach(module => module(key, value, socket));
    });
}


const wss = new WebSocketServer({ port: 8080 });
wss.on('connection', onNewConnection);

console.log("Running at port 8080\n");
