import React, { Component } from "react"
import { Card, Avatar } from "antd"
import { CommentOutlined, LikeOutlined } from "@ant-design/icons"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import "../App.css"

const { Meta } = Card

class Scream extends Component {
  render() {
    dayjs.extend(relativeTime)
    const {
      scream: {
        body,
        imageUrl,
        createdAt,
        userHandle,
        likeCount,
        commentCount,
      },
    } = this.props
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card
          style={{ width: "80%" }}
          // actions={[

          // ]}
        >
          <Meta
            avatar={<Avatar src={imageUrl} size={50} />}
            title={
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>{userHandle}</div>
                <div
                  style={{
                    fontWeight: "normal",
                    fontSize: "13px",
                    color: "gray",
                  }}
                >
                  {dayjs(createdAt).fromNow()}
                </div>
              </div>
            }
            description={
              <>
                <p>{body}</p>
                <div style={{ display: "flex" }}>
                  <div style={{ flexBasis: "30%" }}>
                    <LikeOutlined key="Like" /> {likeCount}
                  </div>
                  <div style={{ flexBasis: "30%" }}>
                    <CommentOutlined key="Comment" /> {commentCount}
                  </div>
                </div>
              </>
            }
          />
        </Card>
      </div>
    )
  }
}

export default Scream
