import React, { Component } from "react";
import { Form, Input, Button, Checkbox, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "../App.css";
import AppIcon from "../images/favicon.svg";
import Spin from "antd/es/spin";
import "antd/es/spin/style/css";

import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";
import {
	setErrors,
	clearErrors,
	clearErrorsAll,
} from "../redux/actions/uiActions";
import { bindActionCreators } from "redux";

class login extends Component {
	constructor() {
		super();

		this.state = {
			remember: false,
		};
	}

	componentDidMount() {
		let { history, dispatch } = this.props;
		this.unlisten = history.listen(() => {
			let { errors } = this.props.ui;
			if (Object.keys(errors).length > 0) dispatch(clearErrorsAll());
		});
	}

	componentWillUnmount() {
		this.unlisten();
	}

	render() {
		let { errors } = this.props.ui;

		const onFinish = values => {
			console.log("Received values of form: ", values);
			let { dispatch } = this.props;
			let { email, password } = values;
			let errorObj = {};
			if (!email) {
				errorObj.email = "Please input your Email!";
			} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
				errorObj.email = "Please input correct Email!";
			}
			if (!password) {
				errorObj.password = "Please input your Password!";
			}
			if (Object.keys(errorObj).length > 0) {
				dispatch(setErrors(errorObj));
				return;
			}
			// this.setState({ ...values, loading: true });
			let { loginUser, history } = this.props;
			loginUser({ email, password }, history);
		};

		const onValuesChange = values => {
			// clearErrors();
			let {
				dispatch,
				ui: { errors },
			} = this.props;
			let key = Object.keys(values)[0];
			if (errors[key]) dispatch(clearErrors(key));
		};

		const onFinishFailed = (values, errors) => {
			console.log(values);
		};

		return (
			<div>
				<Spin spinning={this.props.ui.loading}>
					<Row justify="center">
						<Col xs={20} sm={20} md={12} lg={8}>
							<div style={{ display: "flex", justifyContent: "center" }}>
								<img src={AppIcon} width="30%" />
							</div>
							<br />
							<br />
							<Form
								name="login"
								className="login-form"
								initialValues={{
									remember: false,
								}}
								onFinish={onFinish}
								onValuesChange={onValuesChange}
								onFinishFailed={onFinishFailed}
							>
								<Form.Item
									help={errors.email}
									validateStatus={errors.email ? "error" : "validating"}
									name="email"
									validateFirst="true"
								>
									<Input
										prefix={<UserOutlined className="site-form-item-icon" />}
										placeholder="Email"
										onChange={this.handleChange}
									/>
								</Form.Item>
								<Form.Item
									name="password"
									help={errors.password}
									validateStatus={errors.password ? "error" : "validating"}
								>
									<Input
										prefix={<LockOutlined className="site-form-item-icon" />}
										type="password"
										placeholder="Password"
										onChange={this.handleChange}
									/>
								</Form.Item>
								<Form.Item>
									<Form.Item name="remember" valuePropName="checked">
										<Checkbox>Remember me</Checkbox>
									</Form.Item>

									<a className="login-form-forgot" href="">
										Forgot password
									</a>
								</Form.Item>

								<Form.Item>
									<Button
										type="primary"
										htmlType="submit"
										className="login-form-button"
									>
										Log in
									</Button>
									Or <Link to="/signup">register now!</Link>
								</Form.Item>
							</Form>
						</Col>
					</Row>
				</Spin>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user,
	ui: state.ui,
});

const mapDispatchToProps = dispatch => ({
	...bindActionCreators({ loginUser }, dispatch),
	dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(login);
