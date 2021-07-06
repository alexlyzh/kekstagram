import {getRandomUniqueIntegerList} from './utils/utils.js';
import {renderPhotos, picturesContainerElement} from './photo/render-photos.js';
import {debounce} from './utils/debounce.js';

const filtersForm = document.querySelector('.img-filters__form');
const filterButtons = document.querySelectorAll('.img-filters__button');
const defaultButton = filtersForm.querySelector('#filter-default');
const randomButton = filtersForm.querySelector('#filter-random');
const discussedButton = filtersForm.querySelector('#filter-discussed');
const PHOTOS_MIN_ID = 0;
const RANDOM_PHOTOS_NUMBER = 10;

const changeButtonsStyle = (evt) => filterButtons.forEach((btn) => btn.classList.toggle('img-filters__button--active', btn === evt.target));

const removeCurrentPhotos = (container) => {
  const photos = container.querySelectorAll('.picture');
  photos.forEach((photo) => photo.remove());
};

const setImgFilters = (photos) => {
  let selectedFilter = 'default';
  let photosMaxId = PHOTOS_MIN_ID;
  photos.forEach((photo) => photosMaxId = Math.max(photo.id, photosMaxId));

  const onDefaultBtnClick = (evt) =>  {
    if (selectedFilter !== 'default') {
      removeCurrentPhotos(picturesContainerElement);
      changeButtonsStyle(evt);
      renderPhotos(photos);
      selectedFilter = 'default';
    }
  };

  const onRandomBtnClick = (evt) => {
    if (selectedFilter !== 'random') {
      removeCurrentPhotos(picturesContainerElement);
      changeButtonsStyle(evt);
      const uniqueIntegerList = getRandomUniqueIntegerList(PHOTOS_MIN_ID, photosMaxId, RANDOM_PHOTOS_NUMBER);
      const randomPhotos = photos.filter((photo) => uniqueIntegerList.includes(photo.id));
      renderPhotos(randomPhotos);
      selectedFilter = 'random';
    }
  };

  const onDiscussedBtnClick = (evt) => {
    if (selectedFilter !== 'discussed') {
      removeCurrentPhotos(picturesContainerElement);
      changeButtonsStyle(evt);
      const photosCloned = [...photos];
      photosCloned.sort((a, b) => b.comments.length - a.comments.length);
      renderPhotos(photosCloned);
      selectedFilter = 'discussed';
    }
  };

  defaultButton.addEventListener('click', debounce(onDefaultBtnClick));
  randomButton.addEventListener('click', debounce(onRandomBtnClick));
  discussedButton.addEventListener('click', debounce(onDiscussedBtnClick));
};

export {setImgFilters};
