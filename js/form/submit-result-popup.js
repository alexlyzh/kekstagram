let submitMessageElement;
let btnCloseSubmitMessageElement;

const onDocumentClick = (evt) => {
  if (evt.target === submitMessageElement) {
    onSubmitMessageClose(); // eslint-disable-line no-use-before-define
  }
};

const onSubmitMessageClose = () => {
  submitMessageElement.classList.add('hidden');
  document.removeEventListener('keydown', onSubmitMessageEscKeydown); // eslint-disable-line no-use-before-define
  document.removeEventListener('click', onDocumentClick);
};

const onSubmitMessageEscKeydown = (evt) => {
  if (evt.keyCode === 27) {
    onSubmitMessageClose();
  }
};

const showSubmitMessage = (result) => {
  if (!document.querySelector(`.${result}`)) {
    submitMessageElement = document.querySelector(`#${result}`).content.querySelector(`.${result}`);
    btnCloseSubmitMessageElement = submitMessageElement.querySelector(`.${result}__button`);
    document.body.appendChild(submitMessageElement);
  } else {
    submitMessageElement = document.querySelector(`.${result}`);
    btnCloseSubmitMessageElement = submitMessageElement.querySelector(`.${result}__button`);
  }
  submitMessageElement.classList.remove('hidden');
  btnCloseSubmitMessageElement.addEventListener('click', onSubmitMessageClose);
  document.addEventListener('keydown', onSubmitMessageEscKeydown);
  document.addEventListener('click', onDocumentClick);
};

export {showSubmitMessage};
