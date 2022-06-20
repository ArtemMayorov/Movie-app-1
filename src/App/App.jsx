import React, { Component } from "react";
import { uniqBy } from "lodash";

import NoInternetConnection from "../services/NoInternetConnection";
import "./App.css";
import FilmServece from "../services/servece";
import SearchPage from "../SearchPage/SearchPage";
import MainHeader from "../MainHeader/MainHeader";
import RatedPage from "../RatedPage/RatedPage";
import { ServeceProvider } from "../services/servicesContext";

export default class App extends Component {
  filmServece = new FilmServece();

  state = {
    filmList: null,
    loading: true,
    loadingSearchList: false,
    error: false,
    filmListPage: null,
    totalFilms: null,
    dataAverage: [],
    selectedPage: "search",
    selectedPageNumber: 1,
    searchText: "return",
    gengesList: null,
  };

  componentDidMount() {
    this.getFilmList(this.state.searchText, this.state.selectedPageNumber);
  }

  setSearchText = (text) => {
    this.setState({
      searchText: text,
    });
  };

  onError = () => {
    console.log("onErr");
    this.setState({
      error: true,
      loading: false,
    });
  };

  addAverange = (film, average) => {
    let userAverage = 0;
    if (userAverage !== average) {
      userAverage = average;
    }
    this.setState(() => ({
      dataAverage: [...this.state.dataAverage, { ...film, userAverage }],
    }));
    this.filmServece.setRatedMovies(
      uniqBy([...this.state.dataAverage, { ...film, userAverage }], "id")
    );
  };

  getFilmList = async (filmName = "return", page = 1) => {
    this.setState({
      loadingSearchList: true,
      selectedPageNumber: page,
    });
    const gengesList = await this.filmServece
      .getGenres()
      .then()
      .catch(this.onError);
    await this.filmServece
      .getFilms(filmName, page)
      .then((filmsCollection) => {
        this.setState({
          filmList: filmsCollection.results,
          filmListPage: filmsCollection.page,
          totalFilms: filmsCollection.total_results,
          loading: false,
          loadingSearchList: false,
          gengesList,
        });
      })
      .catch(this.onError);
  };

  getSelectedPage = (page) => {
    this.setState(() => ({ selectedPage: page }));
  };

  render() {
    const page =
      this.state.selectedPage === "search" ? (
        <ServeceProvider value={this.state.gengesList}>
          <SearchPage
            setSearchText={this.setSearchText}
            getFimList={this.getFilmList}
            addAverange={this.addAverange}
            options={this.state}
          />
        </ServeceProvider>
      ) : (
        <ServeceProvider value={this.state.gengesList}>
          <RatedPage options={this.state} />
        </ServeceProvider>
      );
    return (
      <section className="container">
        <MainHeader getSelectedPage={this.getSelectedPage} />
        <NoInternetConnection />
        {page}
      </section>
    );
  }
}
