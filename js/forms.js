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
const pristine = new Pristine(offerForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'ad-form__error'
}, true);

const typeOption = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};
const type = offerForm.querySelector('select[name="type"]');
const price = offerForm.querySelector('input[name="price"]');
const slider = offerForm.querySelector('.ad-form__slider');

noUiSlider.create(slider, {
  start: typeOption[type.value],
  connect: 'lower',
  range: {
    'min': 0,
    'max': 100000
  },
  step: 1,
  format: {
    to: function(value) {
      return value.toFixed(0);
    },
    from: function(value) {
      return parseInt(value, 10);
    },
  }
});

slider.noUiSlider.on('update', () => {
  price.value = slider.noUiSlider.get();
});

price.addEventListener('input', () => {
  slider.noUiSlider.updateOptions({ start: price.value });
});

pristine.addValidator(
  price,
  () => price.value >= typeOption[type.value],
  () => `Минимальная цена ${typeOption[type.value]}`
);

type.addEventListener('change', () => {
  price.placeholder = typeOption[type.value];
  slider.noUiSlider.updateOptions({
    range: {
      'min': typeOption[type.value],
      'max': 100000
    }
  });
});

const timein = offerForm.querySelector('select[name="timein"]');
const timeout = offerForm.querySelector('select[name="timeout"]');
timein.addEventListener('change', (evt) => { timeout.value = evt.target.value; });
timeout.addEventListener('change', (evt) => { timein.value = evt.target.value; });

const rooms = offerForm.querySelector('select[name="rooms"]');
const capacity = offerForm.querySelector('select[name="capacity"]');
const roomsOption = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};
pristine.addValidator(
  rooms,
  () => roomsOption[rooms.value].includes(capacity.value),
  () => rooms.value === '100' ? '100 комнат не для гостей' : 'Недопустимое количество мест'
);

const offerFormSubmitHandler = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    evt.target.submit();
  } else {
    return false;
  }
};
offerForm.addEventListener('submit', offerFormSubmitHandler);

export { disableForms, enableForms };
