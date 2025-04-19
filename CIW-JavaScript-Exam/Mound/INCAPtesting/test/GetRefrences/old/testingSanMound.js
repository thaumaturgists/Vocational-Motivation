// Function to sanitize user input
function sanitizeInput(input) {
    console.log('Sanitizing input:', input);
    const sanitized = input.replace(/[^a-zA-Z\s]/g, ''); // Allow only letters and spaces
    console.log('Sanitized input:', sanitized);
    return sanitized;
}

// Function to validate and sanitize API response
function validateResponse(data) {
    console.log('Validating response:', data);
    if (data && typeof data === 'object') {
        console.log('Valid data received:', data);
        return data; // Return the valid data
    }
    console.error('Invalid data received from API');
    return null; // Return null if data is invalid
}

// Function to create a JSON file from data
function createJSONFile(data, sanitizedUrl) {
    const jsonString = JSON.stringify(data, null, 2); // Convert data to JSON string
    console.log('Creating JSON file with data:', jsonString);
    const blob = new Blob([jsonString], { type: 'application/json' }); // Create a Blob
    const url = URL.createObjectURL(blob); // Create a URL for the Blob

    // Create a link element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = `${sanitizedUrl}.json`; // Specify the filename as sanitizedUrl.json
    document.body.appendChild(a);
    a.click(); // Trigger the download
    document.body.removeChild(a); // Clean up
}

// When the button is pressed...
document.getElementById('fetchButton').addEventListener('click', () => {
    const userInput = document.getElementById('userInput').value; // Get user input
    console.log('User input:', userInput);
    
    const sanitizedElement = sanitizeInput(userInput); // Sanitize input
    const sanitizedUrl = encodeURIComponent(sanitizedElement); // Encode user input
    // const apiUrl = `https://your-api-here.com/${sanitizedUrl}`; // Construct the URL
    const apiUrl = `https://goweather.herokuapp.com/weather/${sanitizedUrl}`; // Construct the URL
    console.log('Constructed API URL:', apiUrl);
    
    // Fetch data
    fetch(apiUrl)
        .then(response => {
            console.log('Response received:', response);
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data received from API:', data);
            const sanitizedData = validateResponse(data); // Validate and sanitize API response
            if (sanitizedData) {
                createJSONFile(sanitizedData, sanitizedUrl); // Create a JSON file from the fetched data
            } else {
                document.getElementById('message').innerText = 'Invalid data received from API.';
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            document.getElementById('message').innerText = 'An error occurred while fetching the data.';
        });
});
