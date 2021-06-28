import {uploadingImageElement} from './image-upload-form.js';

const SCALING_STEP = 25;
const MAX_SCALE = 100;

const scaleSmallerElement = document.querySelector('.scale__control--smaller');
const scaleBiggerElement = document.querySelector('.scale__control--bigger');
const scaleValueElement = document.querySelector('.scale__control--value');


const setDefaultImgScale = () => {
  scaleValueElement.setAttribute('value', '100%');
  uploadingImageElement.style.transform = 'scale(1)';
};

const changeScale = (multiplier, currentScale) => {
  const newScale = currentScale + multiplier * SCALING_STEP;
  scaleValueElement.setAttribute('value', `${newScale}%`);
  uploadingImageElement.style.transform = `scale(${newScale / 100})`;
};

const onScaleButtonClick = (evt) => {
  const currentScale = Number(scaleValueElement.value.substr(0, scaleValueElement.value.length - 1));
  if (evt.target.classList.contains('scale__control--bigger')) {
    if (currentScale !== MAX_SCALE) {
      changeScale(1, currentScale);
    }
  }
  if (evt.target.classList.contains('scale__control--smaller')) {
    if (currentScale !== SCALING_STEP) {
      changeScale(-1, currentScale);
    }
  }
};

export {setDefaultImgScale, scaleBiggerElement, scaleSmallerElement, onScaleButtonClick};
