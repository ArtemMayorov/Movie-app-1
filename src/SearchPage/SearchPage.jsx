import React, { Component } from "react";
import { debounce } from "lodash";
import { Spin, Pagination, Empty } from "antd";

import FilmsList from "../FilmsList/FilmsList";
import SearchInput from "../SearchInput/SearchInput";
import "./SearchPage.css";
import "antd/dist/antd.css";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";

export default class SearchPage extends Component {
  state = {
    searchText: "return",
    page: 1,
  };

  handleChange = (page) => {
    this.handlePage(this.state.searchText, page);
  };

  handleInput = (newSearchText) => {
    if (newSearchText.trim() === "") return;
    this.setState({
      searchText: newSearchText,
      page: 1,
    });
    this.props.setSearchText(newSearchText);
    return this.props.getFimList(newSearchText, 1);
  };

  handlePage = (page) => {
    this.props.getFimList(this.state.searchText, page);
    this.setState({
      page,
    });
  };

  debouncedHandleInput = debounce(this.handleInput, 2000);

  render() {
    const __emptyImage =
      "https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg";
    const {
      addAverange,
      options: { loading, error, filmList, loadingSearchList, totalFilms },
    } = this.props;

    if (loading) {
      return <Loading />;
    }
    if (error) {
      return <Error />;
    }

    const filmNotFound =
      filmList.length === 0 && !loadingSearchList ? (
        <Empty
          image={__emptyImage}
          imageStyle={{
            margin: 40,
            height: 60,
          }}
          description={<span>Movies not found</span>}
        />
      ) : null;
    const loadList = loadingSearchList ? (
      <Spin size="large" className="spin" />
    ) : (
      <>
        <FilmsList filmList={filmList} addAverange={addAverange} />
        <div className="searchPage-container">
          <Pagination
            className="searchPage-pagination"
            total={totalFilms}
            onChange={this.handlePage}
            showSizeChanger={false}
            defaultCurrent={this.props.options.selectedPageNumber}
            defaultPageSize={20}
          />
        </div>
      </>
    );
    const films = !filmNotFound ? loadList : null;
    return (
      <>
        <SearchInput updateText={this.debouncedHandleInput} />
        {filmNotFound}
        {films}
      </>
    );
  }
}
