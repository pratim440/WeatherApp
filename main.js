const api = {
  key: "ef38631b1bb45a62c45f109c04dc8fdc",
  base: "https://api.openweathermap.org/data/2.5/",
};

$(".search-box").keydown(setQuery);
function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
    window.localStorage.setItem("city", JSON.stringify(searchbox.value));
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then((data) => {
      displayResults(data);
      searchbox.value = "";
    });
}
window.localStorage.getItem("city")
  ? getResults(JSON.parse(window.localStorage.getItem("city")))
  : getResults("Delhi");

function displayResults(weather) {
  $(".location .city").html(`${weather.name}, ${weather.sys.country}`);
  $(".location .date").text(dateBuilder(new Date()));
  $(".current .temp").html(`${Math.round(weather.main.temp)}<span>°c</span>`);
  $(".current .weather").text(weather.weather[0].main);
  $(".hi-low").text(
    `Min: ${Math.round(weather.main.temp_min)}°c / Max: ${Math.round(
      weather.main.temp_max
    )}°c`
  );
}

function dateBuilder(d) {
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
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
