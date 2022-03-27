import { showFailPopup, showSuccessPopup } from './popups.js';
import { isFormValid } from './offer-form-validation.js';
import { setPagesInitialState } from './page-state.js';
import { sendOffer } from './api.js';

const form = document.querySelector('.ad-form');
const submitButton = form.querySelector('button[type="submit"]');
const resetButton = form.querySelector('button[type="reset"]');

const disableSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Сохраняю...';
};

const enableSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const offerFormSubmitHandler = (evt) => {
  evt.preventDefault();

  if (isFormValid()) {
    disableSubmitButton();
    sendOffer(
      () => {
        enableSubmitButton();
        setPagesInitialState();
        showSuccessPopup();
      },
      () => {
        enableSubmitButton();
        showFailPopup();
      },
      new FormData(evt.target));
  }
};

const setOfferFormSubmit = () => {
  form.addEventListener('submit', offerFormSubmitHandler);
};

const setOfferFormReset = () => {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    setPagesInitialState();
  });
};

export { setOfferFormSubmit, setOfferFormReset };
