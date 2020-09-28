import React, { Component } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { UserOutlined, LockOutlined, EditOutlined } from "@ant-design/icons";

import "../App.css";
import AppIcon from "../images/favicon.svg";
import Spin from "antd/es/spin";
import "antd/es/spin/style/css";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { signUpUser } from "../redux/actions/userActions";
import {
	setErrors,
	clearErrors,
	clearErrorsAll,
} from "../redux/actions/uiActions";
import { bindActionCreators } from "redux";

class signup extends Component {
	constructor() {
		super();
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
		let { errors, loading } = this.props.ui;

		const onFinish = values => {
			console.log("Received values of form: ", values);
			let { dispatch } = this.props;
			let { email, password, confirmPassword, handle } = values;
			let errorObj = {};
			if (!email) {
				errorObj.email = "Please input your Email!";
			} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
				errorObj.email = "Please input correct Email!";
			}
			if (!password) {
				errorObj.password = "Please input your Password!";
			}
			if (!confirmPassword) {
				errorObj.confirmPassword = "Please confirm your Password!";
			}
			if (!handle) {
				errorObj.handle = "Please input your Handle!";
			}
			if (password !== confirmPassword) {
				errorObj.confirmPassword = "Password should match";
			}
			console.log(errorObj);
			if (Object.keys(errorObj).length > 0) {
				dispatch(setErrors(errorObj));
				return;
			}
			let { signUpUser, history } = this.props;
			signUpUser({ email, password, confirmPassword, handle }, history);
		};

		const onValuesChange = values => {
			let {
				dispatch,
				ui: { errors },
			} = this.props;
			let key = Object.keys(values)[0];
			if (errors[key]) dispatch(clearErrors(key));
		};

		return (
			<div>
				<Spin spinning={loading}>
					<Row justify="center">
						<Col xs={20} sm={20} md={12} lg={8}>
							<div style={{ display: "flex", justifyContent: "center" }}>
								<img src={AppIcon} width="30%" />
							</div>
							<br />
							<br />
							<Form
								name="signup"
								className="signup-form"
								initialValues={{
									remember: false,
								}}
								onFinish={onFinish}
								onValuesChange={onValuesChange}
							>
								<Form.Item
									name="email"
									help={errors.email}
									validateStatus={errors.email ? "error" : "validating"}
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

								<Form.Item
									name="confirmPassword"
									help={errors.confirmPassword}
									validateStatus={
										errors.confirmPassword ? "error" : "validating"
									}
								>
									<Input
										prefix={<LockOutlined className="site-form-item-icon" />}
										placeholder="Confirm Password"
										onChange={this.handleChange}
									/>
								</Form.Item>

								<Form.Item
									name="handle"
									help={errors.handle}
									validateStatus={errors.handle ? "error" : "validating"}
								>
									<Input
										prefix={<EditOutlined className="site-form-item-icon" />}
										placeholder="User Handle"
										onChange={this.handleChange}
									/>
								</Form.Item>

								<Form.Item>
									<Button
										type="primary"
										htmlType="submit"
										className="login-form-button"
									>
										SIGN UP
									</Button>
									Already have an account? <Link to="/login">Login now!</Link>
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
	...bindActionCreators({ signUpUser }, dispatch),
	dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(signup);
