import {getRandomInteger} from '../utils/utils.js';

const COMMENTS_RENDER_STEP = 5;

const NAMES = [
  'Иван','Хуан Себастьян','Мария','Кристоф','Виктор','Юлия','Люпита','Вашингтон','Саша','Абрам','Аваз','Август','Авдей','Автандил',
  'Адам','Адис','Адольф','Адриан','Азарий','Аким','Алан','Александр','Алексей','Альберт','Альфред','Амадей','Амаяк','Антон',
];

const PHRASES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const createComments = (quantity) => new Array(quantity).fill(null).map((comment, i) => (
  {
    id: i + 1,
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: PHRASES[getRandomInteger(1, PHRASES.length - 1)],
    name: NAMES[getRandomInteger(1, NAMES.length - 1)],
  }));

const createCommentHTML = ({avatar, name, message}, index) => `
      <li class="social__comment${index > (COMMENTS_RENDER_STEP - 1) ? ' hidden' : ''}">
          <img
              class="social__picture"
              src="${avatar}"
              alt="${name}"
              width="35" height="35">
          <p class="social__text">${message}</p>
      </li>`;

const renderComments = (comments, container) => {
  let commentsHTML = '';
  comments.forEach( (comment, i) => {
    commentsHTML += createCommentHTML(comment, i);
  });
  container.insertAdjacentHTML('afterbegin', commentsHTML);
  comments.length >= COMMENTS_RENDER_STEP ? container.dataset.renderedComments = COMMENTS_RENDER_STEP : container.dataset.renderedComments = comments.length;
};


export {NAMES, PHRASES, createComments, renderComments, COMMENTS_RENDER_STEP};
