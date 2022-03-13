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

export { disablePage, enablePage };
