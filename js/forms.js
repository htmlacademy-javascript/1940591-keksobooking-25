import { sendOffer } from './api.js';

const formElements = document.querySelectorAll('form');
const formElement = formElements[1];
const addressElement = formElement.querySelector('input[name="address"]');
const typeElement = formElement.querySelector('select[name="type"]');
const priceElement = formElement.querySelector('input[name="price"]');
const sliderElement = formElement.querySelector('.ad-form__slider');
const timeinElement = formElement.querySelector('select[name="timein"]');
const timeoutElement = formElement.querySelector('select[name="timeout"]');
const roomsElement = formElement.querySelector('select[name="rooms"]');
const capacityElement = formElement.querySelector('select[name="capacity"]');
const submitElement = formElement.querySelector('button[type="submit"]');
const resetElement = formElement.querySelector('button[type="reset"]');

const typeOption = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const roomsOption = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

typeElement.addEventListener('change', () => {
  priceElement.placeholder = typeOption[typeElement.value];
  sliderElement.noUiSlider.updateOptions({
    range: {
      'min': typeOption[typeElement.value],
      'max': 100000
    }
  });
});

timeinElement.addEventListener('change', (evt) => { timeoutElement.value = evt.target.value; });
timeoutElement.addEventListener('change', (evt) => { timeinElement.value = evt.target.value; });

noUiSlider.create(sliderElement, {
  start: typeOption[typeElement.value],
  connect: 'lower',
  range: {
    'min': 0,
    'max': 100000
  },
  step: 1,
  format: {
    to: function(value) {
      return +value.toFixed(0);
    },
    from: function(value) {
      return parseInt(value, 10);
    },
  }
});

sliderElement.noUiSlider.on('update', () => {
  priceElement.value = sliderElement.noUiSlider.get();
});

priceElement.addEventListener('input', () => {
  sliderElement.noUiSlider.updateOptions({ start: priceElement.value });
});


const pristine = window.Pristine(formElement, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'ad-form__error'
}, true);

pristine.addValidator(
  priceElement,
  () => priceElement.value >= typeOption[typeElement.value],
  () => `Минимальная цена ${typeOption[typeElement.value]}`
);

pristine.addValidator(
  roomsElement,
  () => roomsOption[roomsElement.value].includes(capacityElement.value),
  () => roomsElement.value === '100' ? '100 комнат не для гостей' : 'Недопустимое количество мест'
);


const disableForms = () => {
  formElements.forEach((el) => {
    el.classList.add(`${el.classList[0]}--disabled`);
    el.childNodes.forEach((element) => {
      element.disabled = true;
    });
  });
  sliderElement.setAttribute('disabled', true);
};

const enableOfferForm = () => {
  formElement.classList.remove(`${formElement.classList[0]}--disabled`);
  formElement.childNodes.forEach((el) => {
    el.disabled = false;
  });
  sliderElement.removeAttribute('disabled');
};

const resetForms = () => {
  formElements.forEach((el) => {
    el.reset();
  });
  priceElement.setAttribute('placeholder', '1000');
};

const setAddress = (value) => {
  addressElement.value = value;
};

const disableSubmitButton = () => {
  submitElement.disabled = true;
  submitElement.textContent = 'Публикую...';
};

const enableSubmitButton = () => {
  submitElement.disabled = false;
  submitElement.textContent = 'Опубликовать';
};

const setFormSubmit = (onSuccess, onFail) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      disableSubmitButton();
      sendOffer(onSuccess, onFail, new FormData(evt.target));
    }
  });
};

const setFormReset = (onSuccess) => {
  resetElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetForms();
    onSuccess();
  });
};

export {
  disableForms,
  enableOfferForm,
  resetForms,
  setAddress,
  setFormSubmit,
  setFormReset,
  enableSubmitButton,
};
