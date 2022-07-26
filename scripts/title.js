const KEY = 'k_193d1vt4';
const URL = 'https://imdb-api.com/API';

const fetchTitleData = async (id) => {
    const url = URL + '/Title/' + KEY + '/' + id;
    const response = await fetch(url);
    const data = await response.json();
    return data
};
const fetchTitleTrailer = async (id) => {
    const url = URL + '/YouTubeTrailer/' + KEY + '/' + id;
    const response = await fetch(url);
    const data = await response.json();
    return data
};

document.addEventListener("DOMContentLoaded", async () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const { titleId } = Object.fromEntries(urlSearchParams.entries());

    if (!titleId) return;
    const spinner = document.getElementById('search-spinner');
    const titleContainer = document.getElementById('title');

    spinner.classList.remove('d-none');

    const titleData = await fetchTitleData(titleId);
    const titleTrailer = await fetchTitleTrailer(titleId);
    console.log(titleTrailer);
    
    console.log(titleData);

    const titleHtml = `
        <div class="title__container d-flex">
            <a class="title__poster me-5" href="${titleData.image}" target="_blank">
                <img src="${titleData.image}" alt="${titleData.title}" class="title__poster-image">
            </a>
            
            <div class="title__content">
                <h1 class="title__name mb-3">${titleData.fullTitle}</h1>
                <div class="mb-2">${titleData.genres}</div>
                <div class="title__description mb-2 fs-5">${titleData.plot}</div>
                <div class="mb-5">
                    Release ${titleData.releaseDate}<br>
                    Rating ${titleData.imDbRating}<br>
                    Votes ${titleData.imDbRatingVotes}
                </div>
            </div>
        </div>

        <div class="d-flex justify-content-center mt-5">
            <iframe class="title__trailer" width="900" height="500" src="https://www.youtube.com/embed/${titleTrailer.videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>

        
    `;



    titleContainer.innerHTML = titleHtml;

    titleContainer.classList.remove('d-none');
    spinner.classList.add('d-none');
});