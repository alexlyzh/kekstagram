import {fetchPhotos} from './api.js';
import {setImgFilters} from './filter-photos.js';
import {renderPhotos} from './photo/render-photos.js';
import './form/image-upload-form.js';
import './form/scale.js';
import './form/slider.js';
import './form/user-image-reader.js';

const pageFooterElement = document.querySelector('.page-footer');
const filtersElement = document.querySelector('.img-filters');

const onFetchSuccess = (photos) => {
  renderPhotos(photos);
  setImgFilters(photos);
  filtersElement.classList.remove('img-filters--inactive');
};

const getFetchErrorHTML = (errorMessage) => `
    <div class="error__inner error__inner--fetch">
        <h2 class="error__title">Ошибка загрузки фото</h2>
        <p>${errorMessage}</p>
    </div>`;

const onFetchError = (err) => pageFooterElement.insertAdjacentHTML('beforebegin', getFetchErrorHTML(err));

fetchPhotos(onFetchSuccess, onFetchError);
