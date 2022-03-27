import { renderOffer } from './templates.js';

const centerCoordinates = { lat: 35.68271, lng: 139.75352 };
const zoom = 14;
const address = document.querySelector('input[name="address"]');
const icon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});
const mainIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const mainMarker = L.marker(centerCoordinates, {
  draggable: true,
  icon: mainIcon,
});

address.value = `${centerCoordinates.lat}, ${centerCoordinates.lng}`;

let indicateOffers = () => {};
let setInitialAddress = () => {};

const setMap = (onSuccess) => {
  const map = L.map('map-canvas')
    .on('load', onSuccess)
    .setView(centerCoordinates, zoom);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainMarker.addTo(map);

  mainMarker.on('moveend', (evt) => {
    address.value = `${+evt.target.getLatLng().lat.toFixed(5)}, ${+evt.target.getLatLng().lng.toFixed(5)}`;
  });

  indicateOffers = (offers) => {
    offers.forEach((offer) => {
      const marker = L.marker(offer.location, { icon });
      marker.addTo(map).bindPopup(renderOffer(offer));
    });
  };

  setInitialAddress = () => {
    map.setView(centerCoordinates, zoom)
      .closePopup();

    mainMarker.setLatLng(centerCoordinates);

    address.value = `${centerCoordinates.lat}, ${centerCoordinates.lng}`;
  };
};


export { setMap, indicateOffers, setInitialAddress };
