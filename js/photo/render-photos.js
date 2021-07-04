import {createPhotoElement} from './photo.js';
import {bigPicturePopup} from '../big-picture-popup.js';

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

export {renderPhotos, picturesContainerElement};
