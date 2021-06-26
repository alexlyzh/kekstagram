import {uploadingImage} from './image-upload-form.js';

const SCALING_STEP = 25;
const MAX_SCALE = 100;

const scaleButtons = document.querySelectorAll('.scale__control');
const scaleValue = document.querySelector('.scale__control--value');


const setDefaultImgScale = () => {
  scaleValue.setAttribute('value', '100%');
  uploadingImage.style.transform = 'scale(1)';
};

const getCurrentScaleValueAsNumber = () => Number(scaleValue.value.substr(0, scaleValue.value.length - 1));

function onScaleButtonClick() {
  if (this.textContent === 'Увеличить') {
    if (getCurrentScaleValueAsNumber() !== MAX_SCALE) {
      const newScale = getCurrentScaleValueAsNumber() + SCALING_STEP;
      scaleValue.setAttribute('value', `${newScale}%`);
      uploadingImage.style.transform = `scale(${newScale / 100})`;
    }
  }
  if (this.textContent === 'Уменьшить'){
    if (getCurrentScaleValueAsNumber() !== SCALING_STEP) {
      const newScale = getCurrentScaleValueAsNumber() - SCALING_STEP;
      scaleValue.setAttribute('value', `${newScale}%`);
      uploadingImage.style.transform = `scale(${newScale / 100})`;
    }
  }
}

scaleButtons.forEach((button) => {
  button.addEventListener('click', onScaleButtonClick);
});

export {setDefaultImgScale};
