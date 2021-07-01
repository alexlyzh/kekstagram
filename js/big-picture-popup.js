import {isEscKeydown, hideElement, showElement} from './utils/utils.js';
import {renderComments, COMMENTS_RENDER_STEP} from './photo/comment.js';

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImgElement = bigPictureElement.querySelector('.big-picture__img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const socialCommentCountElement = bigPictureElement.querySelector('.social__comment-count');
const socialCommentsElement = bigPictureElement.querySelector('.social__comments');
const socialDescriptionElement = bigPictureElement.querySelector('.social__caption');
const btnBigPictureCloseElement = bigPictureElement.querySelector('.big-picture__cancel');
const commentsRenderedElement = bigPictureElement.querySelector('.comments-rendered');
const commentsCountElement = bigPictureElement.querySelector('.comments-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const myCommentInputElement = bigPictureElement.querySelector('.social__footer-text');

const onCommentLoaderClick = () => {
  const commentsCollection = socialCommentsElement.querySelectorAll('.social__comment');
  const commentsNumber = commentsCollection.length;
  const renderedCommentsCount = Number(socialCommentsElement.dataset.renderedComments);
  const renderStep = Math.min(commentsNumber, renderedCommentsCount + COMMENTS_RENDER_STEP);

  let commentsAdded = 0;
  for (let i = renderedCommentsCount; i < renderStep; i++) {
    commentsCollection[i].classList.remove('hidden');
    commentsAdded++;
  }
  if (commentsNumber === renderedCommentsCount + commentsAdded) {
    hideElement(commentsLoaderElement);
  }
  commentsRenderedElement.textContent = renderedCommentsCount + commentsAdded;
  socialCommentsElement.dataset.renderedComments = renderedCommentsCount + commentsAdded;
};

const onBigPictureClose = () => {
  hideElement(bigPictureElement);
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPicEscKeydown); // eslint-disable-line no-use-before-define
};

const onBigPictureOpen = () => {
  showElement(bigPictureElement);
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onBigPicEscKeydown); // eslint-disable-line no-use-before-define
  btnBigPictureCloseElement.addEventListener('click', onBigPictureClose);
  commentsLoaderElement.addEventListener('click', onCommentLoaderClick);
};

const onBigPicEscKeydown = (evt) => {
  if (isEscKeydown(evt) && !(document.activeElement === myCommentInputElement)) {
    evt.preventDefault();
    onBigPictureClose();
  }
};

const checkCommentsNumber = (number) => {
  if (number > COMMENTS_RENDER_STEP) {
    commentsRenderedElement.textContent = COMMENTS_RENDER_STEP;
    showElement(commentsLoaderElement);
  } else {
    commentsRenderedElement.textContent = number;
    hideElement(commentsLoaderElement);
  }

  socialCommentCountElement.classList.toggle('hidden', number === 0);
  socialCommentsElement.classList.toggle('hidden', number === 0);
};

const bigPicturePopup = (photoEl, photoObj) => {
  photoEl.addEventListener('click', (evt) => {
    evt.preventDefault();
    socialCommentsElement.textContent = '';
    bigPictureImgElement.querySelector('.big-picture__img img').src = photoObj.url;
    likesCountElement.textContent = photoObj.likes;
    checkCommentsNumber(photoObj.comments.length);
    commentsCountElement.textContent = photoObj.comments.length;
    socialDescriptionElement.textContent = photoObj.description;
    renderComments(photoObj.comments, socialCommentsElement);
    onBigPictureOpen();
  });
};

export {bigPicturePopup};
