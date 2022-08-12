import renderCountriesList from './renderCountriesList';
import renderCountryInfo from './renderCountryInfo';
import Notiflix from 'notiflix';
import { inputCountry, listCountry, infoCountry } from './refs';
let limit = 10;

export function checkAmountCountriesAndRender(list) {
  if (list.length > limit) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (list.length <= limit && list.length > 1) {
    listCountry.innerHTML = '';
    infoCountry.innerHTML = '';
    renderCountriesList(list, listCountry);
  } else {
    listCountry.innerHTML = '';
    infoCountry.innerHTML = '';
    renderCountryInfo(list, infoCountry);
    return;
  }
}