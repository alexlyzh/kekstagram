import {getRandomUniqueIntegerList} from './utils/utils.js';
import {renderPhotos, picturesContainerElement} from './photo/render-photos.js';
import {debounce} from './utils/debounce.js';

const filtersForm = document.querySelector('.img-filters__form');
const filterButtons = document.querySelectorAll('.img-filters__button');
const defaultButton = filtersForm.querySelector('#filter-default');
const randomButton = filtersForm.querySelector('#filter-random');// eslint-disable-line no-unused-vars
const discussedButton = filtersForm.querySelector('#filter-discussed');// eslint-disable-line no-unused-vars
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

const setImgFilters = (photos) => {
  let photosMaxId = PHOTOS_MIN_ID;
  photos.forEach((photo) => photosMaxId = Math.max(photo.id, photosMaxId));

  const changeFilter = (evt, renderingPhotos) => {
    console.log(evt, renderingPhotos);
    if (selectedFilter !== evt.target.id) {
      removeCurrentPhotos();
      renderPhotos(renderingPhotos);
      changeButtonsStyle(evt);
      selectedFilter = evt.target.id;
    }
  };

  const setDefaultFilter = (cb) => {
    defaultButton.addEventListener('click',(evt) => {
      cb(evt, photos);
    });
  };

  const setRandomFilter = (cb) => {
    randomButton.addEventListener('click', (evt) => {
      const uniqueIntegerList = getRandomUniqueIntegerList(PHOTOS_MIN_ID, photosMaxId, RANDOM_PHOTOS_NUMBER);
      const randomPhotos = photos.filter((photo) => uniqueIntegerList.includes(photo.id));
      cb(evt, randomPhotos);
    });
  };

  const setDiscussedFilter = (cb) => {
    discussedButton.addEventListener('click', (evt) => {
      const photosCloned = [...photos];
      photosCloned.sort((a, b) => b.comments.length - a.comments.length);
      cb(evt, photosCloned);
    });
  };

  setDefaultFilter(debounce(changeFilter, RERENDER_DELAY));
  setRandomFilter(debounce(changeFilter, RERENDER_DELAY));
  setDiscussedFilter(debounce(changeFilter, RERENDER_DELAY));
};

export {setImgFilters};
