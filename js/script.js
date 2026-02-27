const API_KEY = 'CN4JMDKEBE8QSMTKC6EUXFZQQ';
const API_BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

const locationInput = document.getElementById('locationInput');
const searchBtn = document.getElementById('searchBtn');
const currentLocationBtn = document.getElementById('currentLocationBtn');
const refreshBtn = document.getElementById('refreshBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');
const weatherContent = document.getElementById('weatherContent');

const locationName = document.getElementById('locationName');
const currentDate = document.getElementById('currentDate');
const temperature = document.getElementById('temperature');
const weatherCondition = document.getElementById('weatherCondition');
const weatherIcon = document.getElementById('weatherIcon');
const windSpeed = document.getElementById('windSpeed');
const rainChance = document.getElementById('rainChance');
const humidity = document.getElementById('humidity');
const feelsLike = document.getElementById('feelsLike');
const hourlyForecast = document.getElementById('hourlyForecast');

let currentLocation = '';

searchBtn.addEventListener('click', handleSearch);
locationInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});
currentLocationBtn.addEventListener('click', getCurrentLocation);
refreshBtn.addEventListener('click', () => {
    if (currentLocation) {
        fetchWeatherData(currentLocation);
    }
});

function init() {
    getCurrentLocation();
}

function handleSearch() {
    const location = locationInput.value.trim();
    if (!location) {
        showError('Please enter a location');
        return;
    }
    currentLocation = location;
    fetchWeatherData(location);
}

function getCurrentLocation() {
    if (!navigator.geolocation) {
        showError('Geolocation is not supported by your browser');
        return;
    }

    showLoading();
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            const lat = latitude.toFixed(4);
            const lon = longitude.toFixed(4);
            currentLocation = `${lat},${lon}`;
            fetchWeatherData(currentLocation);
        },
        (error) => {
            hideLoading();
            console.error('Geolocation error:', error);
            showError('Unable to get your location. Please search manually.');
            currentLocation = 'New York';
            fetchWeatherData(currentLocation);
        }
    );
}

async function fetchWeatherData(location) {
    if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
        showError('Please add your Visual Crossing API key in script.js');
        return;
    }

    showLoading();
    
    try {
        const url = `${API_BASE_URL}/${encodeURIComponent(location)}?unitGroup=metric&key=${API_KEY}&contentType=json&include=hours,current`;
        
        console.log('Fetching weather for:', location);
        const response = await fetch(url);
        
        if (!response.ok) {
            let errorMsg = `Unable to fetch weather data`;
            try {
                const errorData = await response.json();
                errorMsg = errorData.message || errorMsg;
            } catch (e) {
                if (response.status === 401) {
                    errorMsg = 'Invalid API key. Please check your Visual Crossing API key.';
                } else if (response.status === 400) {
                    errorMsg = 'Invalid location format. Try a city name instead.';
                }
            }
            throw new Error(errorMsg);
        }
        
        const data = await response.json();
        console.log('API Response:', data);
        displayWeatherData(data);
        hideLoading();
        
    } catch (error) {
        hideLoading();
        console.error('Error fetching weather data:', error);
        showError(error.message || 'Failed to fetch weather data. Please try again.');
    }
}

function displayWeatherData(data) {
    if (!data || !data.days || data.days.length === 0) {
        showError('Invalid weather data received from API');
        console.error('Invalid data structure:', data);
        return;
    }

    const current = data.currentConditions;
    const today = data.days[0];
    
    if (!current) {
        showError('Current weather conditions not available');
        console.error('Missing currentConditions in data:', data);
        return;
    }
    
    locationName.textContent = data.resolvedAddress || 'Unknown Location';
    currentDate.textContent = formatDate(new Date());
    
    temperature.textContent = Math.round(current.temp || 0);
    weatherCondition.textContent = current.conditions || 'N/A';
    weatherIcon.textContent = getWeatherEmoji(current.icon || 'clear-day');
    
    windSpeed.textContent = `${current.windspeed || 0} km/h`;
    rainChance.textContent = `${current.precipprob || 0}%`;
    humidity.textContent = `${current.humidity || 0}%`;
    feelsLike.textContent = `${Math.round(current.feelslike || current.temp || 0)}°C`;
    
    display24HourForecast(data);
    
    weatherContent.classList.remove('hidden');
}

