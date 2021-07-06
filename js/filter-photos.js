import {getRandomUniqueIntegerList} from './utils/utils.js';
import {renderPhotos, picturesContainerElement} from './photo/render-photos.js';
import {debounce} from './utils/debounce.js';

const filtersForm = document.querySelector('.img-filters__form');
const filterButtons = document.querySelectorAll('.img-filters__button');
const defaultButton = filtersForm.querySelector('#filter-default');
const randomButton = filtersForm.querySelector('#filter-random');
const discussedButton = filtersForm.querySelector('#filter-discussed');
const RERENDER_DELAY = 500;// eslint-disable-line no-unused-vars
const PHOTOS_MIN_ID = 0;
const RANDOM_PHOTOS_NUMBER = 10;
const DEFAULT_FILTER = 'filter-default';
let selectedFilter = DEFAULT_FILTER;

const changeButtonsStyle = (evt) => filterButtons.forEach((btn) => btn.classList.toggle('img-filters__button--active', btn === evt.target));

const removeCurrentPhotos = () => {
  const photos = picturesContainerElement.querySelectorAll('.picture');
  photos.forEach((photo) => photo.remove());
};

const changeFilter = (evt, renderingPhotos) => {
  if (selectedFilter !== evt.target.id) {
    removeCurrentPhotos();
    renderPhotos(renderingPhotos);
    changeButtonsStyle(evt);
    selectedFilter = evt.target.id;
  }
};

const selectDefaultFilter = (evt) => {
  changeFilter(evt, photos);
};

const selectDiscussedFilter = (evt) => {
  const photosCloned = [...photos];
  photosCloned.sort((a, b) => b.comments.length - a.comments.length);
  changeFilter(evt, photosCloned);
};

const setImgFilters = (photos) => {
  let photosMaxId = PHOTOS_MIN_ID;
  photos.forEach((photo) => photosMaxId = Math.max(photo.id, photosMaxId));

  const selectRandomFilter = (evt) => {
    const uniqueIntegerList = getRandomUniqueIntegerList(PHOTOS_MIN_ID, photosMaxId, RANDOM_PHOTOS_NUMBER);
    const randomPhotos = photos.filter((photo) => uniqueIntegerList.includes(photo.id));
    changeFilter(evt, randomPhotos);
  };

  defaultButton.addEventListener('click', debounce(selectDefaultFilter));
  randomButton.addEventListener('click', debounce(selectRandomFilter));
  discussedButton.addEventListener('click', debounce(selectDiscussedFilter));
};

export {setImgFilters};
