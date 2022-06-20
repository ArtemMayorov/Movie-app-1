import React, { Component } from "react";
import "antd/dist/antd.css";
import "./FilmCard.css";
import { Col, Row, Typography, Tag, Rate } from "antd";
import { format } from "date-fns";

import { ServeceConsumer } from "../services/servicesContext";
import FilmServece from "../services/servece";

export default class FilmCard extends Component {
  filmServece = new FilmServece();

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
      srcForImg: this.filmServece.getImage(backdrop_path),
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

    const formatTime = (releaseDate) => {
      if (!releaseDate) releaseDate = "0000-00-00";
      const dateArguments = releaseDate.split("-");
      const [y, m, d] = dateArguments;
      return format(new Date(y, m, d), "MMMM d, Y");
    };

    const formatText = (textForCard, section) => {
      if (!textForCard) textForCard = "No description";
      let clippedText = textForCard;
      if (textForCard.length >= 53) {
        clippedText = textForCard.split(" ");
        if (section === "title") {
          clippedText = clippedText.slice(0, 9);
        } else if (section === "description") {
          clippedText = clippedText.slice(0, 20);
        }
        clippedText = clippedText.join(" ");
        clippedText = `${clippedText} ...`;
      }
      return clippedText;
    };
    const ratedCards = this.filmServece.getRatedMovies();

    const res = ratedCards.filter((elem) => elem.id === this.state.key);

    const formatReitColor = (rate) => {
      let border = "2px solid ";
      if (rate >= 0 && rate < 3) border += "#E90000";
      if (rate >= 3 && rate < 5) border += "#E97E00";
      if (rate >= 5 && rate < 7) border += "#E9D100";
      if (rate >= 7) border += "#66E900";
      return {
        border,
      };
    };
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
            <ServeceConsumer>
              {(consumer) => {
                if (this.state.genreIds) {
                  return consumer.map(({ id, name }) => {
                    if (this.state.genreIds.find((genreId) => genreId === id)) {
                      return (
                        <Tag className="card-genre">
                          <span className="card-genre-text">{name}</span>
                        </Tag>
                      );
                    }
                  });
                }
              }}
            </ServeceConsumer>
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
