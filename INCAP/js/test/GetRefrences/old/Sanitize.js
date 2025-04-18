// Function to sanitize strings to prevent XSS
function sanitizeString(str) {
    const div = document.createElement('div');
    div.innerText = str; // Use innerText to escape HTML
    return div.innerHTML; // Return the escaped HTML
}

// Function to validate and sanitize API response
function sanitizeApiResponse(data) {
    // Check if the expected properties exist
    if (data && typeof data === 'object') {
        const sanitizedData = {
            temperature: data.temperature ? sanitizeString(data.temperature) : "Not Found",
            wind: data.wind ? sanitizeString(data.wind) : "Not Found",
            description: data.description ? sanitizeString(data.description) : "Not Found",
            forecast: Array.isArray(data.forecast) ? data.forecast.map(day => ({
                day: day.day || "Not Found",
                temperature: day.temperature ? sanitizeString(day.temperature) : "Not Found",
                wind: day.wind ? sanitizeString(day.wind) : "Not Found"
            })) : []
        };
        return sanitizedData;
    }
    return null; // Return null if data is invalid
}

// Example usage in your fetch call
fetch(`https://goweather.herokuapp.com/weather/${sanitizedCity}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        const sanitizedData = sanitizeApiResponse(data);
        if (sanitizedData) {
            // Use sanitizedData to update the DOM
            city.textContent = `City: ${sanitizedCity}`;
            desc.textContent = `Description: ${sanitizedData.description}`;
            temp.textContent = `Temperature: ${sanitizedData.temperature}`;
            wind.textContent = `Wind: ${sanitizedData.wind}`;

            // Clear previous forecast
            forecastContainer.innerHTML = '';

            // Display forecast data
            if (sanitizedData.forecast.length > 0) {
                sanitizedData.forecast.forEach(day => {
                    const forecastItem = document.createElement('div');
                    forecastItem.textContent = `Day ${day.day}: Temperature: ${day.temperature}, Wind: ${day.wind}`;
                    forecastContainer.appendChild(forecastItem);
                });
            } else {
                forecastContainer.textContent = 'No forecast data available.';
            }
        } else {
            alert('Invalid data received from the API.');
        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        alert('Failed to fetch weather data. Please try again later.'); // User-friendly error message
    });


//     ### Key Points:
// - **Sanitize Strings**: The `sanitizeString` function escapes any HTML characters to prevent XSS.
// - **Validate Structure**: The `sanitizeApiResponse` function checks if the data structure is valid and sanitizes the relevant fields.
// - **Use Safe Data**: Always use the sanitized data to update the DOM.

// By implementing these practices, you can help ensure that your application is more secure and robust against potential vulnerabilities.