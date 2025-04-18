// Get references to DOM elements
const weatherInput = document.getElementById('weatherInput');
const weatherButton = document.getElementById('weatherButton');
const city = document.getElementById('city');
const desc = document.getElementById('desc'); 
const wind = document.getElementById('wind');
const temp = document.getElementById('temp');
const forecastContainer = document.getElementById('forecast'); // New element for forecast

// Function to sanitize user input
function sanitizeInput(input) {
    return input.trim().replace(/[^a-zA-Z\s]/g, ''); // Allow only letters and spaces
}

// When the weather button is pressed...
weatherButton.addEventListener('click', () => {
    const sanitizedCity = sanitizeInput(weatherInput.value); // Sanitize input

    if (!sanitizedCity) {
        alert('Please enter a valid city name.'); // Alert if input is empty or invalid
        return;
    }

    // Use template literals correctly
    fetch(`https://goweather.herokuapp.com/weather/${sanitizedCity}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Use optional chaining to safely access properties
            const descTxt = data.description || "Not Found";
            const tempTxt = data.temperature || "Not Found";
            const windTxt = data.wind || "Not Found";

            // Set the inner text of the DOM elements using template literals
            city.textContent = `City: ${sanitizedCity}`;
            desc.textContent = `Description: ${descTxt}`;
            temp.textContent = `Temperature: ${tempTxt}`;
            wind.textContent = `Wind: ${windTxt}`;

            // Clear previous forecast
            forecastContainer.innerHTML = '';

            // Display forecast data
            if (data.forecast && data.forecast.length > 0) {
                data.forecast.forEach(day => {
                    const forecastItem = document.createElement('div');
                    forecastItem.textContent = `Day ${day.day}: Temperature: ${day.temperature}, Wind: ${day.wind}`;
                    forecastContainer.appendChild(forecastItem);
                });
            } else {
                forecastContainer.textContent = 'No forecast data available.';
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert('Failed to fetch weather data. Please try again later.'); // User-friendly error message
        });
});


// 1. **Forecast Container**: Added a new DOM element (`forecastContainer`) to display the forecast data. Make sure to add this element in your HTML.
   
//    ```html
//    <div id="forecast"></div>
//    ```

// 2. **Forecast Handling**: After displaying the current weather data, the code now checks if the `forecast` array exists and iterates over it to create and append forecast items to the `forecastContainer`.

// 3. **Clear Previous Forecast**: Before displaying new forecast data, the previous forecast is cleared to avoid appending to old data.

// This code will now correctly display the current weather and the forecast for the next few days based on the API response.