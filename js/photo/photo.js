// eslint-disable-next-line no-unused-vars
import * as comment from './comment.js';

// eslint-disable-next-line no-unused-vars
import * as hashtag from './hashtag.js';

import {getRandomInteger} from '../utils/utils.js';
import {createComments} from './comment.js';

export const PHOTOS_NUMBER = 25;

export const createPhoto = (quantity) => new Array(quantity).fill(null).map((photo, index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты',
  likes: getRandomInteger(15,200),
  comments: createComments(getRandomInteger(1, 4)),
}));
