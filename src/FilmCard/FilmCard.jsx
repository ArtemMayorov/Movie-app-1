import React, { Component } from "react";
import "antd/dist/antd.css";
import "./FilmCard.css";
import { Col, Row, Typography, Rate } from "antd";

import Genres from "../Genres/Genres";
import { formatText, formatReitColor, formatTime } from "../helper/helper";
import MoviesService from "../MoviesService/MoviesService";

export default class FilmCard extends Component {
  filmService = new MoviesService();

  state = {
    srcForImg: "#",
    title: "loading",
    average: 0,
    userAverage: 0,
    data: null,
    text: "",
    key: 1,
  };

  componentDidMount() {
    const {
      original_title,
      vote_average,
      release_date,
      overview,
      id,
      backdrop_path,
      userAverage,
      genre_ids,
    } = this.props.filmProps;
    this.idFilm = id;
    this.setState({
      srcForImg: this.filmService.getImage(backdrop_path),
      title: original_title,
      average: vote_average,
      data: release_date,
      text: overview,
      key: id,
      userAverage,
      genreIds: genre_ids,
    });
  }

  render() {
    const { Title, Paragraph } = Typography;

    const handleChange = (userAverage) => {
      this.setState(() => ({ userAverage }));
      this.props.addAverange(this.props.filmProps, userAverage);
    };

    const ratedCards = this.filmService.getRatedMovies();
    let res = [];
    if (ratedCards) {
      res = ratedCards.filter((elem) => elem.id === this.state.key);
    }

    const aver = res.length > 0 ? res[0].userAverage : 0;

    return (
      <div key={this.state.id} className="film-card">
        <Row className="card-container">
          <Col>
            <img
              className="card-image"
              src={this.state.srcForImg}
              alt="testImage"
            />
          </Col>
          <Col className="card-container-body">
            <Typography className="card-typography">
              <Title level={5} className="card-title">
                {formatText(this.state.title, "title")}
              </Title>
              <div
                className="card-average"
                style={formatReitColor(this.state.average)}
              >
                <span className="card-average-text">{this.state.average}</span>
              </div>
            </Typography>
            <div className="card-date">{formatTime(this.state.data)}</div>
            {this.state.genreIds ? (
              <Genres genreIds={this.state.genreIds} />
            ) : null}
            <Paragraph className="card-description">
              <span className="card-description-text">
                {formatText(this.state.text, "description")}
              </span>
            </Paragraph>
            <Rate
              className="card-stars"
              key={this.state.key}
              count={10}
              allowHalf
              defaultValue={aver}
              onChange={handleChange}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
