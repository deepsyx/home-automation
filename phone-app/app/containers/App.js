import React from 'react';
import Immutable from 'immutable';

import Home from 'app/Home';
import Loading from 'app/components/Loading/Loading';

import config from 'home-config';
import {
    Data,
    Modules
} from 'home-records';

const States = {
    CONNECTED: 'connected',
    CONNECTING: 'connecting',
    DISCONNECTED: 'disconnected'
};

export default class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            items: new Data(),
            status: States.DISCONNECTED,
            interval: null,
        };
    }

    componentDidMount () {
        this.connect();
    }

    connect () {
        this.ws = new WebSocket(config.serverUri);

        this.ws.onopen = () => this.onConnectionOpen();
        this.ws.onmessage = (event) => this.onConnectionMessage(event);
        this.ws.onclose = () => this.onConnectionClose();
        this.ws.sendJSON = (obj) => this.ws.send(JSON.stringify(obj));

        this.state.status = States.CONNECTING;
    }

    onConnectionOpen () {
        this.ws.sendJSON({
            'auth': config.authToken,
        });

        this.ws.sendJSON({
            'key': 'STATUS',
        });
    }

    onConnectionMessage (event) {
        const data = JSON.parse(event.data);

        if (data.key === 'STATUS') {
            this.setState({
                status: States.CONNECTED,
            });
            return;
        }

        if (!Modules[data.key]) {
            throw new Error(`Invalid data key: ${data.key}`);
        }

        this.setState({
            items: this.state.items.set(
                data.key,
                new Modules[data.key](data.value),
            ),
        });
    }

    onConnectionClose () {
        this.setState({
            status: States.DISCONNECTED,
        });

        // reconnect mechanics
        this.state.interval = setInterval(() => {
            if (this.state.status === States.CONNECTING || this.state.status === States.CONNECTED) {
                clearInterval(this.state.interval);
                return;
            }

            this.connect();
        }, 1000);
    }

    componentWillUnmount () {
        this.ws.close();
    }

    dispatch (key, value) {
        this.ws.sendJSON({
            key,
            value,
        });
    }

    render () {
        if (this.state.status !== States.CONNECTED) {
            return (
                <Loading />
            );
        }

        return (
            <Home
             items={this.state.items}
             dispatch={(k, v) => this.dispatch(k, v)} />
        );
    }
}
