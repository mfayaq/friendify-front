import React, { Component } from "react"
import { Form, Input, Button, Checkbox, Row, Col } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import "../App.css"
import AppIcon from "../images/favicon.svg"
import Spin from "antd/es/spin"
import "antd/es/spin/style/css"

import { Link, Redirect } from "react-router-dom"

import { connect } from "react-redux"
import { loginUser } from "../redux/actions/userActions"
import {
  setErrors,
  clearErrors,
  clearErrorsAll,
} from "../redux/actions/uiActions"
import { bindActionCreators } from "redux"

class login extends Component {
  constructor() {
    super()

    this.state = {
      remember: false,
    }
  }

  componentDidMount() {
    let { history, dispatch } = this.props
    this.unlisten = history.listen(() => {
      let { errors } = this.props.ui
      if (Object.keys(errors).length > 0) dispatch(clearErrorsAll())
    })
  }

  componentWillUnmount() {
    this.unlisten()
  }

  render() {
    const { errors, loading } = this.props.ui
    const { authenticated } = this.props.user

    const onFinish = (values) => {
      const { dispatch } = this.props
      const { email, password } = values
      const { loginUser, history } = this.props
      const errorObj = {}

      if (!email) errorObj.email = "Please input your Email!"
      else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))
        errorObj.email = "Please input correct Email!"

      if (!password) errorObj.password = "Please input your Password!"

      if (Object.keys(errorObj).length > 0) dispatch(setErrors(errorObj))
      else loginUser({ email, password }, history)
    }

    const onValuesChange = (values) => {
      const {
        dispatch,
        ui: { errors },
      } = this.props
      const key = Object.keys(values)[0]
      if (errors[key]) dispatch(clearErrors(key))
    }

    if (authenticated === true) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <Spin spinning={loading}>
          <Row justify="center">
            <Col xs={20} sm={20} md={12} lg={8}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img src={AppIcon} width="30%" alt="Logo" />
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
                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Form.Item>
                  <Link to="" className="login-form-forgot">
                    Forgot password
                  </Link>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Log in
                  </Button>
                </Form.Item>
                <Form.Item>
                  Or <Link to="/signup">register now!</Link>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Spin>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  ui: state.ui,
})

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ loginUser }, dispatch),
  dispatch,
})

export default connect(mapStateToProps, mapDispatchToProps)(login)
