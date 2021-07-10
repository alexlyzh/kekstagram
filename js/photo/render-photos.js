import {createPhotoElement} from './photo.js';
import {setBigPicturePopup} from '../set-big-picture-popup.js';

const picturesFragment = document.createDocumentFragment();
const picturesContainerElement = document.querySelector('.pictures');

const renderPhotos = (photos)=> {
  photos.forEach((photo) => {
    const pictureElement = createPhotoElement(photo);
    setBigPicturePopup(pictureElement, photo);
    picturesFragment.appendChild(pictureElement);
  });
  picturesContainerElement.appendChild(picturesFragment);
};

export {renderPhotos, picturesContainerElement};
