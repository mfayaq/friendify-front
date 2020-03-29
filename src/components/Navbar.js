import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";

import "../App.css";

const { Header, Footer } = Layout;

class Navbar extends Component {
	render() {
		return (
			<div className="nav-container">
				<Layout>
					<Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
						<div className="logo" />
						<Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
							<Menu.Item key="1">
								<Link to="/" className="">
									Home
								</Link>
							</Menu.Item>
							<Menu.Item key="2">
								<Link to="/login" className="">
									Login
								</Link>
							</Menu.Item>
							<Menu.Item key="3">
								<Link to="/signup" className="">
									Signup
								</Link>
							</Menu.Item>
						</Menu>
					</Header>
					<Footer style={{ textAlign: "center" }}></Footer>
				</Layout>
				,
			</div>
		);
	}
}

export default Navbar;
