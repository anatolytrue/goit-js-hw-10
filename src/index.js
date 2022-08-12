import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries';
import { inputCountry, listCountry, infoCountry } from './refs';
import renderCountriesList from './renderCountriesList';
import renderCountryInfo from './renderCountryInfo';
import checkAmountCountriesAndRender from './checkAmountCountriesAndRender'



const DEBOUNCE_DELAY = 300;
const debounce = require('lodash.debounce')

inputCountry.addEventListener('input', debounce(renderCountryByName, DEBOUNCE_DELAY));

function renderCountryByName(e) {
    const value = e.target.value.toLowerCase().trim();
    if (!value) {
        listCountry.innerHTML = '';
        infoCountry.innerHTML = '';
        return
    }
    fetchCountries(value)
        .then(checkAmountCountriesAndRender)
        .catch(error => console.log('Oops, there is no country with that name'));
}




// function createCountryList({ name: { official }, flags: {svg} }) {
//     return `
//     <li class="country__item">
//         <img src="${svg}" alt="flag" wigth="20" height="20">
//         <p>${official}</p>
//     </li>
//     `;
// }

