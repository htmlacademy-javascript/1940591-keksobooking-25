import { setInitialAddress } from './map.js';

const forms = document.querySelectorAll('form');

const disablePage = () => {
  forms.forEach((form) => {
    form.classList.add(`${form.classList[0]}--disabled`);
    form.childNodes.forEach((element) => {
      element.disabled = true;
    });
  });
};

const enablePage = () => {
  forms.forEach((form) => {
    form.classList.remove(`${form.classList[0]}--disabled`);
    form.childNodes.forEach((element) => {
      element.disabled = false;
    });
  });
};

const setPagesInitialState = () => {
  forms.forEach((form) => {
    form.reset();
  });
  forms[1].querySelector('input[name="price"]')
    .setAttribute('placeholder', '1000');

  setInitialAddress();
};

export { disablePage, enablePage, setPagesInitialState };
