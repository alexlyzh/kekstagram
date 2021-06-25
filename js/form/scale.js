const scaleButtons = document.querySelectorAll('.scale__control');
const scaleValue = document.querySelector('.scale__control--value');
const scalingImage = document.querySelector('.img-upload__preview img');

const setDefaultScale = () => {
  scaleValue.setAttribute('value', '100%');
  scalingImage.style.transform = 'scale(1)';
};

const getCurrentScaleValueAsNumber = () => Number(scaleValue.value.substr(0, scaleValue.value.length - 1));

function onScaleButtonClick() {
  if (this.textContent === 'Увеличить') {
    if (getCurrentScaleValueAsNumber() !== 100) {
      const newScale = getCurrentScaleValueAsNumber() + 25;
      scaleValue.setAttribute('value', `${newScale}%`);
      scalingImage.style.transform = `scale(${newScale / 100})`;
    }
  }
  if (this.textContent === 'Уменьшить'){
    if (getCurrentScaleValueAsNumber() !== 25) {
      const newScale = getCurrentScaleValueAsNumber() - 25;
      scaleValue.setAttribute('value', `${newScale}%`);
      scalingImage.style.transform = `scale(${newScale / 100})`;
    }
  }
}

scaleButtons.forEach((button) => {
  button.addEventListener('click', onScaleButtonClick);
});

export {setDefaultScale};
