import {isEscKeydown, hideElement, showElement} from '../utils/utils.js';
import {setDefaultImgScale} from './scale.js';
import {setDefaultImgFilter} from './slider.js';

const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAG_COUNT = 5;
const imageUploadForm = document.querySelector('.img-upload__form');
const inputFile = imageUploadForm.querySelector('#upload-file');
const uploadingImage = document.querySelector('.img-upload__preview img');
const imgUploadPopup = imageUploadForm.querySelector('.img-upload__overlay');
const btnImgUploadClose = imageUploadForm.querySelector('#upload-cancel');
const inputComment = imageUploadForm.querySelector('.text__description');
const inputHashtag = document.querySelector('.text__hashtags');
const hashtagRegexp = new RegExp('^#[A-Za-zА-Яа-я0-9]{1,19}$');

const isImgUploadFormFieldActive = () => document.activeElement === inputHashtag || document.activeElement === inputComment;

const onHashtagInput = ()=> {
  let hashtags = inputHashtag.value.split(' ');
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
    inputHashtag.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
  } else if (!isEveryHashtagValid) {
    inputHashtag.setCustomValidity('Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.');
  } else if (hashtagsMaxLength > MAX_HASHTAG_LENGTH) {
    inputHashtag.setCustomValidity(`Максимальная длина одного хэш-тега ${MAX_HASHTAG_LENGTH} символов, включая решётку`);
  } else if (hashtags.length > MAX_HASHTAG_COUNT) {
    inputHashtag.setCustomValidity(`Нельзя указать больше чем ${MAX_HASHTAG_COUNT} хэш-тегов`);
  } else if (hashtagDuplicatesCount > 0) {
    inputHashtag.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды. Хэш-теги нечувствительны к регистру');
  } else {
    inputHashtag.setCustomValidity('');
  }

  inputHashtag.reportValidity();
};

const onImgUploadClose = () => {
  setDefaultImgFilter();
  hideElement(imgUploadPopup);
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onImgUploadEscKeydown); // eslint-disable-line no-use-before-define
  btnImgUploadClose.removeEventListener('click', onImgUploadClose);
  inputHashtag.removeEventListener('input', onHashtagInput);
};

const onImgUploadOpen = () => {
  setDefaultImgScale();
  setDefaultImgFilter();
  showElement(imgUploadPopup);
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onImgUploadEscKeydown); // eslint-disable-line no-use-before-define
  btnImgUploadClose.addEventListener('click', onImgUploadClose);
  inputHashtag.addEventListener('input', onHashtagInput);
};

const onImgUploadEscKeydown = (evt) => {
  if (isEscKeydown(evt) && !isImgUploadFormFieldActive()) {
    evt.preventDefault();
    imageUploadForm.reset();
    onImgUploadClose();
  }
};

inputFile.addEventListener('change', onImgUploadOpen);

export {uploadingImage};
