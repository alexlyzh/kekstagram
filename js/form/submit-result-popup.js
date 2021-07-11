let submitMessageElement = null;
let btnCloseSubmitMessageElement = null;
let onSubmitMessageClose = null;

const onDocumentClick = (evt) => {
  if (evt.target === submitMessageElement) {
    onSubmitMessageClose();
  }
};

const onDocumentEscKeydown = (evt) => {
  if (evt.keyCode === 27) {
    onSubmitMessageClose();
  }
};

onSubmitMessageClose = () => {
  submitMessageElement.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentEscKeydown);
  document.removeEventListener('click', onDocumentClick);
};

const showSubmitMessage = (result) => {
  if (!document.querySelector(`.${result}`)) {
    submitMessageElement = document.querySelector(`#${result}`).content.querySelector(`.${result}`);
    document.body.appendChild(submitMessageElement);
  } else {
    submitMessageElement = document.querySelector(`.${result}`);
  }
  btnCloseSubmitMessageElement = submitMessageElement.querySelector(`.${result}__button`);
  submitMessageElement.classList.remove('hidden');
  btnCloseSubmitMessageElement.addEventListener('click', onSubmitMessageClose);
  document.addEventListener('keydown', onDocumentEscKeydown);
  document.addEventListener('click', onDocumentClick);
};

export {showSubmitMessage};
