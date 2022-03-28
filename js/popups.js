const successPopup = document.querySelector('#success').content.children[0];
const failPopup = document.querySelector('#error').content.children[0];

const showSuccessPopup = () => {
  document.body.insertAdjacentElement('beforeend', successPopup);

  document.addEventListener('click', successPopupClickHandler);
  document.addEventListener('keydown', successPopupKeydownHandler);
};

const showFailPopup = () => {
  document.body.insertAdjacentElement('beforeend', failPopup);

  document.addEventListener('click', failPopupClickHandler);
  document.addEventListener('keydown', failPopupKeydownHandler);
};

function successPopupClickHandler() {
  successPopup.remove();
  document.removeEventListener('click', successPopupClickHandler);
  document.removeEventListener('keydown', successPopupKeydownHandler);
}

function successPopupKeydownHandler(evt) {
  if (evt.key === 'Escape') {
    successPopup.remove();
    document.removeEventListener('click', successPopupClickHandler);
    document.removeEventListener('keydown', successPopupKeydownHandler);
  }
}

function failPopupClickHandler() {
  failPopup.remove();
  document.removeEventListener('click', failPopupClickHandler);
  document.removeEventListener('keydown', failPopupKeydownHandler);
}

function failPopupKeydownHandler(evt) {
  if (evt.key === 'Escape') {
    failPopup.remove();
    document.removeEventListener('click', failPopupClickHandler);
    document.removeEventListener('keydown', failPopupKeydownHandler);
  }
}

const showFailMessage = (message) => {
  const fail = document.createElement('div');
  fail.classList.add('fail');
  fail.textContent = message;

  document.body.insertAdjacentElement('beforebegin', fail);

  setTimeout(() => {
    fail.remove();
  }, 5000);
};

export { showSuccessPopup, showFailPopup, showFailMessage };
