import React, { Component } from "react";
import { Col, Row } from "antd";

import FilmCard from "../FilmCard/FilmCard";
import "antd/dist/antd.css";
import "./FilmsList.css";

export default class FilmsList extends Component {
  state = {
    selectPage: "search",
  };

  render() {
    const { filmList } = this.props;
    const { addAverange } = this.props;

    const filmCard = filmList.map((film) => (
      <Col key={film.id} >
        <FilmCard   filmProps={film} addAverange={addAverange} />
      </Col>
    ));
    return <Row className="grid-container">{filmCard}</Row>;
  }
}
