import plug from "./theMovie.svg";

export default class FilmServece {
  src = { plug };
  _apiBase = "https://api.themoviedb.org/3";
  _apiKey = "api_key=6c8fa39627c89b3c87ca11fd477aab8c&";
  _apiImageBase = "https://image.tmdb.org/t/p/w500";
  constructor() {}
  async getResource(url, type) {
    let res = "";
    if (type === "genres") {
      res = await fetch(`${this._apiBase}${url}`);
    } else {
      res = await fetch(`${this._apiBase}/search/movie?${this._apiKey}&${url}`);
    }
    if (!res.ok) throw new Error(`Could not fetch ${url}`);
    return res.json();
  }
  async getFilms(filmName = "return", page = 1) {
    const res = await this.getResource(`page=${page}&query=${filmName}`);
    return res;
  }
  getImage(path) {
    if (path) {
      return `${this._apiImageBase}${path}`;
    }
    return this.src.plug;
  }
  getRatedMovies() {
    return JSON.parse(localStorage.getItem("dataAverage"));
  }
  setRatedMovies(filmList) {
    localStorage.setItem("dataAverage", JSON.stringify(filmList));
  }
  async getGenres() {
    const res = await this.getResource(
      `/genre/movie/list?${this._apiKey}language=en-US`,
      "genres"
    );
    return res.genres;
  }
}
