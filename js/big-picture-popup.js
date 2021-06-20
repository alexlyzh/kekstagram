import {isEscKeydown, hideElement, showElement} from './utils/utils.js';
import {renderComments} from './photo/comment.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialDescription = bigPicture.querySelector('.social__caption');
const btnBigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const myCommentInput = bigPicture.querySelector('.social__footer-text');
hideElement(socialCommentCount);
hideElement(commentsLoader);

const onBigPictureClose = () => {
  hideElement(bigPicture);
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPicEscKeydown); // eslint-disable-line no-use-before-define
  btnBigPictureClose.removeEventListener('click', onBigPictureClose);
};

const onBigPictureOpen = () => {
  showElement(bigPicture);
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onBigPicEscKeydown); // eslint-disable-line no-use-before-define
  btnBigPictureClose.addEventListener('click', onBigPictureClose);
};

const onBigPicEscKeydown = (evt) => {
  if (isEscKeydown(evt) && !(document.activeElement === myCommentInput)) {
    evt.preventDefault();
    onBigPictureClose();
  }
};

const bigPicturePopup = (photoEl, photoObj) => {
  photoEl.addEventListener('click', (evt) => {
    evt.preventDefault();
    socialComments.textContent = '';
    bigPictureImg.querySelector('.big-picture__img img').src = photoObj.url;
    likesCount.textContent = photoObj.likes;
    commentsCount.textContent = photoObj.comments.length;
    socialDescription.textContent = photoObj.description;
    renderComments(photoObj.comments, socialComments);
    onBigPictureOpen();
  });
};

export {bigPicturePopup};
