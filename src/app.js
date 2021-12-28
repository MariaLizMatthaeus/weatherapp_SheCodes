let now = new Date();
let exactCurrentTime = document.querySelector("#exact-current-time");
let exactCurrentDate = document.querySelector("#exact-current-date");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let currentDay = days[now.getDay()];
let currentHour = now.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinutes = now.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}
let currentYear = now.getFullYear();
let currentMonth = months[now.getMonth()];
let currentDate = now.getDate();
exactCurrentTime.innerHTML = `${currentDay} ${currentHour}:${currentMinutes}`;
exactCurrentDate.innerHTML = `${currentDate} ${currentMonth} ${currentYear}`;

function showWeatherCon(response) {
  let cityTitle = document.querySelector("#main-city");
  cityTitle.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  console.log(response);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = temperature;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Precipitation: ${response.data.main.humidity}%`;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
}

function searchCity(city) {
  let apiKey = "42b8ba4c0d3eac619d09938449fa1571";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeatherCon);
}

function showCitySearch(search) {
  search.preventDefault();
  let searchCityInput = document.querySelector("#search-box-input").value;
  searchCity(searchCityInput);
  let city = document.querySelector("#search-box-input");
  city.innerHTML = city;
}

function searchLocation(position) {
  let apiKey = "42b8ba4c0d3eac619d09938449fa1571";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeatherCon);
}

function getCurrLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPositionTemp);
}

function unitSwitchF(event) {
  event.preventDefault();
  let fahrenheit = document.querySelector("#current-temp");
  fahrenheit.innerHTML = 39;
}
let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", unitSwitchF);

function unitSwitchC(event) {
  event.preventDefault();
  let celsius = document.querySelector("#current-temp");
  celsius.innerHTML = 4;
}
let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", unitSwitchC);

let form = document.querySelector("#search-form");
form.addEventListener("submit", showCitySearch);

let button = document.querySelector("#current-button");
button.addEventListener("click", getCurrLocation);
searchCity("berlin");
