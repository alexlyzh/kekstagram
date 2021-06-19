import {getRandomInteger} from '../utils/utils.js';

export const NAMES = [
  'Иван','Хуан Себастьян','Мария','Кристоф','Виктор','Юлия','Люпита','Вашингтон','Саша','Абрам','Аваз','Август','Авдей','Автандил',
  'Адам','Адис','Адольф','Адриан','Азарий','Аким','Алан','Александр','Алексей','Альберт','Альфред','Амадей','Амаяк','Антон',
];

export const PHRASES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

export const createComments = (quantity) => new Array(quantity).fill(null).map((comment, index) => (
  {
    id: index + 1,
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: PHRASES[getRandomInteger(1, PHRASES.length - 1)],
    name: NAMES[getRandomInteger(1, NAMES.length - 1)],
  }));

const createCommentHTML = ({avatar, name, message}) => `
      <li class="social__comment">
          <img
              class="social__picture"
              src="${avatar}"
              alt="${name}"
              width="35" height="35">
          <p class="social__text">${message}</p>
      </li>`;

export const renderComments = (comments, container) => {
  let commentsHTML = '';
  comments.forEach( (comment) => {
    commentsHTML += createCommentHTML(comment);
  });
  container.insertAdjacentHTML('afterbegin', commentsHTML);
};
