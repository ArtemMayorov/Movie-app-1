import React, { Component } from "react";
import { Alert } from "antd";
import "antd/dist/antd.css";

export default class Error extends Component {
  render() {
    return (
      <Alert
        message="Oops..."
        description="Something went wrong :("
        type="error"
      />
    );
  }
}
