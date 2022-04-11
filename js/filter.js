import { debounce } from './util.js';

const filtersForm = document.querySelector('.map__filters');
const typeElement = filtersForm.querySelector('select[name="housing-type"]');
const priceElement = filtersForm.querySelector('select[name="housing-price"]');
const roomsElement = filtersForm.querySelector('select[name="housing-rooms"]');
const guestsElement = filtersForm.querySelector('select[name="housing-guests"]');
const featureElements = filtersForm.querySelector('#housing-features');
const priceOption = {
  'low': 10000,
  'high': 50000,
};

let offersCopy;
let selectedFeatures = [];

const filterByType = (type) => typeElement.value === type || typeElement.value === 'any';
const filterByPrice = (price) => {
  if (priceElement.value === 'low') {
    return price <= priceOption.low;
  }
  if (priceElement.value === 'middle') {
    return price > priceOption.low && price < priceOption.high;
  }
  if (priceElement.value === 'high') {
    return price >= priceOption.high;
  }
  return true;
};
const filterByRoomsCount = (roomsCount) => Number(roomsElement.value) === roomsCount || roomsElement.value === 'any';
const filterByGuestsCount = (guestsCount) => Number(guestsElement.value) === guestsCount || guestsElement.value === 'any';
const filterByFeatures = (features) => {
  if (selectedFeatures.length > 0 && !features) {
    return false;
  }
  return selectedFeatures.every((selected) => features.includes(selected));
};

const filterOffers = (offers, renderMarkers) => {
  const filteredOffers = offers
    .filter(({ offer }) =>
      filterByType(offer.type) &&
      filterByPrice(offer.price) &&
      filterByRoomsCount(offer.rooms) &&
      filterByGuestsCount(offer.guests) &&
      filterByFeatures(offer.features)
    );

  renderMarkers(filteredOffers);
};

const initFilter = (offers, renderMarkers) => {
  offersCopy = offers.slice();
  filtersForm.classList.remove(`${filtersForm.classList[0] }--disabled`);
  filtersForm.childNodes.forEach((el) => {
    el.disabled = false;
  });
  const debouncedFilterOffers = debounce(() => {
    filterOffers(offers, renderMarkers);
  });
  typeElement.addEventListener('change', debouncedFilterOffers);
  priceElement.addEventListener('change', debouncedFilterOffers);
  roomsElement.addEventListener('change', debouncedFilterOffers);
  guestsElement.addEventListener('change', debouncedFilterOffers);
  featureElements.addEventListener('click', (evt) => {
    if (evt.target.tagName === 'INPUT') {
      if (evt.target.checked) {
        selectedFeatures.push(evt.target.value);
      } else {
        selectedFeatures = selectedFeatures.filter((selectedFeature) => selectedFeature !== evt.target.value);
      }
      debouncedFilterOffers();
    }
  });
};

const resetFilter = (renderMarkers) => {
  if (offersCopy) {
    renderMarkers(offersCopy);
  }
};

export { initFilter, resetFilter };
