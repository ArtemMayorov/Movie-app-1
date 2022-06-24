import React, { Component } from "react";
import { uniqBy } from "lodash";

import NoInternetConnection from "../NoInternetConnection/NoInternetConnection";
import "./App.css";
import MoviesService from "../MoviesService/MoviesService";
import SearchPage from "../SearchPage/SearchPage";
import MainHeader from "../MainHeader/MainHeader";
import RatedPage from "../RatedPage/RatedPage";
import { ServiceProvider } from "../MoviesService/MoviesServiceContext";

export default class App extends Component {
  filmService = new MoviesService();

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
    genresList: null,
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
    this.filmService.setRatedMovies(
      uniqBy([...this.state.dataAverage, { ...film, userAverage }], "id")
    );
  };

  getFilmList = async (filmName = "return", page = 1) => {
    this.setState({
      loadingSearchList: true,
      selectedPageNumber: page,
    });
    const genresList = await this.filmService
      .getGenres()
      .then()
      .catch(this.onError);
    await this.filmService
      .getFilms(filmName, page)
      .then((filmsCollection) => {
        this.setState({
          filmList: filmsCollection.results,
          filmListPage: filmsCollection.page,
          totalFilms: filmsCollection.total_results,
          loading: false,
          loadingSearchList: false,
          genresList,
        });
      })
      .catch(this.onError);
  };

  handleSelectedPage = (page) => {
    this.setState(() => ({ selectedPage: page }));
  };

  render() {
    const { genresList } = this.state;
    const page =
      this.state.selectedPage === "search" ? (
        <ServiceProvider value={genresList}>
          <SearchPage
            setSearchText={this.setSearchText}
            getFimList={this.getFilmList}
            addAverange={this.addAverange}
            options={this.state}
          />
        </ServiceProvider>
      ) : (
        <ServiceProvider value={genresList}>
          <RatedPage options={this.state} addAverange={this.addAverange} />
        </ServiceProvider>
      );
    return (
      <section className="container">
        <MainHeader handleSelectedPage={this.handleSelectedPage} />
        <NoInternetConnection />
        {page}
      </section>
    );
  }
}
