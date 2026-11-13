
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherInfo = document.getElementById("weatherInfo");

searchBtn.addEventListener("click", async function() {

    const city = cityInput.value;

    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=5&language=en&format=json`;

    const response = await fetch(url);

    const data = await response.json();

    // console.log(data);
    if (data.results) {

    const latitude = data.results[0].latitude;
    const longitude = data.results[0].longitude;

    console.log("Latitude:", latitude);
    console.log("Longitude:", longitude);




const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`;

const weatherResponse = await fetch(weatherUrl);

const weatherData = await weatherResponse.json();

// 


const current = weatherData.current;




let condition = "";

let weatherIcon = "";


if (current.weather_code === 0) {
    condition = "Clear Sky";
    weatherIcon = "☀️";

} else if (current.weather_code === 1 || current.weather_code === 2) {
    condition = "Partly Cloudy";
    weatherIcon = "🌤️";

} else if (current.weather_code === 3) {
    condition = "Cloudy";
    weatherIcon = "☁️";

} else if (current.weather_code >= 51 && current.weather_code <= 67) {
    condition = "Rainy";
    weatherIcon = "🌧️";

} else if (current.weather_code >= 71 && current.weather_code <= 77) {
    condition = "Snowy";
    weatherIcon = "❄️";

} else if (current.weather_code >= 95) {
    condition = "Thunderstorm";
    weatherIcon = "⛈️";

} else {
    condition = "Weather Condition Unknown";
    weatherIcon = "🌡️";
}

if (current.weather_code === 0) {
    condition = "Clear Sky ☀️";
} else if (current.weather_code === 1 || current.weather_code === 2) {
    condition = "Partly Cloudy 🌤️";
} else if (current.weather_code === 3) {
    condition = "Cloudy ☁️";
} else if (current.weather_code >= 51 && current.weather_code <= 67) {
    condition = "Rainy 🌧️";
} else if (current.weather_code >= 71 && current.weather_code <= 77) {
    condition = "Snowy ❄️";
} else if (current.weather_code >= 95) {
    condition = "Thunderstorm ⛈️";
} else {
    condition = "Weather Condition Unknown";
}

weatherInfo.innerHTML = `
    <h2>${city}</h2>

    <h1>${current.temperature_2m}°C</h1>

    <p>Humidity: ${current.relative_humidity_2m}%</p>

    <p>Wind Speed: ${current.wind_speed_10m} km/h</p>


<p>${condition}</p>
`;
}
});



