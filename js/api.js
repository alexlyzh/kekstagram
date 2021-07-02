const pageFooterElement = document.querySelector('.page-footer');

const fetchPhotos = (onSuccess, onFail) => {
  fetch('https://23.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then((photos) => onSuccess(photos))
    .catch((err) => onFail(err));
};

const getFetchErrorHTML = (errorMessage) => `
    <div class="error__inner error__inner--fetch">
        <h2 class="error__title">Ошибка загрузки фото</h2>
        <p>${errorMessage}</p>
    </div>`;

const onFetchError = (err) => pageFooterElement.insertAdjacentHTML('beforebegin', getFetchErrorHTML(err));


const sendFormData = (onSuccess, onFail, body) => {
  fetch('https://23.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      onSuccess();
    })
    .catch(() => onFail());
};

export {fetchPhotos, onFetchError, getFetchErrorHTML, sendFormData};
