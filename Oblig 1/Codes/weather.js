// Array of locations, containing a name, latitude, and longitude
const locations = [
    { name: "Tokyo, Japan", latitude: 35.6895, longitude: 139.6917 },
    { name: "Oslo, Norway", latitude: 59.9127, longitude: 10.7461 },
    { name: "London, England", latitude: 51.5085, longitude: -0.1257 },
    { name: "Seoul, South-Korea", latitude: 37.566, longitude: 126.9784 },
    { name: "Ho Chi Minh City, Vietnam", latitude: 10.823, longitude: 106.6296 }
];

// Function to fetch weather data for a given location
async function getWeatherData(location) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true`;

    try {
        const response = await fetch(url);
        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`Failed to fetch weather data for ${location.name}`);
        }
        const data = await response.json();
        return data.current_weather;
    } catch (error) {
        console.error(error);
    }
}

// Function to display weather information
function displayWeather(location, weather) {
    const weatherContainer = document.getElementById('weather-container');

    const weatherElement = document.createElement('div');
    weatherElement.classList.add('weather-update');

    // Checks if weather data is available
    if (weather) {
        weatherElement.innerHTML = `
            <h3>Weather in ${location.name}</h3>
            <p>Temperature: ${weather.temperature} °C</p>
            <p>Wind Speed: ${weather.windspeed} km/h</p>`;
    } else {
        weatherElement.innerHTML = `
            <h3>Weather in ${location.name}</h3>
            <p>Unable to fetch weather data.</p>`;
    }

    weatherContainer.appendChild(weatherElement);
}

// Function to load weather data for all locations
async function loadWeather() {
    const weatherContainer = document.getElementById('weather-container');
    weatherContainer.innerHTML = '';  // Clear previous weather data

    // Loop through each location to fetch and display weather data
    for (const location of locations) {
        const weatherData = await getWeatherData(location);
        displayWeather(location, weatherData);
    }
}

// Load weather data when the page loads
loadWeather();

// Interval to refresh weather data every 10 seconds
setInterval(loadWeather, 10000); 
