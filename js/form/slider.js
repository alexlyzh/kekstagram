import {uploadingImageElement} from './image-upload-form.js';
import '../../nouislider/nouislider.js';

const SliderFiltersSettings = {
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
let currentFilter;

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

const destroySlider = () => {
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }
};

const updateSliderSettings = ({minValue, maxValue, startValue, valueStep}) => {
  destroySlider();
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
    valueElement.value = ((values[handle] - minValue) / (maxValue - minValue) * 100).toFixed();
    onSliderUpdate(currentFilter, values[handle]);
  });
};

const setDefaultImgFilter = () => {
  destroySlider();
  valueElement.value = '';
  uploadingImageElement.style.filter = '';
  uploadingImageElement.classList = '';
};

const changeFilter = (filterName) => {
  if (currentFilter) {
    uploadingImageElement.classList.remove(`effects__preview--${currentFilter}`);
  }
  uploadingImageElement.style.filter = '';
  uploadingImageElement.classList.add(`effects__preview--${filterName}`);
  currentFilter = filterName;
};

const onImageFilterClick = (evt) => {
  const selectedFilter = evt.target.value;
  if (selectedFilter === 'none') {
    setDefaultImgFilter();
  } else {
    const rangeSettings = SliderFiltersSettings[selectedFilter];
    updateSliderSettings(rangeSettings);
    sliderElement.noUiSlider.set(rangeSettings.maxValue);
    changeFilter(selectedFilter);
  }
};

imageFilterElements.forEach((filter) => {
  filter.addEventListener('click', onImageFilterClick);
});

export {setDefaultImgFilter};
