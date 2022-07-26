// const KEY = 'k_193d1vt4';
// const URL = 'https://imdb-api.com/API';

// const searchMovies = async (value) => {
//     const url = URL + '/Search/' + KEY + '/' + value;
//     const response = await fetch(url);
//     const { results } = await response.json();

//     return results;
// };

// const renderMovies = (movies) => {
//     const searchResult = document.getElementById('search-result');

//     movies.forEach(({ title, description, image }) => {
//         const movieCard = `
//             <div class="card">
//                 <div class="card-img-wrapper">
//                     <img src="${image}" class="card-img-top" alt="${title}">
//                 </div>
//                 <div class="card-body">
//                     <h5 class="card-title">${title}</h5>
//                     <p class="card-text">${description}</p>
//                 </div>
//             </div>
//         `;

//         searchResult.innerHTML += movieCard;
//     });
// };


// const onSearchFormSubmit = async (e) => {
//     e.preventDefault();

//     const input = e.target[0];
//     const value = input.value;
//     const button = e.target[1];
//     const spinner = document.getElementById('search-spinner');
//     const searchResult = document.getElementById('search-result');
//     const searchNotFound = document.getElementById('search-not-found');
    
//     searchResult.innerHTML = '';

//     input.setAttribute('disabled', true);
//     button.setAttribute('disabled', true);
//     spinner.classList.remove('d-none');
//     searchNotFound.classList.add('d-none');

//     const movies = await searchMovies(value);

//     if (!movies || movies.length === 0) searchNotFound.classList.remove('d-none');
//     if (movies && movies.length) renderMovies(movies);

//     input.removeAttribute('disabled');
//     button.removeAttribute('disabled');
//     spinner.classList.add('d-none');
// }

// const searchForm = document.getElementById('search-form');
// searchForm.addEventListener('submit', onSearchFormSubmit)