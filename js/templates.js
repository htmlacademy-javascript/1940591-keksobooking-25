import { getOffers as getOffersData } from './data.js';

const types = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel': 'Отель',
};

const getOffers = (quantity) => {
  const data = getOffersData(quantity);
  const offerTemplate = document.querySelector('#card')
    .content
    .children[0];
  const fragment = document.createDocumentFragment();

  data.forEach(({ author, offer }) => {
    const offerCard = offerTemplate.cloneNode(true);

    offerCard.querySelector('.popup__avatar').src = author.avatar;
    offerCard.querySelector('.popup__title').textContent = offer.title;
    offerCard.querySelector('.popup__text--address').textContent = offer.address;
    offerCard.querySelector('.popup__text--price').innerHTML = `${offer.price} <span>₽/ночь</span>`;
    offerCard.querySelector('.popup__type').textContent = types[offer.type];
    offerCard.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
    offerCard.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

    offerCard.querySelectorAll('.popup__feature')
      .forEach((element) => {
        const isNeccessary = offer.features.some(
          (feature) => element.classList.contains(`popup__feature--${feature}`)
        );

        if (isNeccessary) {
          element.remove();
        }
      });

    offerCard.querySelector('.popup__description').textContent = offer.description;

    const photos = offerCard.querySelector('.popup__photos');
    offer.photos.forEach((url, i) => {
      if (i === 0) {
        photos.children[0].src = url;
      } else {
        const photo = photos.children[0].cloneNode(true);
        photo.src = url;
        photos.append(photo);
      }
    });

    fragment.append(offerCard);
  });

  return fragment;
};

export { getOffers };
