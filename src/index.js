const axios = require("axios");

const apiKey = "f3793ob0fb2a47bb6356018f3e03t604";
const apiUrl =
  "https://api.shecodes.io/weather/v1/current?query={query}&key={apiKey}";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const cityElement = document.querySelector(".city");
const tempElement = document.querySelector(".temp");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");

async function checkWeather(city) {
  try {
    const response = await axios.get(apiUrl, {
      params: {
        query: city,
        key: apiKey,
      },
    });

    const data = response.data.data;

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";

    cityElement.innerHTML = data.city;
    tempElement.innerHTML = Math.round(data.temp) + "°C";
    humidityElement.innerHTML = data.humidity + "%";
    windElement.innerHTML = data.wind.speed + "km/h";
  } catch (error) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    console.error("Error fetching weather data:", error);
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value.trim());
});

searchBox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    checkWeather(searchBox.value.trim());
  }
});
