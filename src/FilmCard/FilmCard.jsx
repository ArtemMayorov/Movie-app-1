import React, { Component } from "react";
import "antd/dist/antd.css";
import "./FilmCard.css";
import { Col, Row, Typography, Rate } from "antd";
import plug from "../MoviesService/theMovie.svg";

import Genres from "../Genres/Genres";
import { formatText, formatReitColor, formatTime } from "../helper/helper";

export default class FilmCard extends Component {
  render() {
    const _apiImageBases = "https://image.tmdb.org/t/p/w500";
    const {
      original_title,
      vote_average,
      release_date,
      overview,
      id,
      backdrop_path,
      genre_ids,
    } = this.props.filmProps;
    const { Title, Paragraph } = Typography;

    const handleChange = (userAverage) => {
      this.props.addAverange(this.props.filmProps, userAverage);
    };

    const ratedCards = JSON.parse(localStorage.getItem("dataAverage"));

    let res = [];
    if (ratedCards) {
      res = ratedCards.filter((elem) => {
        return elem.id === id;
      });
    }
    const aver = res.length > 0 ? res[0].rating : 0;
    return (
      <div key={id} className="film-card">
        <Row className="card-container">
          <Col>
            <img
              className="card-image"
              src={backdrop_path ? `${_apiImageBases}${backdrop_path}` : plug}
              alt="testImage"
            />
          </Col>
          <Col className="card-container-body">
            <Typography className="card-typography">
              <Title level={5} className="card-title">
                {formatText(original_title, "title")}
              </Title>
              <div
                className="card-average"
                style={formatReitColor(vote_average)}
              >
                <span className="card-average-text">{vote_average}</span>
              </div>
            </Typography>
            <div className="card-date">{formatTime(release_date)}</div>
            {genre_ids ? <Genres genreIds={genre_ids} /> : null}
            <Paragraph className="card-description">
              <span className="card-description-text">
                {formatText(overview, "description")}
              </span>
            </Paragraph>
            <Rate
              className="card-stars"
              key={id}
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
