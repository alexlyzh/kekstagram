import {uploadingImage} from './image-upload-form.js';
import '../../nouislider/nouislider.js';

const imageFilters = document.querySelectorAll('.effects__radio');
const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');

const onSliderUpdate = (filterEffect, value) => {
  switch (filterEffect) {
    case 'chrome':
      uploadingImage.style.filter = `grayscale(${(value / 100).toFixed(1)})`;
      break;
    case 'sepia':
      uploadingImage.style.filter = `sepia(${(value / 100).toFixed(1)})`;
      break;
    case 'marvin':
      uploadingImage.style.filter = `invert(${value}%)`;
      break;
    case 'phobos':
      uploadingImage.style.filter = `blur(${value}px)`;
      break;
    case 'heat':
      uploadingImage.style.filter = `brightness(${value})`;
      break;
  }
};

const getSliderSettings = (filterEffect) => {
  switch (filterEffect) {
    case 'chrome':
    case 'sepia':
    case 'marvin':
      return {
        min: 0,
        max: 100,
        start: 100,
        step: 1,
      };
    case 'phobos':
      return {
        min: 0,
        max: 3,
        start: 3,
        step: 0.1,
      };
    case 'heat':
      return {
        min: 1,
        max: 3,
        start: 3,
        step: 0.1,
      };
  }
};

const createSlider = (min, max, start, step) => {
  noUiSlider.create(sliderElement, {
    range: {
      min: min,
      max: max,
    },
    start: start,
    step: step,
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
    valueElement.setAttribute('value', ((values[handle] - min) / (max - min) * 100).toFixed());
    onSliderUpdate(uploadingImage.dataset.selectedFilter, values[handle]);
  });
};

const updateSliderSettings = ({min, max, start, step}) => {
  if (!sliderElement.noUiSlider) {
    createSlider(min, max, start, step);
    return;
  }
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max,
    },
    start: start,
    step: step,
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
    valueElement.setAttribute('value', ((values[handle] - min) / (max - min) * 100).toFixed());
    onSliderUpdate(uploadingImage.dataset.selectedFilter, values[handle]);
  });
};

const setDefaultImgFilter = () => {
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }
  valueElement.setAttribute('value', '');
  uploadingImage.style.filter = '';
  uploadingImage.classList.remove(...uploadingImage.classList);
  uploadingImage.dataset.selectedFilter = '';
};

const onImageFilterClick = (evt) => {
  if (evt.target.value === 'none') {
    setDefaultImgFilter();
  } else {
    uploadingImage.dataset.selectedFilter = evt.target.value;
    const settings = getSliderSettings(evt.target.value);
    updateSliderSettings(settings);
    sliderElement.noUiSlider.set(settings.max);
    uploadingImage.style.filter = '';
    uploadingImage.classList.remove(...uploadingImage.classList);
    uploadingImage.classList.add(`effects__preview--${evt.target.value}`);
  }
};

imageFilters.forEach((filter) => {
  filter.addEventListener('click', onImageFilterClick);
});

export {setDefaultImgFilter};
