import {getRandomUniqueIntegerList} from './utils/utils.js';
import {renderPhotos, picturesContainerElement} from './photo/render-photos.js';
import {debounce} from './utils/debounce.js';

const RERENDER_DELAY = 500;
const PHOTOS_MIN_ID = 0;
const RANDOM_PHOTOS_NUMBER = 10;
const DEFAULT_FILTER = 'filter-default';
const filtersFormElement = document.querySelector('.img-filters__form');
const filterButtonElements = document.querySelectorAll('.img-filters__button');
let selectedFilter = DEFAULT_FILTER;

const changeButtonsStyle = (evt) => filterButtonElements.forEach((btn) => btn.classList.toggle('img-filters__button--active', btn === evt.target));

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

const setImgFilters = (photos) => {
  let photosMaxId = PHOTOS_MIN_ID;
  photos.forEach((photo) => photosMaxId = Math.max(photo.id, photosMaxId));

  const setDefaultFilter = (evt) => {
    changeFilter(evt, photos);
  };

  const setRandomFilter = (evt) => {
    const uniqueIntegerList = getRandomUniqueIntegerList(PHOTOS_MIN_ID, photosMaxId, RANDOM_PHOTOS_NUMBER);
    const randomPhotos = photos.filter((photo) => uniqueIntegerList.includes(photo.id));
    changeFilter(evt, randomPhotos);
  };

  const setDiscussedFilter = (evt) => {
    const photosCloned = [...photos];
    photosCloned.sort((a, b) => b.comments.length - a.comments.length);
    changeFilter(evt, photosCloned);
  };

  const onFilterFormClick = (evt) => {
    switch (evt.target.id) {
      case 'filter-default':
        setDefaultFilter(evt);
        break;
      case 'filter-random':
        setRandomFilter(evt);
        break;
      case 'filter-discussed':
        setDiscussedFilter(evt);
    }
  };

  filtersFormElement.addEventListener('click', debounce(onFilterFormClick, RERENDER_DELAY));
};

export {setImgFilters};
