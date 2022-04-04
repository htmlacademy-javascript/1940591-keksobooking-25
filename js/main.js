import { getOffers } from './api.js';
import { resetFilter, initFilter } from './filter.js';
import { disableForms, enableForm, onFormSubmit, resetForms, onFormReset, enableSubmitButton } from './form.js';
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

onFormSubmit(onFormSuccessSubmit, onFormFailSubmit);

onFormReset(resetMap);

initMap(() => {
  enableForm();
  getOffers(
    (offers) => {
      renderMarkers(offers);
      initFilter(offers, renderMarkers);
    },
    showErrorMessage
  );
});
