import { getRandomInteger, getRandomFloat, getRandomArrayElement, getRandomArray } from './util.js';

const surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
const names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const types = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const times = ['12:00', '13:00', '14:00'];
const photos = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const descriptions = [
  'Новый коттедж общей площадью 596 м2, включая гараж, расположен на участке площадью 23,23 соток.',
  'Новый дом классической архитектуры на красивом участке у природного озера.',
  'Абсолютно вся инфраструктура в шаговой доступности!',
  'Коттеджный поселок с инфраструктурой городского уровня, расположенный в сосновом лесу недалеко от аэропорта Внуково.',
  'Продается коттедж в КП Калужские усадьбы, общей площадью 1499 кв.м., участок 16 сот.',
];
const titles = [
  'Милая, уютная квартирка в центре Токио',
  'Меблированная квартира лофт',
  'Жилой комплекс премиум-класса в Токио',
  'Новый дом под ключ',
  'Коттедж с вековым лесом',
  'Современный дом!',
  'Монплезир',
  'Новый дом в коттеджном поселке',
];

const generateOffers = (quantity = 10) => Array.from({ length: quantity }, (_, i) => {
  const latitude = getRandomFloat(35.65000, 35.70000, 5);
  const longitude = getRandomFloat(139.70000, 139.80000, 5);
  i++;
  return {
    author: {
      id: i,
      name: `${getRandomArrayElement(names)} ${getRandomArrayElement(surnames)}`,
      avatar: `img/avatars/user${getRandomInteger(1, 10).toString().padStart(2, '0')}.png`,
    },
    offer: {
      title: getRandomArrayElement(titles),
      address: `${latitude}, ${longitude}`,
      price: getRandomInteger(1000000, 10000000),
      type: getRandomArrayElement(types),
      rooms: getRandomInteger(1, 9),
      guests: getRandomInteger(1, 9),
      checkin: getRandomArrayElement(times),
      checkout: getRandomArrayElement(times),
      features: getRandomArray(features),
      description: getRandomArrayElement(descriptions),
      photos: getRandomArray(photos),
    },
    location: {
      lat: latitude,
      lng: longitude,
    },
  };
});

export { generateOffers };
