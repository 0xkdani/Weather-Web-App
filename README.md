# Weather Web App 🌤️

A modern, responsive weather application that displays real-time weather information using the Visual Crossing Weather API. Built with vanilla HTML, CSS, and JavaScript.

![Weather App](https://img.shields.io/badge/Weather-App-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 🚀 Quick Start

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A Visual Crossing Weather API key (free tier available)

### Setup Instructions

1. **Get Your API Key**
   - Visit [Visual Crossing Weather API](https://www.visualcrossing.com/weather-api)
   - Sign up for a free account
   - Copy your API key from the dashboard

2. **Configure the App**
   - Open `script.js` in a text editor
   - Find line 4: `const API_KEY = 'YOUR_API_KEY_HERE';`
   - Replace `YOUR_API_KEY_HERE` with your actual API key:
     ```javascript
     const API_KEY = 'YOUR_ACTUAL_API_KEY';
     ```

3. **Run the App**
   - Simply open `index.html` in your web browser
   - Or use a local web server:
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js (with http-server)
     npx http-server
     ```
   - Navigate to `http://localhost:8000`

## 📖 How to Use

### Search for Weather
1. Type a location in the search bar (e.g., "London", "Tokyo", "New York")
2. Press Enter or click the search button
3. View the current weather and 24-hour forecast

### Use Current Location
1. Click the location button (📍) next to the search bar
2. Allow location access when prompted by your browser
3. The app will automatically display weather for your location

### Refresh Weather Data
- Click the "Refresh" button at the bottom of the current weather card
- This fetches the latest weather data for the current location

## 🎨 Features Breakdown

### Current Weather Display
- **Temperature**: Large, easy-to-read display in Celsius
- **Conditions**: Weather description with matching emoji
- **Wind Speed**: Current wind speed in km/h
- **Rain Chance**: Probability of precipitation
- **Humidity**: Current humidity percentage
- **Feels Like**: Apparent temperature

### 24-Hour Forecast
- **Hourly Cards**: Shows weather for each hour
- **Past Hours**: Dimmed to indicate previous hours (last 12 hours)
- **Current Hour**: Highlighted with blue border
- **Future Hours**: Shows upcoming weather (next 12 hours)
- **Details**: Each card shows temperature, conditions, rain probability, and wind speed

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript ES6+**: Async/await, fetch API, modules
- **Visual Crossing Weather API**: Weather data provider

### Project Structure
```
Weather-Web-App/
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── script.js           # JavaScript logic and API calls
└── README.md          # Documentation
```

### API Integration
The app uses the Visual Crossing Weather API with the following features:
- Timeline API endpoint for historical and forecast data
- Metric units (Celsius, km/h)
- Hourly data inclusion
- Current conditions data

## 🐛 Troubleshooting

### "Please add your Visual Crossing API key"
- Make sure you've replaced `YOUR_API_KEY_HERE` with your actual API key in `script.js`

### "Unable to get your location"
- Check that you've granted location permission to your browser
- Try searching for a location manually
- Check your browser's location settings

### Weather data not loading
- Verify your API key is correct
- Check your internet connection
- Ensure you haven't exceeded the API rate limit (free tier: 1000 calls/day)
- Open browser console (F12) to see detailed error messages

### Blank page or layout issues
- Clear your browser cache
- Make sure all three files (HTML, CSS, JS) are in the same directory
- Check browser console for any errors

## 📊 API Limits

Visual Crossing Weather API free tier:
- **1,000 weather data requests per day**
- Historical weather data
- 15-day forecast
- Hourly data

## 🎓 Learning Resources

- [Visual Crossing Weather API Docs](https://www.visualcrossing.com/resources/documentation/weather-api/timeline-weather-api/)
- [MDN Web Docs - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [MDN Web Docs - Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
- [CSS Animations Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)

---

**Enjoy your Weather App! ☀️🌧️⛈️❄️**




![Weather-Web-App](https://github.com/user-attachments/assets/d20a700e-57a5-464a-8499-be7e154f0db0)
