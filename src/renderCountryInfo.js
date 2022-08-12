export function renderCountryInfo(list, box) {

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