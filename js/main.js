import { getOffers } from './api.js';
import { resetFilter, setFilter } from './filter.js';
import { disableForms, enableOfferForm, setFormSubmit, resetForms, setFormReset, enableSubmitButton } from './forms.js';
import { initMap, renderMarkers, resetMap } from './map.js';
import { showSuccess, showFail, showErrorMessage } from './popups.js';

disableForms();

const onFormSuccessSubmit = () => {
  showSuccess();
  resetForms();
  resetFilter(renderMarkers);
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
  enableOfferForm();
  getOffers(
    (offers) => {
      renderMarkers(offers);
      setFilter(offers, renderMarkers);
    },
    showErrorMessage
  );
};

initMap(onMapSuccessInit);
