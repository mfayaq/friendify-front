import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"

import { Layout, Menu } from "antd"
import "../App.css"

import { connect } from "react-redux"

const { Header, Footer } = Layout

class Navbar extends Component {
  render() {
    let { pathname } = this.props.history.location
    let { authenticated } = this.props
    let pathName = pathname === "/" ? "home" : pathname.slice(1)
    console.log(pathName)
    return (
      <div className="nav-container">
        <Layout>
          <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" selectedKeys={[pathName]}>
              <Menu.Item key="home">
                <Link to="/" className="" disabled={!authenticated}>
                  Home
                </Link>
              </Menu.Item>
              <Menu.Item key="login" disabled={authenticated}>
                <Link to="/login" className="">
                  Login
                </Link>
              </Menu.Item>
              <Menu.Item key="signup" disabled={authenticated}>
                <Link to="/signup" className="">
                  Signup
                </Link>
              </Menu.Item>
            </Menu>
          </Header>
          <Footer style={{ textAlign: "center" }}></Footer>
        </Layout>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
})

export default connect(mapStateToProps)(withRouter(Navbar))
