const endpoint = 'movies.json';

const movies = [];

//json array population
fetch(endpoint)
  .then(blob => blob.json())
  .then(data => movies.push(...data));

//takes search query and matches them with array built from json
function findMatches(wordToMatch, movies) {
  return movies.filter(movie => {
    const regex = new RegExp(wordToMatch, 'gi');
    return movie.Title.match(regex) || movie.Director.match(regex)
  });
}

//outputs the found matches
function displayMatches() {
  const matchArray = findMatches(this.value, movies);

  //sorts the matches alphabetically
  const sortedMovies = matchArray.sort(function(a, b) {
    if(a.Title > b.Title) {
      return 1;
    } else {
      return -1;
    }
  })

  //builds the HTML
  const html = sortedMovies.map(movie => {
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
