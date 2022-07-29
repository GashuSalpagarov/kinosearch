const KEY = 'k_193d1vt4';
const URL = 'https://imdb-api.com/API';

const searchMovies = async (value) => {
    const url = URL + '/Search/' + KEY + '/' + value;
    const response = await fetch(url);
    const { results } = await response.json();

    return results;
};

const renderMovies = (movies) => {
    const searchResult = document.getElementById('search-result');

    movies.forEach(({ title, description, image, id }) => {
        const movieCard = `
            <div class="card">
                <a href="./title.html?titleId=${id}" target="_blank" class="card-img-wrapper">
                    <img src="${image}" class="card-img-top" alt="${title}">
                </a>
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${description}</p>
                </div>
            </div>
        `;

        searchResult.innerHTML += movieCard;
    });
};

const onSearch = async (value) => {
    const input = document.getElementById('search-form-input');
    const button = document.getElementById('search-form-btn');
    const spinner = document.getElementById('search-spinner');
    const searchResult = document.getElementById('search-result');
    const searchNotFound = document.getElementById('search-not-found');

    searchResult.innerHTML = '';

    input.setAttribute('disabled', true);
    button.setAttribute('disabled', true);
    spinner.classList.remove('d-none');
    searchNotFound.classList.add('d-none');

    const movies = await searchMovies(value);

    if (!movies || movies.length === 0) searchNotFound.classList.remove('d-none');
    if (movies && movies.length) renderMovies(movies);

    input.removeAttribute('disabled');
    button.removeAttribute('disabled');
    spinner.classList.add('d-none');
}


const onSearchFormSubmit = async (e) => {
    e.preventDefault();

    const input = e.target[0];
    const value = input.value;
    onSearch(value);
}

const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', onSearchFormSubmit)


document.addEventListener("DOMContentLoaded", () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const { search } = Object.fromEntries(urlSearchParams.entries());
    const input = document.getElementById('search-form-input');

    if(!search) return;
    input.value = search;
    onSearch(search);
});