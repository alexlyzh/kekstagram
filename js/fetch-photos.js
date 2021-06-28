import {createPhoto, PHOTOS_NUMBER} from './photo/photo.js';
import {bigPicturePopup} from './big-picture-popup.js';

const photos = new Array(PHOTOS_NUMBER).fill(null).map((photo, i) => createPhoto(i));
const picturesContainerElement = document.querySelector('.pictures');
const picturesFragment = document.createDocumentFragment();

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

photos.forEach( (photo) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  bigPicturePopup(pictureElement, photo);
  picturesFragment.appendChild(pictureElement);
});

picturesContainerElement.appendChild(picturesFragment);
