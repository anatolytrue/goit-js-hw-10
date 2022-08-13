import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';


const refs = {
    inputCountry: document.querySelector('#search-box'),
    listCountry: document.querySelector('.country-list'),
    infoCountry: document.querySelector('.country-info')
}

let limit = 10;
const DEBOUNCE_DELAY = 300;
const debounce = require('lodash.debounce')

refs.inputCountry.addEventListener('input', debounce(renderCountryByName, DEBOUNCE_DELAY));

function renderCountryByName(e) {
    const value = e.target.value.toLowerCase().trim();
    if (!value) {
        refs.listCountry.innerHTML = '';
        refs.infoCountry.innerHTML = '';
        return
    }
    fetchCountries(value)
        .then(checkAmountCountriesAndRender)
        .catch(error => console.log('Oops, there is no country with that name'));
}

function renderCountriesList(list, listBox) {
    const markup = list
    .map(
    ({ flags: { svg }, name: { official } }) =>
        `<li class="country-list__item">
<img src="${svg}" alt="flag" width="30">
<h1 class="country-list__title">${official}</h1>
    </li>`
    )
    .join('');
    return (listBox.innerHTML = markup);
}

function renderCountryInfo(list, box) {

    const createList = list
        .map(
            ({
                name: { official },
                capital,
                population,
                flags: { svg },
                languages,
            }) => 
                `<div class="country-info__box"><img src="${svg}" alt="flag" width="30">
                <h1 class="country-info__main-title">${official}</h1></div>
                <ul class="country-info__list">
                <li class="country-info__item">
                <h2 class="country-info___title">Capital:</h2>
                <p class="country-info___text">${capital}</p>
                </li>
                <li class="country-info__item">
                    <h2 class="country-info___title">Population:</h2>
                <p class="country-info___text">${population}</p>
                </li>
                <li class="country-info__item">
                <h2 class="country-info___title">Languages:</h2>
                <p class="country-info___text">${Object.values(languages)}</p></li>
                </ul>`
    ).join('');
    
    return (box.innerHTML = createList);

}

function checkAmountCountriesAndRender(list) {
  if (list.length > limit) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (list.length <= limit && list.length > 1) {
    refs.listCountry.innerHTML = '';
    refs.infoCountry.innerHTML = '';
    renderCountriesList(list, refs.listCountry);
  } else {
    refs.listCountry.innerHTML = '';
    refs.infoCountry.innerHTML = '';
    renderCountryInfo(list, refs.infoCountry);
    return;
  }
}

function fetchCountries(name) {
    const filters = 'name,capital,population,flags,languages';
    const url = `https://restcountries.com/v3.1/name/${name}?fields=${filters}`;
    return fetch(url).then(response => {
        if (!response.ok) {
            return Notiflix.Notify.failure(
                "Oops, there is no country with that name"
            );
        }
        return response.json();
    });
}






// function createCountryList({ name: { official }, flags: {svg} }) {
//     return `
//     <li class="country__item">
//         <img src="${svg}" alt="flag" wigth="20" height="20">
//         <p>${official}</p>
//     </li>
//     `;
// }

