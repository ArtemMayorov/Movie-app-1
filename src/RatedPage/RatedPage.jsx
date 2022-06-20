import React, { Component } from "react";
import { Empty, Pagination } from "antd";

import FilmServece from "../services/servece";
import FilmsList from "../FilmsList/FilmsList";

export default class RatedPage extends Component {
  filmServece = new FilmServece();

  state = {
    minValue: 0,
    maxValue: 20,
  };

  render() {
    const filmList = this.filmServece.getRatedMovies();

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
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
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
