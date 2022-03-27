const form = document.querySelector('.ad-form');

const pristine = window.Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'ad-form__error'
}, true);

const type = form.querySelector('select[name="type"]');
const price = form.querySelector('input[name="price"]');
const slider = form.querySelector('.ad-form__slider');
const typeOption = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

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
      return +value.toFixed(0);
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

const timein = form.querySelector('select[name="timein"]');
const timeout = form.querySelector('select[name="timeout"]');
timein.addEventListener('change', (evt) => { timeout.value = evt.target.value; });
timeout.addEventListener('change', (evt) => { timein.value = evt.target.value; });

const rooms = form.querySelector('select[name="rooms"]');
const capacity = form.querySelector('select[name="capacity"]');
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

const isFormValid = () => pristine.validate();

export { isFormValid };
