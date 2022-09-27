'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

//-->OLD WAY OF DOING REQUESTS - XML REQUESTS
//-->#1.Create a new request object
const request = new XMLHttpRequest();
//-->#2.Defines a request to the 3rd part API entry point
request.open('GET', 'https://restcountries.com/v2/name/portugal'); //open request
//-->#3.Sends the request for fetching data
request.send();
// console.log(request);

request.addEventListener('load', function () {
  // console.log(this.responseText);
  const [data] = JSON.parse(this.responseText);
  console.log(data);
});
