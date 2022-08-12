export function renderCountriesList(list, listBox) {
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
