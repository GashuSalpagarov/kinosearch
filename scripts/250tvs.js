const KEY = 'k_193d1vt4';
const URL = 'https://imdb-api.com/API';

const fetchTitles = async (api) => {
    const url = URL + api + KEY;
    const response = await fetch(url);
    const { items } = await response.json();

    return items;
};

const renderTitles = (container, array) => {
    if (!container || !array) return;

    array.forEach(({ fullTitle, image, id }) => {
        const titleCard = `
            <div class="card">
                <a href="./title.html?titleId=${id}" target="_blank" class="card-img-wrapper">
                    <img src="${image}" class="card-img-top" alt="${fullTitle}">
                </a>
                <div class="card-body">
                    <h5 class="card-title">${fullTitle}</h5>
                </div>
            </div>
        `;

        container.innerHTML += titleCard;
    });
}

const spinner = document.getElementById('search-spinner');
const pageContent = document.querySelector('.page-content');

const top250TVsContainer = document.getElementById('top-250-tvs');

const initPage = async () => {
    const tvs = await fetchTitles('/Top250TVs/');

    renderTitles(top250TVsContainer, tvs);

    spinner.classList.add('d-none');
    pageContent.classList.remove('d-none');
}

initPage();