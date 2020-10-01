import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu } from "antd";

import "../App.css";

const { Header, Footer } = Layout;

class Navbar extends Component {
	render() {
		let { pathname } = this.props.history.location;
		let pathName = pathname === "/" ? "home" : pathname.slice(1);
		console.log(pathName);
		return (
			<div className="nav-container">
				<Layout>
					<Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
						<div className="logo" />
						<Menu theme="dark" mode="horizontal" selectedKeys={[pathName]}>
							<Menu.Item key="home">
								<Link to="/" className="">
									Home
								</Link>
							</Menu.Item>
							<Menu.Item key="login">
								<Link to="/login" className="">
									Login
								</Link>
							</Menu.Item>
							<Menu.Item key="signup">
								<Link to="/signup" className="">
									Signup
								</Link>
							</Menu.Item>
						</Menu>
					</Header>
					<Footer style={{ textAlign: "center" }}></Footer>
				</Layout>
			</div>
		);
	}
}

export default withRouter(Navbar);
