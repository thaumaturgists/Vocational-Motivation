// **Use URL Encoding**
// When including user input in URLs, use URL encoding to ensure that special characters are properly encoded. In JavaScript, you can use `encodeURIComponent()` for this purpose.

// ```javascript
// const sanitizedCity = encodeURIComponent(weatherInput.value);
// ```



// Get user input
const userInput = weatherInput.value;

// Sanitize and encode user input
const sanitizedCity = encodeURIComponent(sanitizeInput(userInput));

// Construct the URL
const apiUrl = `https://goweather.herokuapp.com/weather/${sanitizedCity}`;

// Fetch data
fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        // Handle the data
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });