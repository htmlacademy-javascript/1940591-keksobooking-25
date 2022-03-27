const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomFloat = (a, b, digits = 1) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));

  const result = Math.random() * (upper - lower) + lower;

  return +result.toFixed(digits);
};

const getRandomId = (a, b) => {
  const previousValues = [];

  return () => {
    let currentValue = getRandomInteger(a, b);
    if (previousValues.length >= (b - a + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(a, b);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

const getRandomArray = (array) => Array.from({ length: getRandomInteger(1, array.length) }, (_, i) => array[i]);

const showFailMessage = (message) => {
  const fail = document.createElement('div');
  fail.classList.add('fail');
  fail.textContent = message;

  document.body.insertAdjacentElement('beforebegin', fail);

  setTimeout(() => {
    fail.remove();
  }, 5000);
};

export {
  getRandomInteger,
  getRandomFloat,
  getRandomId,
  getRandomArrayElement,
  getRandomArray,
  showFailMessage,
};
