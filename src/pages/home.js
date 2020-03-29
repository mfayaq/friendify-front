import React, { Component } from "react";
import { Row, Col } from "antd";

class home extends Component {
	render() {
		return (
			<div>
				<Row>
					<Col span={16}>profile</Col>
					<Col span={8}>etc</Col>
				</Row>
			</div>
		);
	}
}

export default home;
