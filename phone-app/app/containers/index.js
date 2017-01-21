import React from 'react';
import Immutable from 'immutable';

import Home from 'app/Home';
import Loading from 'app/components/Loading/Loading';

import config from 'home-config';
import { Data, Modules } from 'home-records';

export default class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            items: new Data(),
            isConnected: false,
        };
    }

    componentDidMount () {
        this.ws = new WebSocket(config.serverUri);

        console.log(Modules);
        this.ws.onopen = () => {
            this.ws.send(
                JSON.stringify({
                    'auth': config.authToken,
                })
            );

            setTimeout(() => {
                this.ws.send(
                    JSON.stringify({
                        'key': 'STATUS'
                    })
                );
            }, 200);
        }

        this.ws.onmessage = (e) => {
            const data = JSON.parse(e.data);

            if (data.key === 'STATUS') {
                this.setState({
                    isConnected: true,
                });
                return;
            }

            if (!Modules[data.key]) {
                throw new Error(`Invalid data key: ${data.key}`);
            }

            this.setState({
                items: this.state.items.set(data.key, Immutable.fromJS(data.value)),
            });
        }

        this.ws.onclose = () => {
            this.setState({
                isConnected: false,
            });
        }
    }

    componentWillUnmount () {
        this.ws.close();
    }

    dispatch (key, value) {
        this.ws.send(
            JSON.stringify({
                key,
                value,
            })
        );
    }

    render () {
        if (!this.state.isConnected) {
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