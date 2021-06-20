import {getRandomInteger} from '../utils/utils.js';
import {createComments} from './comment.js';

const PHOTOS_NUMBER = 25;

const createPhoto = (quantity) => new Array(quantity).fill(null).map((photo, index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты',
  likes: getRandomInteger(15,200),
  comments: createComments(getRandomInteger(1, 4)),
}));

export {PHOTOS_NUMBER, createPhoto};
