import {createPhotoElement} from './photo/photo.js';
import {bigPicturePopup} from './big-picture-popup.js';
import {fetchPhotos} from './api.js';
import './form/image-upload-form.js';
import './form/scale.js';
import './form/slider.js';

const picturesFragment = document.createDocumentFragment();
const picturesContainerElement = document.querySelector('.pictures');
const pageFooterElement = document.querySelector('.page-footer');

const renderPhotos = (photos)=> {
  photos.forEach((photo) => {
    const pictureElement = createPhotoElement(photo);
    bigPicturePopup(pictureElement, photo);
    picturesFragment.appendChild(pictureElement);
  });
  picturesContainerElement.appendChild(picturesFragment);
};

const getFetchErrorHTML = (errorMessage) => `
    <div class="error__inner error__inner--fetch">
        <h2 class="error__title">Ошибка загрузки фото</h2>
        <p>${errorMessage}</p>
    </div>`;

const onFetchError = (err) => pageFooterElement.insertAdjacentHTML('beforebegin', getFetchErrorHTML(err));

fetchPhotos(renderPhotos, onFetchError);
