import { debounce } from './util.js';

const filterElement = document.querySelector('.map__filters');
const typeElement = filterElement.querySelector('select[name="housing-type"]');
const roomsElement = filterElement.querySelector('select[name="housing-rooms"]');
const guestsElement = filterElement.querySelector('select[name="housing-guests"]');
const priceElement = filterElement.querySelector('select[name="housing-price"]');
const featureElements = filterElement.querySelectorAll('input[name="features"]');

let offersCopy;

const filterOptions = {
  type: 'any',
  price: 'any',
  rooms: 'any',
  guests: 'any',
  features: [],
};


const isTypeInFilter = (type) => filterOptions.type !== 'any' ? filterOptions.type === type : true;
const isRoomsInFilter = (rooms) => filterOptions.rooms !== 'any' ? Number(filterOptions.rooms) === rooms : true;
const isGuestsInFilter = (guests) => filterOptions.guests !== 'any' ? Number(filterOptions.guests) === guests : true;

const isPriceInFilter = (price) => {
  if (filterOptions.price === 'low') {
    return price <= 10000;
  }
  if (filterOptions.price === 'middle') {
    return price > 10000 && price < 50000;
  }
  if (filterOptions.price === 'high') {
    return price >= 50000;
  }
  return true;
};

const isFeaturesInFilter = (features) => {
  if (filterOptions.features.length === 0) {
    return true;
  }
  if (!features) {
    return false;
  }
  if (filterOptions.features.length > features.length) {
    return false;
  }
  if (features.includes(...filterOptions.features)) {
    return true;
  }
};


const filterOffers = (offers, onSuccess) => {
  const filteredOffers = offers
    .slice()
    .filter(({ offer }) => {
      const filters = [];

      filters.push(isTypeInFilter(offer.type));
      filters.push(isPriceInFilter(offer.price));
      filters.push(isRoomsInFilter(offer.rooms));
      filters.push(isGuestsInFilter(offer.guests));
      filters.push(isFeaturesInFilter(offer.features));

      return filters.every((filter) => filter);
    });

  onSuccess(filteredOffers);
};


const setPriceChange = (offers, onSuccess) => {
  priceElement.addEventListener('change', debounce((evt) => {
    filterOptions.price = evt.target.value;

    filterOffers(offers, onSuccess);
  }));
};

const setTypeChange = (offers, onSuccess) => {
  typeElement.addEventListener('change', debounce((evt) => {
    filterOptions.type = evt.target.value;

    filterOffers(offers, onSuccess);
  }));
};

const setRoomsChange = (offers, onSuccess) => {
  roomsElement.addEventListener('change', debounce((evt) => {
    filterOptions.rooms = evt.target.value;

    filterOffers(offers, onSuccess);
  }));
};

const setGuestsChange = (offers, onSuccess) => {
  guestsElement.addEventListener('change', debounce((evt) => {
    filterOptions.guests = evt.target.value;

    filterOffers(offers, onSuccess);
  }));
};

const setFeaturesClick = (offers, onSuccess) => {
  featureElements.forEach((el) => {
    el.addEventListener('click', debounce((evt) => {
      if (evt.target.checked) {
        filterOptions.features.push(evt.target.value);
      } else {
        filterOptions.features = filterOptions.features.filter((feature) => feature !== evt.target.value);
      }
      filterOffers(offers, onSuccess);
    }));
  });
};

const enableFilter = () => {
  filterElement.classList.remove(`${filterElement.classList[0]}--disabled`);
  filterElement.childNodes.forEach((el) => {
    el.disabled = false;
  });
};

const setFilter = (offers, onSuccess) => {
  offersCopy = offers.slice();

  enableFilter();
  setTypeChange(offers, onSuccess);
  setPriceChange(offers, onSuccess);
  setRoomsChange(offers, onSuccess);
  setGuestsChange(offers, onSuccess);
  setFeaturesClick(offers, onSuccess);
};

const resetFilter = (cb) => {
  if (offersCopy) {
    cb(offersCopy);
  }
};

export { setFilter, resetFilter };
