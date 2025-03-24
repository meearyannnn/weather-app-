const weatherAPI = {
    key: 'YOUR_API_KEY', // Replace with your OpenWeatherMap API Key
    endpoint: 'https://api.openweathermap.org/data/2.5/weather'
};

document.getElementById('city').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        fetchWeather();
    }
});

async function fetchWeather() {
    const cityInput = document.getElementById('city').value.trim();
    if (!cityInput) {
        alert('Enter a valid city name');
        return;
    }

    const requestURL = `${weatherAPI.endpoint}?q=${cityInput}&units=metric&appid=${weatherAPI.key}`;
    try {
        const response = await fetch(requestURL);
        const weatherData = await response.json();
        
        if (weatherData.cod !== 200) {
            alert(weatherData.message);
            return;
        }

        updateWeatherDisplay(weatherData);
    } catch (error) {
        alert('Unable to fetch weather data');
    }
}

function updateWeatherDisplay(data) {
    document.getElementById('location').innerText = `${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').innerText = `Temperature: ${Math.round(data.main.temp)}°C`;
    document.getElementById('description').innerText = `Condition: ${data.weather[0].description}`;
}
