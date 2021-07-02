import {bigPicturePopup} from '../big-picture-popup.js';

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const picturesFragment = document.createDocumentFragment();
const picturesContainerElement = document.querySelector('.pictures');
const pageFooterElement = document.querySelector('.page-footer');

const fetchPhotos = (onSuccess, onFail) => {
  fetch('https://23.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then((photos) => onSuccess(photos))
    .catch((err) => onFail(err));
};

const createPhotoElement = (photoObject) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = photoObject.url;
  pictureElement.querySelector('.picture__comments').textContent = photoObject.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = photoObject.likes;
  return pictureElement;
};

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

export {fetchPhotos, createPhotoElement, renderPhotos,onFetchError, getFetchErrorHTML};
