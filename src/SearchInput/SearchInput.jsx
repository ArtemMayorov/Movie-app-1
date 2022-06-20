import React, { Component } from "react";
import "./SearchInput.css";
import "antd/dist/antd.css";
import { Input } from "antd";

export default class SearchInput extends Component {
  state = {
    searchValue: "",
  };

  getInputValue(text) {
    this.setState({
      searchValue: text,
    });
  }

  handleChange() {
    this.props.updateText(this.state.searchValue);
  }

  render() {
    return (
      <Input
        className="search-input"
        onKeyUp={() => this.handleChange()}
        onChange={(e) => this.getInputValue(e.target.value)}
        value={this.state.searchValue}
        placeholder="Type to search..."
        maxLength={50}
      />
    );
  }
}
