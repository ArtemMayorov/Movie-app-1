import React, { Component } from "react";
import { Spin } from "antd";
import "antd/dist/antd.css";

export default class Loading extends Component {
  render() {
    return <Spin size="large" className="spin" />;
  }
}
