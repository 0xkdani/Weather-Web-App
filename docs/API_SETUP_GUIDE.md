# Visual Crossing Weather API Setup Guide

## Step-by-Step Instructions

### 1. Create a Free Account

1. Go to [Visual Crossing Weather API](https://www.visualcrossing.com/weather-api)
2. Click on "Sign Up" or "Get Started Free"
3. Fill in your details:
   - Email address
   - Password
   - Name (optional)
4. Verify your email address

### 2. Get Your API Key

1. Log in to your Visual Crossing account
2. Navigate to your dashboard/account page
3. Look for "API Key" section
4. Copy your API key (it will look something like: `ABCD1234EFGH5678IJKL9012MNOP3456`)

### 3. Add API Key to the Project

**Option 1: Direct in script.js (Quick Start)**
1. Open `script.js` in your text editor
2. Find line 4:
   ```javascript
   const API_KEY = 'YOUR_API_KEY_HERE';
   ```
3. Replace with your actual key:
   ```javascript
   const API_KEY = 'ABCD1234EFGH5678IJKL9012MNOP3456';
   ```
4. Save the file

**Option 2: Using a config file (Recommended for sharing/Git)**
1. Create a new file called `config.js` in the same folder
2. Add this content:
   ```javascript
   const CONFIG = {
       API_KEY: 'ABCD1234EFGH5678IJKL9012MNOP3456'
   };
   ```
3. In `index.html`, add before the script.js line:
   ```html
   <script src="config.js"></script>
   <script src="script.js"></script>
   ```
4. In `script.js`, change line 4 to:
   ```javascript
   const API_KEY = CONFIG.API_KEY;
   ```
5. Add `config.js` to `.gitignore` (already done!)

### 4. Test the API Key

1. Open `index.html` in your browser
2. Click the location button or search for a city
3. If you see weather data, you're all set! ✅
4. If you see an error, check:
   - API key is copied correctly (no spaces)
   - You have internet connection
   - You haven't exceeded the daily limit

### API Key Troubleshooting

#### Error: "Invalid API key"
- Double-check you copied the entire key
- Remove any spaces before or after the key
- Make sure you're using the right key from your account

#### Error: "Rate limit exceeded"
- Free tier: 1,000 requests per day
- Wait 24 hours or upgrade your plan
- Check if you have multiple tabs making requests

#### Error: "Location not found"
- Try a different location format
- Use city names: "London", "New York", "Tokyo"
- Use coordinates: "40.7128,-74.0060"

### Free Tier Limits

Visual Crossing Free Account includes:
- ✅ 1,000 API calls per day
- ✅ Current weather conditions
- ✅ Historical weather data
- ✅ 15-day forecast
- ✅ Hourly data
- ✅ No credit card required

### Security Best Practices

⚠️ **Important Security Notes:**

1. **Never commit API keys to Git**
   - Use `.gitignore` to exclude config files
   - Use environment variables for production

2. **For public projects:**
   - Use the config.js method
   - Share `config.example.js` instead of `config.js`
   - Add instructions in README

3. **For production apps:**
   - Use a backend proxy
   - Never expose API keys in client-side code
   - Implement rate limiting

### Need More API Calls?

If you need more than 1,000 calls per day:
1. Go to Visual Crossing pricing page
2. Choose a paid plan that fits your needs
3. Plans start at a few dollars per month

### Alternative Weather APIs

If you want to try other APIs:
- **OpenWeatherMap**: Very popular, generous free tier
- **WeatherAPI.com**: Easy to use, detailed data
- **AccuWeather**: Professional-grade forecasts
- **Weatherstack**: Real-time weather data

To switch APIs, you'll need to:
1. Modify the API endpoint in `script.js`
2. Update the data parsing logic
3. Adjust the response handling

### Getting Help

- [Visual Crossing Documentation](https://www.visualcrossing.com/resources/documentation/weather-api/)
- [API Support](https://www.visualcrossing.com/weather-api-support)
- Check browser console (F12) for detailed errors

---

**Happy coding! 🌤️**
