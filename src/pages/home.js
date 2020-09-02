import React, { Component } from "react";
import { Row, Col } from "antd";
import Scream from "./Scream";
import axios from "axios";

class home extends Component {
	state = {
		screams: null,
	};

	componentDidMount() {
		axios.get("/screams").then(res => {
			console.log(res.data);
			this.setState({
				screams: res.data,
			});
		});
	}
	render() {
		let recentScream = this.state.screams ? (
			this.state.screams.map(scream => (
				<p>
					<Scream key={scream.screamId} scream={scream} />
				</p>
			))
		) : (
			<p>Loading...</p>
		);
		return (
			<Row>
				<Col xs={24} sm={16} md={16} lg={16}>
					{recentScream}
				</Col>
				<Col xs={24} sm={8} md={8} lg={8}>
					etc
				</Col>
			</Row>
		);
	}
}

export default home;
