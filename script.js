const endpoint = 'movies.json';

const movies = [];
fetch(endpoint)
  .then(blob => blob.json())
  .then(data => movies.push(...data));

function findMatches(wordToMatch, movies) {
  return movies.filter(movie => {
    const regex = new RegExp(wordToMatch, 'gi');
    return movie.Title.match(regex) || movie.Director.match(regex)
  });
}

function displayMatches() {
  const matchArray = findMatches(this.value, movies);
  const html = matchArray.map(movie => {

    //splitting up the release date
    const [month, day, year] = movie['Release Date'].split(' ')

    //highlighting the search query
    const regex = new RegExp(this.value, 'gi');
    const movieName = movie.Title.replace(regex,
      `<span class="hl">${this.value}</span>`
      );
    const directorName = movie.Director.replace(regex,
      `<span class="hl">${this.value}</span>`
      );

    //inserting the HTML
    return `
      <li>
        <span class="title">${movieName} (${year})</span>
        <span class="director">${directorName}</span>
      </li>`;
  }).join('');
  suggestions.innerHTML = html;
}



const search = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

search.addEventListener('change', displayMatches)
search.addEventListener('keyup', displayMatches)
