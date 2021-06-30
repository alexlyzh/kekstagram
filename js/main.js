import {createPhotoElement, createPhotoObject, PHOTOS_NUMBER} from './photo/photo.js';
import {bigPicturePopup} from './big-picture-popup.js';
import './form/image-upload-form.js';
import './form/scale.js';
import './form/slider.js';

const picturesContainerElement = document.querySelector('.pictures');
const picturesFragment = document.createDocumentFragment();
const photos = new Array(PHOTOS_NUMBER).fill(null).map((photo, i) => createPhotoObject(i));

photos.forEach( (photo) => {
  const pictureElement = createPhotoElement(photo);
  bigPicturePopup(pictureElement, photo);
  picturesFragment.appendChild(pictureElement);
});

picturesContainerElement.appendChild(picturesFragment);
