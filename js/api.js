const getOffers = (onSuccess, onFail) => fetch('https://25.javascript.pages.academy/keksobooking/data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error('Не удалось загрузить данные об объявлениях');
  })
  .then((data) => {
    onSuccess(data);
  })
  .catch((err) => {
    onFail(err.message);
  });

const sendOffer = (onSuccess, onFail, body) => fetch(
  'https://25.javascript.pages.academy/keksobooking',
  {
    method: 'post',
    body,
  })
  .then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onFail();
    }
  })
  .catch(() => {
    onFail();
  });

export { getOffers, sendOffer };
