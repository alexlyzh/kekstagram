import {getRandomInteger} from '../utils/utils.js';
import {createComments} from './comment.js';

const PHOTOS_NUMBER = 25;
const MIN_LIKES_NUMBER = 15;
const MAX_LIKES_NUMBER = 200;
const MIN_COMMENTS_NUMBER = 0;
const MAX_COMMENTS_NUMBER = 25;

const createPhoto = (quantity) => new Array(quantity).fill(null).map((photo, index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты',
  likes: getRandomInteger(MIN_LIKES_NUMBER,MAX_LIKES_NUMBER),
  comments: createComments(getRandomInteger(MIN_COMMENTS_NUMBER, MAX_COMMENTS_NUMBER)),
}));

export {PHOTOS_NUMBER, createPhoto};
