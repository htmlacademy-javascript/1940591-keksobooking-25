function generateRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

generateRandomPositiveInteger(2, 6);

function generateRandomPositiveFloat(a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));

  const result = Math.random() * (upper - lower) + lower;

  return +result.toFixed(digits);
}

generateRandomPositiveFloat(2, 3, 4);

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];
const SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг',
];
const TITLES = [
  'Милая, уютная квартирка в центре Токио',
  'Меблированная квартира лофт',
  'Жилой комплекс премиум-класса в Токио',
  'Новый дом под ключ',
  'Коттедж с вековым лесом',
  'Современный дом!',
  'Монплезир',
  'Новый дом в коттеджном поселке',
];
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const DESCRIPTIONS = [
  'Новый коттедж общей площадью 596 м2, включая гараж, расположен на участке площадью 23,23 соток. По периметру участка - кованый декоративный забор. Посажены хвойные деревья вдоль участка. Фасад дома полностью отделан камнем, а так же величественными колоннами, архитектурными изделиями и балясинами. Свободная планировка располагает возможность 6 спален, кабинета, тренажерного зала, бильярдной, кинотеатра и др. ',
  'Новый дом классической архитектуры на красивом участке у природного озера. На набережной оборудована терраса и беседка где можно приятно провести время и порыбачить. На участке выполнен великолепный ландшафтный дизайн, вымощены дорожки, есть фонтан. Для отдыха оборудованы беседка с барбекю и просторная терраса у дома. В доме выполнена отделка под ключ. На участке есть отдельный дом для персонала. Удобная транспортная доступность по скоростной магистрали, в шаговой доступности от участка развитая инфраструктура дер. Покровское.',
  'Абсолютно вся инфраструктура в шаговой доступности! В пешей доступности школа, дет сады, супермаркеты, газпромовская база отдыха Воскресенское со спортивным бассейном и сауной, боулингом и бильярдом, теннисным кортом и фитнес центром и вся необходимая инфраструктура!',
  'Коттеджный поселок с инфраструктурой городского уровня, расположенный в сосновом лесу недалеко от аэропорта Внуково. Рядом с посёлком Торговый центр Саларис, Vnukovo Outlet Village, несколько станций метро. Элитная школа, банк, отель, медицинский центр, спортивный клуб, гольф-школа, автомобильные салоны, торговые центры. Недавно открыли выезд на Калужское ш. Вся территория поселка находится под круглосуточной охраной и видеонаблюдением, въезд на территорию через КПП, забор по периметру, патрулирование территории.',
  'Продается коттедж в КП Калужские усадьбы, общей площадью 1499 кв.м., участок 16 сот. На новых землях Москвы расположенных в районе Новомосковского административного округа (НМАО). Посёлок расположился  на 10Га земли по соседству с красивым вековым лесом, где преобладают сосны и берёзы. К главному и резервному въезду в поселок проходит асфальтированная лесная дорога.',
];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const getRandomArrayElement = (array) => array[generateRandomPositiveInteger(0, array.length - 1)];

const generateRandomArray = (array) => Array.from({ length: generateRandomPositiveInteger(1, array.length) }, (_, i) => array[i]);


const ads = Array.from({ length: 10 }, (_, i) => {
  const latitude = generateRandomPositiveFloat(35.65000, 35.70000, 5);
  const longitude = generateRandomPositiveFloat(139.70000, 139.80000, 5);

  return {
    author: {
      id: i,
      name: `${getRandomArrayElement(NAMES)} ${getRandomArrayElement(SURNAMES)}`,
      avatar: i < 10 ? `img/avatars/user0${i}.png` : `img/avatars/user${i}.png`,
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${latitude}, ${longitude}`,
      price: generateRandomPositiveInteger(1000000, 10000000),
      type: getRandomArrayElement(TYPES),
      rooms: generateRandomPositiveInteger(1, 9),
      guests: generateRandomPositiveInteger(1, 9),
      checkin: getRandomArrayElement(TIMES),
      checkout: getRandomArrayElement(TIMES),
      features: generateRandomArray(FEATURES),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: generateRandomArray(PHOTOS),
    },
    location: {
      lat: latitude,
      lng: longitude,
    },
  };
});

console.log(ads);
