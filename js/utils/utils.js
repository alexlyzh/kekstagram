const getRandomInteger = (min, max) => {
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

/**
 * Возвращает массив указанной длины, состоящий из неповторяющихся целых чисел в пределах указанного диапазона.
 * @param min Нижняя граница диапазона
 * @param max Верхняя граница диапазона
 * @param length Длина массива
 * @returns {*[]}
 */
const getRandomUniqueIntegerList = (min, max, length) => {
  const list = [];
  while (list.length !== length) {
    const number = getRandomInteger(min, max);
    if (!list.includes(number)) {
      list.push(number);
    }
  }
  return list;
};

const isEscKeydown = (evt) => evt.keyCode === 27;

const hideElement = (el) => el.classList.add('hidden');
const showElement = (el) => el.classList.remove('hidden');

export {getRandomInteger, getRandomUniqueIntegerList, isEscKeydown, hideElement, showElement};
