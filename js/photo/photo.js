import {getRandomInteger} from '../utils/utils.js';
import {createComments} from './comment.js';

const PHOTOS_NUMBER = 25;
const MIN_LIKES_NUMBER = 15;
const MAX_LIKES_NUMBER = 200;
const MIN_COMMENTS_NUMBER = 0;
const MAX_COMMENTS_NUMBER = 25;
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createPhotoObject = (i) => ({
  id: i + 1,
  url: `photos/${i + 1}.jpg`,
  description: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты',
  likes: getRandomInteger(MIN_LIKES_NUMBER,MAX_LIKES_NUMBER),
  comments: createComments(getRandomInteger(MIN_COMMENTS_NUMBER, MAX_COMMENTS_NUMBER)),
});

const createPhotoElement = (photoObject) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = photoObject.url;
  pictureElement.querySelector('.picture__comments').textContent = photoObject.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = photoObject.likes;
  return pictureElement;
};

export {PHOTOS_NUMBER, createPhotoObject, createPhotoElement};
