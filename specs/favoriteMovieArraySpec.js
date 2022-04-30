/* eslint-disable no-return-assign */
import { itsActsAsFavoriteMovieModel } from './contract/favoriteMovieContract';

let favoriteMovies = [];

const FavoriteMovieArray = {

  getMovie(id) {
    if (!id) {
      return;
    }

    return favoriteMovies.find((movie) => movie.id === id);
  },

  getAllMovies() {
    return favoriteMovies;
  },

  putMovie(movie) {
    if (!movie.hasOwnProperty('id')) {
      return;
    }

    if (this.getMovie(movie.id)) {
      return;
    }

    favoriteMovies.push(movie);
  },

  deleteMovie(id) {
    favoriteMovies = favoriteMovies.filter((movie) => movie.id !== id);
  },

  searchMovies(query) {
    return this.getAllMovies()
      .filter((movie) => {
        const loweredCaseMovieTitle = (movie.title || '-').toLowerCase();
        const jammedMovieTitle = loweredCaseMovieTitle.replace(/\s/g, '');

        const loweredCaseQuery = query.toLowerCase();
        const jammedQuery = loweredCaseQuery.replace(/\s/g, '');

        return jammedMovieTitle.indexOf(jammedQuery) !== -1;
      });
  },
};

describe('Favorite Movie Array Contract Test Implementation', () => {
  afterEach(() => favoriteMovies = []);

  itsActsAsFavoriteMovieModel(FavoriteMovieArray);
});
