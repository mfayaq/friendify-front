import React, { Component } from "react"
import { Row, Col } from "antd"
import Scream from "../components/Scream"
import axios from "axios"

class home extends Component {
  state = {
    screams: null,
  }

  componentDidMount() {
    axios.get("/screams").then((res) => {
      this.setState({
        screams: res.data,
      })
    })
  }

  render() {
    let recentScream = this.state.screams ? (
      this.state.screams.map((scream) => (
        <div key={scream.screamId} style={{ marginBottom: "5%" }}>
          <Scream key={scream.screamId} scream={scream} />
        </div>
      ))
    ) : (
      <div>Loading...</div>
    )
    return (
      <Row>
        <Col xxl={4} />
        <Col xs={24} sm={16} md={16} lg={16} xxl={10}>
          {recentScream}
        </Col>
        <Col xs={24} sm={8} md={8} lg={8} xxl={6}>
          etc
        </Col>
        <Col xxl={4} />
      </Row>
    )
  }
}

export default home
