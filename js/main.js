import { getOffers } from './api.js';
import { disableForms, enableForms, setFormSubmit, resetForms, setFormReset, enableSubmitButton } from './forms.js';
import { initMap, renderMarkers, resetMap } from './map.js';
import { showSuccess, showFail, showErrorMessage } from './popups.js';
import { createOfferPopup } from './templates.js';

disableForms();

const onFormSuccessSubmit = () => {
  showSuccess();
  resetForms();
  enableSubmitButton();
  resetMap();
};

const onFormFailSubmit = () => {
  showFail();
  enableSubmitButton();
};

setFormSubmit(onFormSuccessSubmit, onFormFailSubmit);

setFormReset(resetMap);

const onMapSuccessInit = () => {
  enableForms();
  getOffers(
    (offers) => {
      renderMarkers(offers, createOfferPopup);
    },
    showErrorMessage
  );
};

initMap(onMapSuccessInit);
