import { disableForms, enableForms } from './forms.js';
import { generateOffers } from './data.js';
import { renderOffer } from './templates.js';

disableForms();

const centerCoordinates = { lat: 35.65283, lng: 139.83947 };
const zoom = 12;
const address = document.querySelector('input[name="address"]');

address.value = `${centerCoordinates.lat}, ${centerCoordinates.lng}`;

const map = L.map('map-canvas')
  .on('load', () => { enableForms(); })
  .setView(centerCoordinates, zoom);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(centerCoordinates, {
  draggable: true,
  icon: mainIcon,
});

mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  address.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});

const offers = generateOffers(10);
const icon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

offers.forEach((offer) => {
  const marker = L.marker(offer.location, { icon });
  marker.addTo(map).bindPopup(renderOffer(offer));
});
