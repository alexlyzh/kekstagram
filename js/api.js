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

export {fetchPhotos, sendFormData};
