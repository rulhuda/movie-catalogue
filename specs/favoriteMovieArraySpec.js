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
};

describe('Favorite Movie Array Contract Test Implementation', () => {
  afterEach(() => favoriteMovies = []);

  itsActsAsFavoriteMovieModel(FavoriteMovieArray);
});
