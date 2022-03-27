import { showFailPopup, showSuccessPopup } from './popups.js';
import { isFormValid } from './form-validation.js';
import { sendOffer } from './api.js';
import { resetMap } from './map.js';

const form = document.querySelector('.ad-form');
const price = form.querySelector('input[name="price"]');
const address = form.querySelector('input[name="address"]');
const submitButton = form.querySelector('button[type="submit"]');
const resetButton = form.querySelector('button[type="reset"]');

const forms = document.querySelectorAll('form');

const disablePage = () => {
  forms.forEach((el) => {
    el.classList.add(`${el.classList[0]}--disabled`);
    el.childNodes.forEach((element) => {
      element.disabled = true;
    });
  });
};

const enablePage = () => {
  forms.forEach((el) => {
    el.classList.remove(`${el.classList[0]}--disabled`);
    el.childNodes.forEach((element) => {
      element.disabled = false;
    });
  });
};

const resetPage = () => {
  forms.forEach((el) => {
    el.reset();
  });
  price.setAttribute('placeholder', '1000');

  resetMap();
};

const setAddress = (value) => {
  address.value = value;
};

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
        resetPage();
        showSuccessPopup();
      },
      () => {
        enableSubmitButton();
        showFailPopup();
      },
      new FormData(evt.target));
  }
};

const initForm = () => {
  form.addEventListener('submit', offerFormSubmitHandler);
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetPage();
  });
};

export { disablePage, enablePage, resetPage, setAddress, initForm };
