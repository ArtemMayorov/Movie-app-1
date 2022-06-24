import React, { Component } from "react";
import { Empty, Pagination } from "antd";

import MoviesService from "../MoviesService/MoviesService";
import FilmsList from "../FilmsList/FilmsList";

export default class RatedPage extends Component {
  MoviesService = new MoviesService();

  state = {
    minValue: 0,
    maxValue: 20,
  };

  render() {
    const __emptyImage =
      "https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg";
    const filmList = this.MoviesService.getRatedMovies();

    const handlePage = (value) => {
      if (value <= 1) {
        this.setState({
          minValue: 0,
          maxValue: 20,
        });
      } else {
        this.setState({
          minValue: (value - 1) * 20,
          maxValue: value * 20,
        });
      }
    };

    if (!filmList) {
      return (
        <Empty
          image={__emptyImage}
          imageStyle={{
            margin: 40,
            height: 60,
          }}
          description={<span>Movies not found</span>}
        />
      );
    }
    return (
      <>
        <FilmsList
          addAverange={this.props.addAverange}
          filmList={filmList.slice(this.state.minValue, this.state.maxValue)}
        />
        <div className="searchPage-container">
          <Pagination
            total={filmList.length}
            onChange={handlePage}
            showSizeChanger={false}
            defaultCurrent={1}
            defaultPageSize={20}
          />
        </div>
      </>
    );
  }
}
