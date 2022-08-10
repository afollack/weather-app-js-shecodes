//Date Section
let now = new Date();

let date = now.getDate();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let month = months[now.getMonth()];

let hours = now.getHours();

function formatHoursTo12(now) {
  return now.getHours() % 12 || 12;
}

let minutes = now.getMinutes();

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
minutes = checkTime(minutes);

let todaysDate = document.querySelector("#todays-date");

todaysDate.innerHTML = `${day}, ${month} ${date} ${hours}:${minutes}`;

//Search Section

function showWeatherData(response) {
  console.log(response.data.main.temp);
  console.log(response.data.name);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = `${temperature}°`;
  let currentLocation = document.querySelector("#location");
  currentLocation.innerHTML = response.data.name;
}

function searchLocation(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#location-search-input");
  let location = document.querySelector("#location");
  if (searchInput.value) {
    location.innerHTML = `${searchInput.value}`;
  } else {
    alert("Please search a location!");
  }
  location.innerHTML = `${searchInput.value}`;
  searchInput.value = "";
  let apiKey = "c77c1ca17d20c46264d7b3958f6293e6";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=`;
  axios
    .get(`${apiUrl}${location.innerHTML}&units=${units}&appid=${apiKey}`)
    .then(showWeatherData);
}

let search = document.querySelector("#location-search");

search.addEventListener("submit", searchLocation);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  console.log(latitude);
  console.log(longitude);
  let apiKey = "c77c1ca17d20c46264d7b3958f6293e6";
  let apiUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeatherData);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
navigator.geolocation.getCurrentPosition(showPosition);

let locate = document.querySelector("#locate-me");

locate.addEventListener("click", getCurrentPosition);
/*Celsius to Farenheit

function convertFahrenheit(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = 100;
}

function convertCelsius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = 38;
}

let fahrSwitch = document.querySelector("#fahr");
fahrSwitch.addEventListener("click", convertFahrenheit);
let celSwitch = document.querySelector("#cel");
celSwitch.addEventListener("click", convertCelsius);
*/
