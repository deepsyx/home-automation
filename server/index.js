'use strict';

/*
 * Third party
 */

const fs = require('fs');
const WebSocketServer = require('ws').Server;

/*
 * local files
 */
const homeConfig = require('home-config');
const scheduled = require('./scheduled');
const Records = require('home-records').Modules;

const MODULES_DIR = './modules/';


/*
 * Load all modules to array
 */
const modules = fs
    .readdirSync(MODULES_DIR)
    .map(item => require(MODULES_DIR + item));

const connections = {};

/*
 * Broadcast key-value pair to all connections
 */
function broadcast (key, value) {
    for (let id in connections) {
        connections[id].send(
            JSON.stringify({
                key,
                value
            })
        );
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

        // disconnect client if the first message is not valid auth token
        if (!isAuthenticated && data.auth !== homeConfig.authToken) {
            socket.close();
            return;
        }

        // toggle auth flag if there is a valid auth token
        if (!isAuthenticated && data.auth === homeConfig.authToken) {
            isAuthenticated = true;
            return;
        }

        // pass message to all modules
        modules.forEach(module =>
            module(
                data.key,
                Records[data.key] ?
                    new Records[data.key](data.value) : // create record from json
                    {},
                broadcast
            )
        );

        if (data.key === 'STATUS') {
            setTimeout(() => {
                broadcast('STATUS');
            }, 250);
        }
    });

    socket.on('close', () => {
        // remove connection from the broadcast list
        delete connections[id];
    });
}


const wss = new WebSocketServer({
    port: 8080
});
wss.on('connection', onNewConnection);

scheduled(broadcast);

console.log("Running at port 8080\n");
