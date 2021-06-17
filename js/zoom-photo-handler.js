import {isEscKeydown, hideElement, unhideElement} from './utils/utils.js';

export const zoomPhotoHandler = (photoEl, photoObj) => {
  const bigPicture = document.querySelector('.big-picture');
  const bigPictureImg = bigPicture.querySelector('.big-picture__img');
  const likesCount = bigPicture.querySelector('.likes-count');
  const commentsCount = bigPicture.querySelector('.comments-count');
  const socialComments = bigPicture.querySelector('.social__comments');
  const socialDescription = bigPicture.querySelector('.social__caption');
  const closeBigPicture = bigPicture.querySelector('.big-picture__cancel');
  const socialCommentCount = bigPicture.querySelector('.social__comment-count');
  const commentsLoader = bigPicture.querySelector('.comments-loader');
  hideElement(socialCommentCount);
  hideElement(commentsLoader);

  photoEl.addEventListener('click', (evt) => {
    evt.preventDefault();
    socialComments.innerHTML = '';
    bigPictureImg.children[0].src = photoObj.url;
    likesCount.textContent = photoObj.likes.toString();
    commentsCount.textContent = photoObj.comments.length;
    socialDescription.textContent = photoObj.description;

    let commentsHTML = '';
    photoObj.comments.forEach( (comment) => {
      commentsHTML += `
      <li class="social__comment">
          <img
              class="social__picture"
              src="${comment.avatar}"
              alt="${comment.name}"
              width="35" height="35">
          <p class="social__text">${comment.message}</p>
      </li>`;
    });
    socialComments.insertAdjacentHTML('afterbegin', commentsHTML);

    unhideElement(bigPicture);
    document.body.classList.add('modal-open');
  });

  closeBigPicture.addEventListener('click', () => {
    hideElement(bigPicture);
    document.body.classList.remove('modal-open');
  });
  document.addEventListener('keydown', (evt) => {
    if (isEscKeydown(evt) && !bigPicture.classList.contains('hidden')) {
      hideElement(bigPicture);
      document.body.classList.remove('modal-open');
    }
  });
};

