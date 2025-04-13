// DOM elements
const locationInput = document.getElementById('location-input');
const fetchWeatherButton = document.getElementById('fetch-weather');
const weatherInfo = document.getElementById('weather-info');

// OpenWeatherMap API key (replace with your actual API key)
const apiKey = '1501e0114a6af06ca63e6afe6644140e'; // Replace with your actual API key

// Function to fetch weather data
const getWeather = async (location) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
    );

    if (!response.ok) {
      throw new Error('City not found or API error');
    }

    const data = await response.json();

    // Extract necessary weather data
    const { main, weather, wind } = data;
    const temperature = main.temp;
    const humidity = main.humidity;
    const description = weather[0].description;
    const windSpeed = wind.speed;
    const icon = weather[0].icon; // Weather icon code

    // Display weather information with icon
    weatherInfo.innerHTML = `
      <h3>Weather in ${location}</h3>
      <img src="https://openweathermap.org/img/wn/${icon}.png" class="weather-icon" alt="Weather icon">
      <p><strong>Temperature:</strong> ${temperature}°C</p>
      <p><strong>Humidity:</strong> ${humidity}%</p>
      <p><strong>Condition:</strong> ${description}</p>
      <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
    `;
  } catch (error) {
    weatherInfo.innerHTML = `<p>Error: ${error.message}</p>`;
  }
};

// Event listener to trigger weather fetching
fetchWeatherButton.addEventListener('click', () => {
  const location = locationInput.value.trim();

  if (location) {
    getWeather(location);
  } else {
    weatherInfo.innerHTML = '<p>Please enter a location.</p>';
  }
});
