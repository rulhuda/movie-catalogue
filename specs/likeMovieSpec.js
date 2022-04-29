import FavoriteMovieIdb from '../src/scripts/data/favorite-movie-idb';
import * as TestFactories from './helpers/testFactories';

describe('Liking A Movie', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

  it('Should show the like button when the movies has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithMovie({ id: 1 });

    expect(document.querySelector('[aria-label="like this movie"]')).toBeTruthy();
  });

  it('Should not show the unlike button when the movies has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithMovie({ id: 1 });

    expect(document.querySelector('[aria-label="unlike this movie"]')).toBeFalsy();
  });

  it('Should be able to like the movie', async () => {
    await TestFactories.createLikeButtonPresenterWithMovie({ id: 1 });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const movie = await FavoriteMovieIdb.getMovie(1);

    expect(movie).toEqual({ id: 1 });

    FavoriteMovieIdb.deleteMovie(1);
  });

  it('Should not add a movie again when its already liked', async () => {
    await TestFactories.createLikeButtonPresenterWithMovie({ id: 1 });

    await FavoriteMovieIdb.putMovie({ id: 1 });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(await FavoriteMovieIdb.getAllMovies()).toEqual([{ id: 1 }]);

    FavoriteMovieIdb.deleteMovie(1);
  });

  it('Should not add a movie again when it has no id', async () => {
    await TestFactories.createLikeButtonPresenterWithMovie({});

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(await FavoriteMovieIdb.getAllMovies()).toEqual([]);
  });
});
