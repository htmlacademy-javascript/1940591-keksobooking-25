function generateRandomInteger(min, max) {
  if ((typeof min === 'number' && typeof max === 'number') && (min >= 0 && min < max)) {
    const difference = Math.floor(max) - Math.ceil(min);

    let randomInteger = Math.ceil(Math.random() * difference);
    randomInteger += Math.ceil(min);

    return randomInteger;
  }

  const errorMessage = 'Неверно задан диапазон';

  return errorMessage;
}

generateRandomInteger(2, 5);

function generateRandomFloat(min, max, symbolsQuantity) {
  if ((typeof min === 'number' && typeof max === 'number' && typeof symbolsQuantity === 'number') && (min >= 0 && min < max && symbolsQuantity >= 0)) {

    const difference = Math.floor(max) - Math.ceil(min);
    const fractionalNumbers = Math.pow(10, symbolsQuantity);

    let randomFloat = Math.random() * difference + Math.ceil(min);
    randomFloat = Math.floor(randomFloat * fractionalNumbers) / fractionalNumbers;

    return randomFloat;
  }

  let errorMessage = 'Неверно задан диапазон';

  if (symbolsQuantity < 0 || typeof symbolsQuantity !== 'number') {
    errorMessage = 'Неверно задан количество знаков после запятой';
  }

  return errorMessage;
}

generateRandomFloat(56.544, 65.654, 9);
