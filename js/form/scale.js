import {uploadingImageElement} from './image-upload-form.js';

const DEFAULT_SCALE = 100;
const SCALING_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const scaleValueElement = document.querySelector('.scale__control--value');
let currentScale = DEFAULT_SCALE;

const setDefaultImgScale = () => {
  currentScale = DEFAULT_SCALE;
  scaleValueElement.value = `${DEFAULT_SCALE}%`;
  uploadingImageElement.style.transform = `scale(${DEFAULT_SCALE  / 100})`;
};

const onScaleButtonClick = (multiplier) => {
  currentScale = currentScale + multiplier * SCALING_STEP;
  currentScale = Math.min(MAX_SCALE, currentScale);
  currentScale = Math.max(MIN_SCALE, currentScale);
  scaleValueElement.value = `${currentScale}%`;
  uploadingImageElement.style.transform = `scale(${currentScale / 100})`;
};

const onScaleBiggerClick = () => onScaleButtonClick(1);
const onScaleSmallerClick = () => onScaleButtonClick(-1);

export {setDefaultImgScale, onScaleSmallerClick, onScaleBiggerClick};
