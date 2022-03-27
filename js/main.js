import { disablePage, enablePage, initForm } from './form.js';
import { initMap, renderMarkers } from './map.js';
import { showFailMessage } from './popups.js';
import { getOffers } from './api.js';

disablePage();

initForm();

initMap(() => {
  getOffers(
    (offers) => {
      renderMarkers(offers);
      enablePage();
    },
    showFailMessage
  );
});
