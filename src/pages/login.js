import React, { Component } from "react";
import { Form, Input, Button, Checkbox, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
// import { Spin } from "antd";
import axios from "axios";
// import { css } from "@emotion/core";
// import ClipLoader from "react-spinners/ClipLoader";
import "../App.css";
import AppIcon from "../images/favicon.svg";
// import { formatCountdown } from "antd/lib/statistic/utils";
import Spin from "antd/es/spin";
import "antd/es/spin/style/css";

class login extends Component {
	constructor() {
		super();

		this.state = {
			email: "",
			password: "",
			remember: false,
			loading: false,
			loginError: {},
		};
	}

	render() {
		let { loginError } = this.state;

		const onLogin = () => {
			let { email, password } = this.state;
			axios
				.post("/login", { email, password })
				.then((res) => {
					console.log(res);
					this.props.history.push("/");
					this.setState({
						loading: false,
					});
				})
				.catch((err) => {
					// console.log(err);
					if (err.response) {
						console.log(err.response);
						let { data } = err.response;
						this.setState({
							loading: false,
							loginError: { ...data },
						});
						console.log(this.state);
					}
				});
			// this.setState({ ...this.state, loading: false });
		};

		// const isEmpty = (str) => {
		// 	if (str.trim() === "") return true;
		// 	else return false;
		// };

		const onFinish = (values) => {
			console.log("Received values of form: ", values);
			let { email, password } = values;
			if (!email) {
				this.setState({
					loginError: {
						...this.state.loginError,
						email: "Please input your Email!",
					},
				});
			} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
				this.setState({
					loginError: {
						...this.state.loginError,
						email: "Please input correct Email!",
					},
				});
			}
			if (!password) {
				this.setState({
					loginError: {
						...this.state.loginError,
						password: "Please input your Password!",
					},
				});
			}
			if (this.state.loginError.email || this.state.loginError.password) return;
			this.setState({ ...values, loading: true });
			console.log(this.state);
			onLogin();
		};

		const onValuesChange = (values) => {
			let key = Object.keys(values)[0];
			if (this.state.loginError[key])
				this.setState({
					loginError: {
						...this.state.loginError,
						[key]: "",
					},
				});
		};

		const onFinishFailed = (values, errors) => {
			console.log(values);
		};

		// const override = css`
		// 	display: block;
		// 	margin: 0 auto;
		// 	border-color: red;
		// `;

		return (
			// <div style={{ display: "flex", justifyContent: "center" }}>

			<div>
				{/* <ClipLoader
					css={override}
					size={150}
					color={"#123abc"}
					loading={this.state.loading}
				/> */}
				<Spin spinning={this.state.loading}>
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
									help={loginError.email}
									validateStatus={loginError.email ? "error" : "validating"}
									name="email"
									validateFirst="true"
									// rules={[
									// 	{
									// 		required: true,
									// 		message: "Please input your Email!",
									// 	},
									// 	{
									// 		required: true,
									// 		type: "email",
									// 		validateTrigger: "onSubmit",
									// 		message: "Please input correct Email!",
									// 	},
									// 	{
									// 		required: loginError ? false : true,
									// 		message: loginError,
									// 	},
									// ]}
								>
									<Input
										prefix={<UserOutlined className="site-form-item-icon" />}
										placeholder="Email"
										onChange={this.handleChange}
									/>
								</Form.Item>
								<Form.Item
									name="password"
									help={loginError.password}
									validateStatus={loginError.password ? "error" : "validating"}
									// rules={[
									// 	{
									// 		required: true,
									// 		validateTrigger: "onSubmit",
									// 		message: "Please input your Password!",
									// 	},
									// ]}
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
									Or <a href="/signup">register now!</a>
								</Form.Item>
							</Form>
						</Col>
					</Row>
				</Spin>
			</div>
			// </div>
		);
	}
}

export default login;
