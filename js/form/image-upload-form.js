import {isEscKeydown, hideElement, showElement} from '../utils/utils.js';
import {onScaleBiggerClick, onScaleSmallerClick, setDefaultImgScale} from './scale.js';
import {setDefaultImgFilter} from './slider.js';
import {showSubmitMessage} from './submit-result-popup.js';
import {sendFormData} from '../api.js';

const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAG_COUNT = 5;
const imageUploadFormElement = document.querySelector('.img-upload__form');
const inputFileElement = imageUploadFormElement.querySelector('#upload-file');
const scaleSmallerElement = document.querySelector('.scale__control--smaller');
const scaleBiggerElement = document.querySelector('.scale__control--bigger');
const uploadingImageElement = document.querySelector('.img-upload__preview img');
const imgUploadPopupElement = imageUploadFormElement.querySelector('.img-upload__overlay');
const btnImgUploadCloseElement = imageUploadFormElement.querySelector('#upload-cancel');
const commentInputElement = imageUploadFormElement.querySelector('.text__description');
const hashtagInputElement = document.querySelector('.text__hashtags');
const hashtagRegexp = new RegExp('^#[A-Za-zА-Яа-я0-9]{1,19}$');

const isImgUploadFormFieldActive = () => document.activeElement === hashtagInputElement || document.activeElement === commentInputElement;

const onHashtagInput = ()=> {
  let hashtags = hashtagInputElement.value.split(' ');
  hashtags.sort();
  hashtags = hashtags.map( (hashtag)=> hashtag.toLowerCase());
  let isEveryHashtagValid = true;
  let hashtagsMaxLength = 0;
  let hashtagDuplicatesCount = 0;

  for (let i = 0; i < hashtags.length; i++) {
    hashtagsMaxLength = Math.max(hashtagsMaxLength, hashtags[i].length);
    if (hashtags[i] === hashtags[i + 1]) {
      hashtagDuplicatesCount++;
    }
    isEveryHashtagValid = isEveryHashtagValid && hashtagRegexp.test(hashtags[i]);
  }

  if (hashtags.includes('#')) {
    hashtagInputElement.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
  } else if (!isEveryHashtagValid) {
    hashtagInputElement.setCustomValidity('Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.');
  } else if (hashtagsMaxLength > MAX_HASHTAG_LENGTH) {
    hashtagInputElement.setCustomValidity(`Максимальная длина одного хэш-тега ${MAX_HASHTAG_LENGTH} символов, включая решётку`);
  } else if (hashtags.length > MAX_HASHTAG_COUNT) {
    hashtagInputElement.setCustomValidity(`Нельзя указать больше чем ${MAX_HASHTAG_COUNT} хэш-тегов`);
  } else if (hashtagDuplicatesCount > 0) {
    hashtagInputElement.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды. Хэш-теги нечувствительны к регистру');
  } else {
    hashtagInputElement.setCustomValidity('');
  }

  hashtagInputElement.reportValidity();
};

const onImgUploadClose = () => {
  setDefaultImgScale();
  setDefaultImgFilter();
  hideElement(imgUploadPopupElement);
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onImgUploadEscKeydown); // eslint-disable-line no-use-before-define
  imageUploadFormElement.reset();
};

const onImgUploadOpen = () => {
  setDefaultImgScale();
  setDefaultImgFilter();
  showElement(imgUploadPopupElement);
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onImgUploadEscKeydown); // eslint-disable-line no-use-before-define
  scaleSmallerElement.addEventListener('click', onScaleSmallerClick);
  scaleBiggerElement.addEventListener('click', onScaleBiggerClick);
  btnImgUploadCloseElement.addEventListener('click', onImgUploadClose);
  hashtagInputElement.addEventListener('input', onHashtagInput);
  imageUploadFormElement.addEventListener('submit', onImgUploadFormSubmit); // eslint-disable-line no-use-before-define
};

const onImgUploadEscKeydown = (evt) => {
  if (isEscKeydown(evt) && !isImgUploadFormFieldActive()) {
    evt.preventDefault();
    onImgUploadClose();
  }
};

const onFormSubmitSuccess = () => {
  showSubmitMessage('success');
  onImgUploadClose();
};

const onFormSubmitError = () => {
  showSubmitMessage('error');
  onImgUploadClose();
};

const onImgUploadFormSubmit = (evt) => {
  evt.preventDefault();
  sendFormData(
    onFormSubmitSuccess,
    onFormSubmitError,
    new FormData(evt.target));
};

inputFileElement.addEventListener('change', onImgUploadOpen);

export {uploadingImageElement};
