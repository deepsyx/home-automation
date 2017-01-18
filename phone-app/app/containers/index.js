import React from 'react';
import Immutable from 'immutable';

import Home from 'app/Home';
import Loading from 'app/components/Loading/Loading';

import config from 'home-config';

class Data extends Immutable.Record({
	LED_FLOOR: Immutable.Map(),
	LED_SOFA: Immutable.Map(),
	TEMPERATURE: 0,
	AC: Immutable.Map(),
	HEATING: Immutable.Map(),
}) {}

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

		this.ws.onopen = () => {
			this.ws.send(JSON.stringify({
				'auth': config.authToken,
			}));
			setTimeout(() => this.ws.send(JSON.stringify({
				'key': 'STATUS'
			})), 200);
		}

		this.ws.onmessage = (e) => {
			const data = JSON.parse(e.data);

			if (data.key === 'STATUS') {
				this.setState({
					isConnected: true,
				});
				return;
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
		this.ws.send(JSON.stringify({
			key,
			value,
		}));
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