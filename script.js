'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// //-->OLD WAY OF DOING REQUESTS - XML REQUESTS

// /////////////////GET THE COUNTRY//////////////////////
// const getCountryData = function (country) {
//   //-->#1.Create a new request object
//   const request = new XMLHttpRequest();
//   //-->#2.Defines a request to the 3rd part API entry point
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`); //open request
//   //-->#3.Sends the request for fetching data
//   request.send();
//   // console.log(request);

//   request.addEventListener('load', function () {
//     // console.log(this.responseText);
//     //-->#1.Turn received JSON data to readable javascript object
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     //-->#2.Prep HTML fragment based on the information received
//     const html = `
//     <article class="country">
//       <img class="country__img" src="${data.flags.svg}" />
//       <div class="country__data">
//         <h3 class="country__name">${data.name.common}</h3>
//         <h4 class="country__region">${data.region}</h4>
//         <p class="country__row"><span>👫</span>${(
//           +data.population / 1_000_000
//         ).toFixed(1)} M people</p>
//         <p class="country__row"><span>🗣️</span>${
//           Object.values(data.languages)[0]
//         }</p>
//         <p class="country__row"><span>💰</span>${
//           Object.values(data.currencies)[0].name
//         }</p>
//       </div>
//     </article>
//     `;
//     //-->#3.Insert the HTML fragment into HTML body
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// getCountryData('portugal');
// getCountryData('usa');
// getCountryData('turkiye');
// getCountryData('germany');

// /////////////////GET THE COUNTRY+NEIGHBOURS//////////////////////
// const getCountryAndNeighbourData = function (country) {
//   //-->AJAX CALL FOR COUNTRY #1
//   //-->#1.Create a new request object
//   const request = new XMLHttpRequest(); // OLD WAY OF DOING REQUESTS - XML REQUESTS
//   //-->#2.Defines a request to the 3rd part API entry point
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`); //open request
//   //-->#3.Sends the request for fetching data
//   request.send();
//   // console.log(request);
//   //EVENTHANDLER - RENDER COUNTRY 1 UPON RECEIVING DATA
//   request.addEventListener('load', function () {
//     // console.log(this.responseText);
//     //-->#1.Turn received JSON data to readable javascript object
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     renderCountry(data);

//     //-->AJAX CALL FOR COUNTRY #....
//     const neighbour = data.borders;
//     console.log(neighbour);

//     if (!neighbour) return; //GUARD CLAUSE - IF NO NEIGHBOUR DO NOTHING

//     if (neighbour.length > 4) {
//       countriesContainer.style.flexWrap = 'wrap';
//       countriesContainer.style.gap = '30px';
//     }

//     neighbour.forEach(country => {
//       const request = new XMLHttpRequest();
//       request.open('GET', `https://restcountries.com/v3.1/alpha/${country}`);
//       request.send();

//       //EVENTHANDLER - RENDER COUNTRY *** UPON RECEIVING DATA
//       request.addEventListener('load', function () {
//         const [data] = JSON.parse(this.responseText);
//         console.log(data);
//         renderCountry(data, 'neighbour'); //second argument by definition @ the function provides an extra class name to diffrentiate the country from its neightbours
//       });
//     });
//   });
// };

// //FUNCTION RENDER COUNTRY CARD
// function renderCountry(data, className = '') {
//   //second argument by definition @ the function provides an extra class name to diffrentiate the country from its neightbours. By default its nothing for the original country
//   //-->#2.Prep HTML fragment based on the information received
//   const html = `
//     <article class="country ${className}">
//       <img class="country__img" src="${data.flags.svg}" />
//       <div class="country__data">
//         <h3 class="country__name">${data.name.common}</h3>
//         <h4 class="country__region">${data.region}</h4>
//         <p class="country__row"><span>👫</span>${(
//           +data.population / 1_000_000
//         ).toFixed(1)} M people</p>
//         <p class="country__row"><span>🗣️</span>${
//           Object.values(data.languages)[0]
//         }</p>
//         <p class="country__row"><span>💰</span>${
//           Object.values(data.currencies)[0].name
//         }</p>
//       </div>
//     </article>
//     `;
//   //-->#3.Insert the HTML fragment into HTML body
//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
// }

// //INIT APP
// getCountryAndNeighbourData('turkiye');

////////////////////////////////////////////////////

// //-->NEW WAY OF DOING REQUESTS - FETCH API

// let country = 'portugal';
// const request = fetch(`https://restcountries.com/v3.1/name/${country}`);
// console.log(request);

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`) //fetch data from this entry point API asyncronously
//     .then(function (response) {
//       console.log(response);
//       return response.json(); //-->#1 PROMISE <then>, the fetched data is also an de-jsoned via async json() function
//     })
//     .then(function (data) {
//       //-->#2 PROMISE <then>, from then which we receive the final data to use in our code
//       console.log(data);
//     });
// };
// getCountryData(country);

let country = 'turkiye';
const request = fetch(`https://restcountries.com/v3.1/name/${country}`);
console.log(request);

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`) //fetch data from this entry point API asyncronously
    // .then(
    //   response => response.json(),
    //   err => alert(err) //we can either catch errors individually
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      // console.log(data[0]);
      const neighbour = data[0].borders;
      if (!neighbour) return; //GUARD CLAUSE for noin-existing borders
      if (neighbour.length > 4) {
        countriesContainer.style.flexWrap = 'wrap';
        countriesContainer.style.gap = '30px';
      } //rearrange css for neigbours greater than 4
      // console.log(neighbour);
      neighbour.forEach(country => {
        fetch(`https://restcountries.com/v3.1/alpha/${country}`)
          // .then(
          //   response => response.json(),
          //   err => alert(err)
          // ) //we can either catch errors individually
          .then(response => response.json())
          .then(data => renderCountry(data[0], 'neighbour'));
      });
    })
    .catch(err => {
      console.error(`${err}🚫`);
      renderError(`Something went wrong 💥💥 ${err.message}`);
    }) //we can catch async errors globally at the end of the encapsulated code
    .finally(() => {
      countriesContainer.style.opacity = 1; //REMOVED AND PUT IN FINALLY() METHOD AS ITS A COMMON EXERCISE FOR ALL TASKS - WHETHER ITS AN ERROR OR SUCCESS
    }); //NOTE: usefull in operations of terminating a spinner no matter it throws an error or success.
};

//EVENTHANDLER - BTN
btn.addEventListener('click', function () {
  getCountryData(country);
});

//FUNCTION RENDER ERROR
function renderError(msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1; //REMOVED AND PUT IN FINALLY() METHOD AS ITS A COMMON EXERCISE FOR ALL TASKS - WHETHER ITS AN ERROR OR SUCCESS
}

//FUNCTION RENDER COUNTRY CARD
function renderCountry(data, className = '') {
  //second argument by definition @ the function provides an extra class name to diffrentiate the country from its neightbours. By default its nothing for the original country
  //-->#2.Prep HTML fragment based on the information received
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flags.svg}" />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1_000_000
        ).toFixed(1)} M people</p>
        <p class="country__row"><span>🗣️</span>${
          Object.values(data.languages)[0]
        }</p>
        <p class="country__row"><span>💰</span>${
          Object.values(data.currencies)[0].name
        }</p>
      </div>
    </article>
    `;
  //-->#3.Insert the HTML fragment into HTML body
  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1; //REMOVED AND PUT IN FINALLY() METHOD AS ITS A COMMON EXERCISE FOR ALL TASKS - WHETHER ITS AN ERROR OR SUCCESS
}
