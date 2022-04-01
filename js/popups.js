const successElement = document.querySelector('#success').content.children[0];
const failElement = document.querySelector('#error').content.children[0];

const showSuccess = () => {
  document.body.insertAdjacentElement('beforeend', successElement);

  document.addEventListener('click', onSuccessClick);
  document.addEventListener('keydown', onSuccessKeydown);
};

function onSuccessClick() {
  successElement.remove();
  document.removeEventListener('click', onSuccessClick);
  document.removeEventListener('keydown', onSuccessKeydown);
}

function onSuccessKeydown(evt) {
  if (evt.key === 'Escape') {
    successElement.remove();
    document.removeEventListener('click', onSuccessClick);
    document.removeEventListener('keydown', onSuccessKeydown);
  }
}

const showFail = () => {
  document.body.insertAdjacentElement('beforeend', failElement);

  document.addEventListener('click', onFailClick);
  document.addEventListener('keydown', onFailKeydown);
};

function onFailClick() {
  failElement.remove();
  document.removeEventListener('click', onFailClick);
  document.removeEventListener('keydown', onFailKeydown);
}

function onFailKeydown(evt) {
  if (evt.key === 'Escape') {
    failElement.remove();
    document.removeEventListener('click', onFailClick);
    document.removeEventListener('keydown', onFailKeydown);
  }
}

const showErrorMessage = (message) => {
  const fail = document.createElement('div');
  fail.classList.add('fail');
  fail.textContent = message;

  document.body.insertAdjacentElement('beforebegin', fail);

  setTimeout(() => {
    fail.remove();
  }, 5000);
};

export { showSuccess, showFail, showErrorMessage };
