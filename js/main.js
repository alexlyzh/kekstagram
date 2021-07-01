import {createPhotoElement, fetchPhotos, getFetchErrorHTML} from './photo/photo.js';
import {bigPicturePopup} from './big-picture-popup.js';
import './form/image-upload-form.js';
import './form/scale.js';
import './form/slider.js';

const picturesContainerElement = document.querySelector('.pictures');
const pageFooterElement = document.querySelector('.page-footer');
const picturesFragment = document.createDocumentFragment();

fetchPhotos((photos)=> {
  photos.forEach((photo) => {
    const pictureElement = createPhotoElement(photo);
    bigPicturePopup(pictureElement, photo);
    picturesFragment.appendChild(pictureElement);
  });
  picturesContainerElement.appendChild(picturesFragment);
},(err) => pageFooterElement.insertAdjacentHTML('beforebegin', getFetchErrorHTML(err)));
