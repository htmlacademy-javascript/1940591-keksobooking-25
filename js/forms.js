const forms = document.querySelectorAll('form');

const disableForms = () => {
  forms.forEach((form) => {
    form.classList.add(`${form.classList[0]}--disabled`);
    form.childNodes.forEach((element) => {
      element.disabled = true;
    });
  });
};

const enableForms = () => {
  forms.forEach((form) => {
    form.classList.remove(`${form.classList[0]}--disabled`);
    form.childNodes.forEach((element) => {
      element.disabled = false;
    });
  });
};

const offerForm = forms[1];
const offerFormConfig = {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'ad-form__error'
};

const pristine = new Pristine(offerForm, offerFormConfig, true);

const typeOption = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};
const type = offerForm.querySelector('select[name="type"]');
const price = offerForm.querySelector('input[name="price"]');
const typeChangeHandler = () => {
  price.placeholder = typeOption[type.value];
};
const validatePrice = () => price.value >= typeOption[type.value];
const getPriceErrorMessage = () => `Минимальная цена ${typeOption[type.value]}`;

pristine.addValidator(price, validatePrice, getPriceErrorMessage);
type.addEventListener('change', typeChangeHandler);

const times = offerForm.querySelectorAll('.ad-form__element--time select');
const timesChangeHandler = (evt) => {
  if (evt.target.id === 'timein') {
    times[1].value = evt.target.value;
  } else {
    times[0].value = evt.target.value;
  }
};

times.forEach((time) => {
  time.addEventListener('change', timesChangeHandler);
});

const rooms = offerForm.querySelector('select[name="rooms"]');
const capacity = offerForm.querySelector('select[name="capacity"]');
const roomsOption = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};
const validateRooms = () => roomsOption[rooms.value].includes(capacity.value);
const getRoomsErrorMessage = () => rooms.value === '100' ? '100 комнат не для гостей' : 'Недопустимое количество мест';
pristine.addValidator(rooms, validateRooms, getRoomsErrorMessage);

const offerFormSubmitHandler = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    evt.target.submit();
  } else {
    return false;
  }
};

offerForm.addEventListener('submit', offerFormSubmitHandler);

export { disableForms, enableForms };
