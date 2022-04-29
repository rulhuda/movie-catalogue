/* eslint-disable import/prefer-default-export */
import LikeButtonPresenter from '../../src/scripts/utils/like-button-presenter';

const createLikeButtonPresenterWithMovie = async (movie) => {
  await LikeButtonPresenter.init({
    likeButtonPresenter: document.querySelector('#likeButtonContainer'),
    movie,
  });
};

export { createLikeButtonPresenterWithMovie };
