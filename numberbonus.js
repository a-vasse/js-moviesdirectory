const numbers = [
  {long_number: 11111},
  {long_number: 2222222},
  {long_number: 33333333333},
  {long_number: 44444444444444},
]

const output = document.querySelector('.numbers');

output.innerHTML = numbers.map(function (number) {
	return `
    <div class="panel">
      <p>${numberWithCommas(number.long_number)}</p>
    </div>`;
}).join('');

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
