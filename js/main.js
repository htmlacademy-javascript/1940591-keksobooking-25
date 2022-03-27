import { disablePage, enablePage } from './page-state.js';
import { setOfferFormSubmit, setOfferFormReset } from './offer-form.js';
import { setMap, indicateOffers } from './map.js';
import { getOffers } from './api.js';
import { showFailMessage } from './util.js';

disablePage();

setMap(enablePage);

getOffers(indicateOffers, showFailMessage);

setOfferFormSubmit();
setOfferFormReset();
