const PHOTOS_NUMBER = 25;

const NAMES = [
  'Иван','Хуан Себастьян','Мария','Кристоф','Виктор','Юлия','Люпита','Вашингтон','Саша','Абрам','Аваз','Август','Авдей','Автандил',
  'Адам','Адис','Адольф','Адриан','Азарий','Аким','Алан','Александр','Алексей','Альберт','Альфред','Амадей','Амаяк','Антон',
];

const PHRASES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

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

const isValidLength = (string, maxLength) => string.length <= maxLength;

const createComments = (quantity) => new Array(quantity).fill(null).map((comment, index) => (
  {
    id: index + 1,
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: PHRASES[getRandomInteger(1, PHRASES.length - 1)],
    name: NAMES[getRandomInteger(1, NAMES.length - 1)],
  }));

const createPhoto = (quantity) => new Array(quantity).fill(null).map((photo, index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты',
  likes: getRandomInteger(15,200),
  comments: createComments(getRandomInteger(1, 4)),
}));

// eslint-disable-next-line no-console
console.log(createPhoto(PHOTOS_NUMBER));

isValidLength('КЕК', 140);
