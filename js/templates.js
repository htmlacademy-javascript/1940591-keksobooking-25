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

const renderOffer = (offer) => `
    <article class="popup">
      <img src="${offer.author.avatar}" class="popup__avatar" width="70" height="70" alt="Аватар пользователя">
      <h3 class="popup__title">${offer.offer.title}</h3>
      <p class="popup__text popup__text--address">${offer.offer.address}</p>
      <p class="popup__text popup__text--price">${offer.offer.price} <span>₽/ночь</span></p>
      <h4 class="popup__type">${types[offer.offer.type]}</h4>
      <p class="popup__text popup__text--capacity">${offer.offer.rooms} комнаты для ${offer.offer.guests} гостей</p>
      <p class="popup__text popup__text--time">Заезд после ${offer.offer.checkin}, выезд до ${offer.offer.checkout}</p>
      <ul class="popup__features">
        ${renderOfferFeatures(offer.offer.features)}
      </ul>
      <p class="popup__description">${offer.offer.description}</p>
      <div class="popup__photos">
        ${renderOfferPhotos(offer.offer.photos)}
      </div>
    </article>`;

export { renderOffer };
