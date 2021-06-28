import {uploadingImageElement} from './image-upload-form.js';
import '../../nouislider/nouislider.js';

const SLIDER_RANGE_SETTINGS_FOR_IMG_FILTERS = {
  chrome: {
    minValue: 0,
    maxValue: 100,
    startValue: 100,
    valueStep: 1,
  },
  marvin: {
    minValue: 0,
    maxValue: 100,
    startValue: 100,
    valueStep: 1,
  },
  sepia: {
    minValue: 0,
    maxValue: 100,
    startValue: 100,
    valueStep: 1,
  },
  phobos: {
    minValue: 0,
    maxValue: 3,
    startValue: 3,
    valueStep: 0.1,
  },
  heat: {
    minValue: 1,
    maxValue: 3,
    startValue: 3,
    valueStep: 0.1,
  },
};

const imageFilterElements = document.querySelectorAll('.effects__radio');
const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');

const onSliderUpdate = (filterEffect, value) => {
  switch (filterEffect) {
    case 'chrome':
      uploadingImageElement.style.filter = `grayscale(${(value / 100).toFixed(1)})`;
      break;
    case 'sepia':
      uploadingImageElement.style.filter = `sepia(${(value / 100).toFixed(1)})`;
      break;
    case 'marvin':
      uploadingImageElement.style.filter = `invert(${value}%)`;
      break;
    case 'phobos':
      uploadingImageElement.style.filter = `blur(${value}px)`;
      break;
    case 'heat':
      uploadingImageElement.style.filter = `brightness(${value})`;
      break;
  }
};

const updateSliderSettings = ({minValue, maxValue, startValue, valueStep}) => {
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }
  noUiSlider.create(sliderElement, {
    range: {
      min: minValue,
      max: maxValue,
    },
    start: startValue,
    step: valueStep,
    connect: 'lower',
    format: {
      to: function (value) {
        return value;
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  sliderElement.noUiSlider.on('update', (values, handle) => {
    valueElement.setAttribute('value', ((values[handle] - minValue) / (maxValue - minValue) * 100).toFixed());
    onSliderUpdate(uploadingImageElement.dataset.selectedFilter, values[handle]);
  });
};

const setDefaultImgFilter = () => {
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }
  valueElement.setAttribute('value', '');
  uploadingImageElement.style.filter = '';
  uploadingImageElement.classList.remove(...uploadingImageElement.classList);
  uploadingImageElement.dataset.selectedFilter = '';
};

const onImageFilterClick = (evt) => {
  const selectedFilter = evt.target.value;
  if (selectedFilter === 'none') {
    setDefaultImgFilter();
  } else {
    uploadingImageElement.dataset.selectedFilter = selectedFilter;
    const rangeSettings = SLIDER_RANGE_SETTINGS_FOR_IMG_FILTERS[selectedFilter];
    updateSliderSettings(rangeSettings);
    sliderElement.noUiSlider.set(rangeSettings.maxValue);
    uploadingImageElement.style.filter = '';
    uploadingImageElement.classList.remove(...uploadingImageElement.classList);
    uploadingImageElement.classList.add(`effects__preview--${selectedFilter}`);
  }
};

imageFilterElements.forEach((filter) => {
  filter.addEventListener('click', onImageFilterClick);
});

export {setDefaultImgFilter};
