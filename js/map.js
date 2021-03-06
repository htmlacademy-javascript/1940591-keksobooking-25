import { setAddress } from './form.js';
import { createOfferPopup } from './templates.js';

const ZOOM_LEVEL = 13;
const MARKERS_QUANTITY = 10;

let map;

const markerGroup = L.layerGroup();

const centerCoordinates = {
  lat: 35.68271,
  lng: 139.75352,
};

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

const initMap = (onSuccess) => {
  map = L.map('map-canvas')
    .on('load', onSuccess)
    .setView(centerCoordinates, ZOOM_LEVEL);

  markerGroup.addTo(map);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainMarker.addTo(map);
  setAddress(`${centerCoordinates.lat}, ${centerCoordinates.lng}`);

  mainMarker.on('moveend', (evt) => {
    const { lat, lng } = evt.target.getLatLng();
    setAddress(`${lat.toFixed(5)}, ${lng.toFixed(5)}`);
  });
};

const renderMarkers = (offers) => {
  markerGroup.clearLayers();
  offers.slice(0, MARKERS_QUANTITY).forEach((offer) => {
    const marker = L.marker(offer.location, { icon });
    marker.addTo(markerGroup).bindPopup(createOfferPopup(offer));
  });
};

const resetMap = () => {
  map.setView(centerCoordinates, ZOOM_LEVEL).closePopup();
  mainMarker.setLatLng(centerCoordinates);
  setAddress(`${centerCoordinates.lat}, ${centerCoordinates.lng}`);
};

export { initMap, renderMarkers, resetMap };
