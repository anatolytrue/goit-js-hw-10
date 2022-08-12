
import Notiflix from 'notiflix';

export default function fetchCountries(name) {
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

// fetch('https://restcountries.com/v3.1/name/{name}')
//     .then function(res) {
//     console.log(res)
// }