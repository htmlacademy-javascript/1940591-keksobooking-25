const types = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel': 'Отель',
};

const renderOfferFeatures = (features) => features
  .map((feature) => `<li class="popup__feature popup__feature--${feature}"></li>`)
  .join('');

const renderOfferPhotos = (photos) => photos
  .map((url) => `<img src="${url}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`)
  .join('');

const renderOffers = (offers) => offers
  .map(({ author, offer }) => `
    <article class="popup">
      <img src="${author.avatar}" class="popup__avatar" width="70" height="70" alt="Аватар пользователя">
      <h3 class="popup__title">${offer.title}</h3>
      <p class="popup__text popup__text--address">${offer.address}</p>
      <p class="popup__text popup__text--price">${offer.price} <span>₽/ночь</span></p>
      <h4 class="popup__type">${types[offer.type]}</h4>
      <p class="popup__text popup__text--capacity">${offer.rooms} комнаты для ${offer.guests} гостей</p>
      <p class="popup__text popup__text--time">Заезд после ${offer.checkin}, выезд до ${offer.checkout}</p>
      <ul class="popup__features">
        ${renderOfferFeatures(offer.features)}
      </ul>
      <p class="popup__description">${offer.description}</p>
      <div class="popup__photos">
        ${renderOfferPhotos(offer.photos)}
      </div>
    </article>`)
  .join('');

export { renderOffers };
