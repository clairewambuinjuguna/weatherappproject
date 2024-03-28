const apiKey = "047e82a3493503fd3349718fd1e42b74";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const weatherIcon = document.querySelector(".weather-icon");
const weatherDescription = document.querySelector(".weather-description");

const cityElement = document.querySelector(".city");
const tempElement = document.querySelector(".temp");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");
const dateTimeElement = document.querySelector(".date-time");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (!response.ok) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    console.error("Error fetching weather data. HTTP Status:", response.status);
    return;
  }

  const data = await response.json();

  if (data.weather[0].main === "Clouds") {
    weatherIcon.src = "./assets/clouds.png";
  } else if (data.weather[0].main === "Drizzle") {
    weatherIcon.src = "./assets/drizzle.png";
  } else if (data.weather[0].main === "Clear") {
    weatherIcon.src = "./assets/clear.png";
  } else if (data.weather[0].main === "Rain") {
    weatherIcon.src = "./assets/rainy.png";
  } else if (data.weather[0].main === "Mist") {
    weatherIcon.src = "./assets/mist.png";
  } else if (data.weather[0].main === "Snow") {
    weatherIcon.src = "./assets/snow.png";
  }

  weatherDescription.textContent = data.weather[0].description;

  document.querySelector(".weather").style.display = "block";
  document.querySelector(".error").style.display = "none";

  cityElement.innerHTML = data.name;
  tempElement.innerHTML = Math.round(data.main.temp) + "°C";
  humidityElement.innerHTML = data.main.humidity + "%";
  windElement.innerHTML = data.wind.speed + "km/h";

  dateTimeElement.innerHTML = formatDate(new Date());

  // Get forecast after retrieving weather data
  getForecast(city);
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value.trim());
});

searchBox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    checkWeather(searchBox.value.trim());
  }
});

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

function getForecast(city) {
  let apiKey = "f3793ob0fb2a47bb6356018f3e03t604";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml += `
      <div class="row">
        <div class="col-2">
          <div class="weather-forecast-date">${formatDay(day.time)}</div>
          <img src="${day.condition.icon_url}" alt="" class="forecast-icon" />
          <div class="weather-forecast-temperature">
            <span class="max-temp">${day.temperature.maximum} °C</span> 
            <span class="min-temp">${day.temperature.minimum} °C</span>
          </div>
        </div>
      </div>`;
    }
  });
  forecastElement.innerHTML = forecastHtml;
}
