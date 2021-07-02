import {createPhotoElement} from './photo/photo.js';
import {bigPicturePopup} from './big-picture-popup.js';
import {fetchPhotos, onFetchError} from './api.js';
import './form/image-upload-form.js';
import './form/scale.js';
import './form/slider.js';

const picturesFragment = document.createDocumentFragment();
const picturesContainerElement = document.querySelector('.pictures');

const renderPhotos = (photos)=> {
  photos.forEach((photo) => {
    const pictureElement = createPhotoElement(photo);
    bigPicturePopup(pictureElement, photo);
    picturesFragment.appendChild(pictureElement);
  });
  picturesContainerElement.appendChild(picturesFragment);
};

fetchPhotos(renderPhotos, onFetchError);
