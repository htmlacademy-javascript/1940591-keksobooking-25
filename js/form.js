import { sendOffer } from './api.js';

const formElements = document.querySelectorAll('form');
const offerForm = formElements[1];
const avatarChooserElement = offerForm.querySelector('input[name="avatar"]');
const avatarPreviewElement = offerForm.querySelector('.ad-form-header__preview img');
const addressElement = offerForm.querySelector('input[name="address"]');
const typeElement = offerForm.querySelector('select[name="type"]');
const priceElement = offerForm.querySelector('input[name="price"]');
const sliderElement = offerForm.querySelector('.ad-form__slider');
const timeinElement = offerForm.querySelector('select[name="timein"]');
const timeoutElement = offerForm.querySelector('select[name="timeout"]');
const roomsElement = offerForm.querySelector('select[name="rooms"]');
const capacityElement = offerForm.querySelector('select[name="capacity"]');
const imagesChooserElement = offerForm.querySelector('input[name="images"]');
const imagesPreviewElement = offerForm.querySelector('.ad-form__photo');
const submitElement = offerForm.querySelector('button[type="submit"]');
const resetElement = offerForm.querySelector('button[type="reset"]');

const fileTypes = ['gif', 'jpg', 'jpeg', 'png'];

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

avatarChooserElement.addEventListener('change', (evt) => {
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();
  const matches = fileTypes.some((it) => fileName.endsWith(it));

  if (matches) {
    avatarPreviewElement.src = URL.createObjectURL(file);
  }
});

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

imagesChooserElement.addEventListener('change', (evt) => {
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();
  const matches = fileTypes.some((it) => fileName.endsWith(it));

  if (matches) {
    imagesPreviewElement.innerHTML = `<img src="${URL.createObjectURL(file)}" width="100%" height="100%">`;
  }
});

const pristine = window.Pristine(offerForm, {
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

const enableForm = () => {
  offerForm.classList.remove(`${offerForm.classList[0]}--disabled`);
  offerForm.childNodes.forEach((el) => {
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

const onFormSubmit = (onSuccess, onFail) => {
  offerForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      disableSubmitButton();
      sendOffer(onSuccess, onFail, new FormData(evt.target));
    }
  });
};

const onFormReset = (callback) => {
  resetElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetForms();
    callback();
  });
};

export {
  disableForms,
  enableForm,
  resetForms,
  setAddress,
  onFormSubmit,
  onFormReset,
  enableSubmitButton,
};
