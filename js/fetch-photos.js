import {createPhoto, PHOTOS_NUMBER} from './photo/photo.js';
import {zoomPhotoHandler} from './zoom-photo-handler.js';

export const fetchPhotos = () => {
  const photos = createPhoto(PHOTOS_NUMBER);
  const picturesContainer = document.querySelector('.pictures');
  const picturesFragment = document.createDocumentFragment();

  const pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  photos.forEach( (photo, ind) => {
    const picture = pictureTemplate.cloneNode(true);
    picture.children[0].src = photo.url;
    picture.children[1].children[0].textContent = photo.comments.length;
    picture.children[1].children[1].textContent = photo.likes.toString();
    zoomPhotoHandler(picture, photos[ind]);
    picturesFragment.appendChild(picture);
  });

  picturesContainer.appendChild(picturesFragment);
};
