import {isEscKeydown, hideElement, showElement} from './utils/utils.js';
import {renderComments, COMMENTS_RENDER_STEP} from './photo/comment.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialDescription = bigPicture.querySelector('.social__caption');
const btnBigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const commentsRendered = bigPicture.querySelector('.comments-rendered');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const myCommentInput = bigPicture.querySelector('.social__footer-text');

const onCommentLoaderClick = () => {
  const commentsCollection = socialComments.querySelectorAll('.social__comment');
  const commentsNumber = commentsCollection.length;
  const renderedCommentsCount = Number(socialComments.dataset.renderedComments);
  const renderStep = Math.min(commentsNumber, renderedCommentsCount + COMMENTS_RENDER_STEP);

  let commentsAdded = 0;
  for (let i = renderedCommentsCount; i < renderStep; i++) {
    commentsCollection[i].classList.remove('hidden');
    commentsAdded++;
  }
  if (commentsNumber === renderedCommentsCount + commentsAdded) {
    hideElement(commentsLoader);
  }
  commentsRendered.textContent = renderedCommentsCount + commentsAdded;
  socialComments.dataset.renderedComments = renderedCommentsCount + commentsAdded;
};

const onBigPictureClose = () => {
  hideElement(bigPicture);
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPicEscKeydown); // eslint-disable-line no-use-before-define
  btnBigPictureClose.removeEventListener('click', onBigPictureClose);
  commentsLoader.removeEventListener('click', onCommentLoaderClick);
};

const onBigPictureOpen = () => {
  showElement(bigPicture);
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onBigPicEscKeydown); // eslint-disable-line no-use-before-define
  btnBigPictureClose.addEventListener('click', onBigPictureClose);
  commentsLoader.addEventListener('click', onCommentLoaderClick);
};

const onBigPicEscKeydown = (evt) => {
  if (isEscKeydown(evt) && !(document.activeElement === myCommentInput)) {
    evt.preventDefault();
    onBigPictureClose();
  }
};

const checkCommentsNumber = (number) => {
  if (number >= COMMENTS_RENDER_STEP) {
    commentsRendered.textContent = COMMENTS_RENDER_STEP;
    showElement(commentsLoader);
  } else {
    commentsRendered.textContent = number;
    hideElement(commentsLoader);
  }

  socialCommentCount.classList.toggle('hidden', number === 0);
  socialComments.classList.toggle('hidden', number === 0);
};

const bigPicturePopup = (photoEl, photoObj) => {
  photoEl.addEventListener('click', (evt) => {
    evt.preventDefault();
    socialComments.textContent = '';
    bigPictureImg.querySelector('.big-picture__img img').src = photoObj.url;
    likesCount.textContent = photoObj.likes;
    checkCommentsNumber(photoObj.comments.length);
    commentsCount.textContent = photoObj.comments.length;
    socialDescription.textContent = photoObj.description;
    renderComments(photoObj.comments, socialComments);
    onBigPictureOpen();
  });
};

export {bigPicturePopup};
