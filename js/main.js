const getRandomInteger = (min, max) => {
  if (min < 0) {
    min = 0;
  }
  if (max < 0) {
    max = 0;
  }

  if (min > max) {
    let temp = min;
    min = max;
    max = temp;
    temp = null;
  }
  const rand = min + Math.random() * (max + 1 - min); //https://learn.javascript.ru/task/random-int-min-max
  return Math.floor(rand);
};

getRandomInteger(1,10);

const isValidLength = (string, maxLength) => string.length < maxLength;

isValidLength('КЕК', 140);
