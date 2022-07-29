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

    const actorsHtml = titleData.actorList.map((actor) => `
        <div class="card actor-card swiper-slide">
            <div class="actor-image-wrapper">
                <img src="${actor.image}" class="card-img-top" alt="${actor.name}">
            </div>
            <div class="card-body">
                <div class="fs-5 text-black">
                    ${actor.name}
                </div>
                <div class="text-secondary">
                    as ${actor.asCharacter}
                </div>
            </div>
        </div>
    `).join('');

    const similarsHtml = titleData.similars.map((similar) => `
        <div class="card similar-card swiper-slide">
            <a href="./title.html?titleId=${similar.id}" class="similar-image-wrapper">
                <img src="${similar.image}" class="card-img-top" alt="${similar.title}">
            </a>
            <div class="card-body pb-0">
                <div class="fs-5 text-black">
                    ${similar.title}
                </div>
            </div>
        </div>
    `).join('');


    const titleHtml = `
        <div class="title__container d-md-flex">
            <a class="title__poster d-block text-center" href="${titleData.image}" target="_blank">
                <img src="${titleData.image}" alt="${titleData.title}" class="title__poster-image">
            </a>
            
            <div class="title__content mt-5 mt-md-0 ms-md-5">
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
        
        <h3 class="mt-5">
            Actors
        </h3>

        <div class="actor-list mt-3 actor-slider swiper">
            <div class="swiper-wrapper">
                ${actorsHtml}
            </div>

            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
        </div>

        </div>

        <h3 class="mt-5">
            Trailer
        </h3>

        <div class="d-flex justify-content-center mt-3">
            <iframe class="title__trailer" src="https://www.youtube.com/embed/${titleTrailer.videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>

        
        <h3 class="mt-5">
            Similars
        </h3>
        <div class="actor-list mt-3 mb-5 similar-slider swiper">
            <div class="swiper-wrapper">
                ${similarsHtml}
            </div>

            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
        </div>
        
    `;



    titleContainer.innerHTML = titleHtml;

    new Swiper(".actor-slider", {
        slidesPerView: 5,
        spaceBetween: 30,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            "320": {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            "475": {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            "767": {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            "1024": {
              slidesPerView: 4,
              spaceBetween: 30,
            },
            "1440": {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          },
    });

    new Swiper(".similar-slider", {
        slidesPerView: 5,
        spaceBetween: 30,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        loop: true,
        breakpoints: {
            "320": {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            "475": {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            "767": {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            "1024": {
              slidesPerView: 4,
              spaceBetween: 30,
            },
            "1440": {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          },
    });

    titleContainer.classList.remove('d-none');
    spinner.classList.add('d-none');
});