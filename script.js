'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const getCountryData = function (country) {
  //-->OLD WAY OF DOING REQUESTS - XML REQUESTS
  //-->#1.Create a new request object
  const request = new XMLHttpRequest();
  //-->#2.Defines a request to the 3rd part API entry point
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`); //open request
  //-->#3.Sends the request for fetching data
  request.send();
  // console.log(request);

  request.addEventListener('load', function () {
    // console.log(this.responseText);
    //-->#1.Turn received JSON data to readable javascript object
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    //-->#2.Prep HTML fragment based on the information received
    const html = `
    <article class="country">
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
    countriesContainer.style.opacity = 1;
  });
};

getCountryData('portugal');
getCountryData('usa');
getCountryData('turkiye');
getCountryData('germany');
