import {uploadingImageElement} from './image-upload-form.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'webp', 'svg'];

const inputFileElement = document.querySelector('.img-upload__input');

inputFileElement.addEventListener('change', () => {
  const file = inputFileElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      uploadingImageElement.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

