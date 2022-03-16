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
