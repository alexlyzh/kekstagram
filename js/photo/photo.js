const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createPhotoElement = (photoObject) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = photoObject.url;
  pictureElement.querySelector('.picture__comments').textContent = photoObject.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = photoObject.likes;
  return pictureElement;
};

export {createPhotoElement};
