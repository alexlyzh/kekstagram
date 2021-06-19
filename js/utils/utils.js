export const getRandomInteger = (min, max) => {
  if (min < 0 || max < 0) {
    // eslint-disable-next-line no-console
    console.error('Аргументы должны быть больше или равны 0');
    return;
  }
  if (min > max) {
    // eslint-disable-next-line no-console
    console.error('Минимум не должен быть больше максимума');
    return;
  }
  const rand = min + Math.random() * (max + 1 - min); //https://learn.javascript.ru/task/random-int-min-max
  return Math.floor(rand);
};

export const isValidLength = (string, maxLength) => string.length <= maxLength;

export const isEscKeydown = (evt) => evt.keyCode === 27;

export const hideElement = (el) => el.classList.add('hidden');
export const showElement = (el) => el.classList.remove('hidden');
