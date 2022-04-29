/* eslint-disable no-unused-vars */
import FavoriteMovieIdb from '../src/scripts/data/favorite-movie-idb';
import FavoriteMovieSearchPresenter from '../src/scripts/views/pages/liked-movies/favorite-movie-search-presenter';

describe('Searching movies', () => {
  let presenter;

  const searchMovies = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = 'film a';
    queryElement.dispatchEvent(new Event('change'));
  };

  const setMovieSearchContainer = () => {
    document.body.innerHTML = `
      <div id="movie-search-container">
        <input id="query" type="text">
        <div class="movie-result-container">
          <ul class="movies">
          </ul>
        </div>
      </div>
    `;
  };

  const constructPresenter = () => {
    spyOn(FavoriteMovieIdb, 'searchMovies');
    presenter = new FavoriteMovieSearchPresenter({ favoriteMovies: FavoriteMovieIdb });
  };

  beforeEach(() => {
    setMovieSearchContainer();
    constructPresenter();
  });

  it('should be able to capture the query typed by user', () => {
    searchMovies('film a');

    expect(presenter.latestQuery).toEqual('film a');
  });

  it('should ask the model to search for liked movies', () => {
    searchMovies('film a');

    expect(FavoriteMovieIdb.searchMovies).toHaveBeenCalledWith('film a');
  });
});
