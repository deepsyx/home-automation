'use strict';

const md5 = require('md5');
const fs = require('fs');
const rpio = require('rpio');
const WebSocketServer = require('ws').Server;
const scheduled = require('./scheduled');

rpio.init({
    gpiomem: false,
    mapping: 'physical',
});

const SECRET = md5('SOMREALLYLONGSECRETCODE');
const MODULES_DIR = './modules/';

const modules = fs
    .readdirSync(MODULES_DIR)
    .map(item => require(MODULES_DIR + item));

const connections = {};

function broadcast (key, value) {
    for (let id in connections) {
        connections[id].send(JSON.stringify({
        	key,
        	value
        }));
    }
}

function onNewConnection (socket) {
    let isAuthenticated = false;
    const id = Math.random();
    connections[id] = socket;

    socket.on('message', (data) => {
    	try {
	        data = JSON.parse(data);
	    } catch (e) {
	    	data = {};
	    }

        if (!isAuthenticated && data.auth !== SECRET) {
            socket.close();
            return;
        }

        if (!isAuthenticated && data.auth === SECRET) {
            isAuthenticated = true;
            return;
        }

        modules.forEach(module => module(data.key, data.value, broadcast));

        if (data.key === 'STATUS') {
            broadcast('STATUS');
        }
    });

    socket.on('close', () => {
        delete connections[id];
    });
}


const wss = new WebSocketServer({ port: 8080 });
wss.on('connection', onNewConnection);

scheduled(broadcast);

console.log("Running at port 8080\n");