function display24HourForecast(data) {
    hourlyForecast.innerHTML = '';
    
    const now = new Date();
    const currentHour = now.getHours();
    
    const hours = [];
    
    if (data.days.length > 1) {
        const yesterday = data.days[0];
        if (yesterday.hours) {
            for (let i = Math.max(0, currentHour - 12); i < currentHour; i++) {
                if (yesterday.hours[i]) {
                    hours.push({
                        ...yesterday.hours[i],
                        isPast: true,
                        displayTime: formatHourTime(i)
                    });
                }
            }
        }
    }
    
    const today = data.days[0];
    if (today.hours && today.hours[currentHour]) {
        hours.push({
            ...today.hours[currentHour],
            isPast: false,
            isCurrent: true,
            displayTime: 'Now'
        });
    }
    
    if (today.hours) {
        for (let i = currentHour + 1; i < Math.min(24, currentHour + 13); i++) {
            if (today.hours[i]) {
                hours.push({
                    ...today.hours[i],
                    isPast: false,
                    displayTime: formatHourTime(i)
                });
            }
        }
    }
    
    if (hours.length < 24 && data.days.length > 1) {
        const tomorrow = data.days[1];
        if (tomorrow.hours) {
            const remaining = 24 - hours.length;
            for (let i = 0; i < remaining && i < tomorrow.hours.length; i++) {
                hours.push({
                    ...tomorrow.hours[i],
                    isPast: false,
                    displayTime: formatHourTime(i, true)
                });
            }
        }
    }
    
    hours.forEach((hour, index) => {
        const card = createHourCard(hour, index);
        hourlyForecast.appendChild(card);
    });
}

function createHourCard(hour, index) {
    const card = document.createElement('div');
    card.className = 'hour-card';
    card.style.animationDelay = `${index * 0.05}s`;
    
    const isPast = hour.isPast;
    const isCurrent = hour.isCurrent;
    
    if (isPast) {
        card.style.opacity = '0.6';
    }
    if (isCurrent) {
        card.style.background = 'rgba(37, 99, 235, 0.3)';
        card.style.border = '2px solid var(--primary-color)';
    }
    
    card.innerHTML = `
        <div class="hour-time">${hour.displayTime}</div>
        <div class="hour-icon">${getWeatherEmoji(hour.icon)}</div>
        <div class="hour-temp">${Math.round(hour.temp)}°C</div>
        <div class="hour-condition">${hour.conditions}</div>
        <div class="hour-details">
            💧 ${hour.precipprob || 0}% | 💨 ${Math.round(hour.windspeed)} km/h
        </div>
    `;
    
    return card;
}

function getWeatherEmoji(icon) {
    const iconMap = {
        'clear-day': '☀️',
        'clear-night': '🌙',
        'cloudy': '☁️',
        'partly-cloudy-day': '⛅',
        'partly-cloudy-night': '🌙',
        'rain': '🌧️',
        'snow': '❄️',
        'wind': '💨',
        'fog': '🌫️',
        'thunderstorm': '⛈️',
        'hail': '🌨️',
        'tornado': '🌪️',
        'sleet': '🌨️'
    };
    
    return iconMap[icon] || '🌤️';
}

function formatHourTime(hour, isTomorrow = false) {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    const tomorrowLabel = isTomorrow ? ' (Tomorrow)' : '';
    return `${displayHour} ${period}${tomorrowLabel}`;
}

function formatDate(date) {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
}

function showLoading() {
    loadingSpinner.classList.remove('hidden');
    weatherContent.classList.add('hidden');
    errorMessage.classList.add('hidden');
}

function hideLoading() {
    loadingSpinner.classList.add('hidden');
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    weatherContent.classList.add('hidden');
    
    setTimeout(() => {
        errorMessage.classList.add('hidden');
    }, 5000);
}

init();
