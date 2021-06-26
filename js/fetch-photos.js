import {createPhoto, PHOTOS_NUMBER} from './photo/photo.js';
import {bigPicturePopup} from './big-picture-popup.js';

const fetchPhotos = () => {
  const photos = createPhoto(PHOTOS_NUMBER);
  const picturesContainer = document.querySelector('.pictures');
  const picturesFragment = document.createDocumentFragment();

  const pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  photos.forEach( (photo) => {
    const picture = pictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = photo.url;
    picture.querySelector('.picture__comments').textContent = photo.comments.length;
    picture.querySelector('.picture__likes').textContent = photo.likes;
    bigPicturePopup(picture, photo);
    picturesFragment.appendChild(picture);
  });

  picturesContainer.appendChild(picturesFragment);
};

fetchPhotos();
