// class DataFetcher {
//     constructor(apiUrl) {
//         this.apiUrl = apiUrl;
//         this.initEventListeners();
//     }

//     initEventListeners() {
//         document.getElementById('fetchButton').addEventListener('click', async () => {
//             try {
//                 const userInput = document.getElementById('userInput').value;
//                 const sanitizedInput = this.sanitizeInput(userInput);
//                 const encodedUrl = encodeURIComponent(sanitizedInput);
//                 const fullApiUrl = `${this.apiUrl}/${encodedUrl}`;
//                 await this.fetchData(fullApiUrl, sanitizedInput);
//             } catch (error) {
//                 console.error('Error:', error.message);
//                 document.getElementById('message').innerText = error.message;
//             }
//         });
//     }

//     sanitizeInput(input) {
//         const sanitized = input.replace(/[^a-zA-Z0-9\s-_]/g, '');
//         if (sanitized.length > 50) {
//             throw new Error('Input exceeds maximum length.');
//         }
//         if (sanitized.trim() === '') {
//             throw new Error('Input cannot be empty.');
//         }
//         return sanitized;
//     }

//     validateResponse(data) {
//         if (data && typeof data === 'object' && data.hasOwnProperty('expectedProperty')) {
//             return data;
//         }
//         return null;
//     }

//     async fetchData(apiUrl, sanitizedInput) {
//         try {
//             const response = await fetch(apiUrl);
//             if (!response.ok) {
//                 throw new Error('Network response was not ok: ' + response.statusText);
//             }
//             const data = await response.json();
//             const validatedData = this.validateResponse(data);
//             if (validatedData) {
//                 this.createJSONFile(validatedData, sanitizedInput);
//             } else {
//                 throw new Error('Invalid data received from API.');
//             }
//         } catch (error) {
//             console.error('There was a problem with the fetch operation:', error.message);
//             document.getElementById('message').innerText = 'An error occurred while fetching the data.';
//         }
//     }

//     createJSONFile(data, filename) {
//         const jsonString = JSON.stringify(data, null, 2);
//         const blob = new Blob([jsonString], { type: 'application/json' });
//         const url = URL.createObjectURL(blob);

//         const a = document.createElement('a');
//         a.href = url;
//         a.download = `${filename}.json`;
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);
//         URL.revokeObjectURL(url); // Clean up the URL object
//     }
// }

// // Instantiate the DataFetcher class with the API URL
// const Fetcher = new DataFetcher('https://your-api-here/');


// (old)
class DataFetcher {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
        this.initEventListeners();
    }

    // Initialize event listeners
    initEventListeners() {
        document.getElementById('fetchButton').addEventListener('click', () => {
            const userInput = document.getElementById('userInput').value; // Get user input
            console.log('User input:', userInput);
            const sanitizedInput = this.sanitizeInput(userInput); // Sanitize input
            const encodedUrl = encodeURIComponent(sanitizedInput); // Encode user input
            const fullApiUrl = `${this.apiUrl}/${encodedUrl}`; // Construct the full API URL
            console.log('Constructed API URL:', fullApiUrl);
            this.fetchData(fullApiUrl, sanitizedInput); // Pass sanitized input for filename
        });
    }

    // Function to sanitize user input
    sanitizeInput(input) {
        console.log('Sanitizing input:', input);
        // Allow letters, numbers, spaces, and some special characters (e.g., hyphen, underscore)
        const sanitized = input.replace(/[^a-zA-Z0-9\s-_]/g, ''); 
        console.log('Sanitized input:', sanitized);
        
        // Additional validation: Check if the sanitized input is not empty
        if (sanitized.trim() === '') {
            console.error('Sanitized input is empty after sanitization.');
            throw new Error('Input cannot be empty.');
        }
        
        return sanitized;
    }


    // Function to validate API response
    validateResponse(data) {
        console.log('Validating response:', data);
        if (data && typeof data === 'object') {
            console.log('Valid data received:', data);
            return data; // Return the valid data
        }
        console.error('Invalid data received from API');
        return null; // Return null if data is invalid
    }

    // Function to create a JSON file from data
    createJSONFile(data, filename) {
        const jsonString = JSON.stringify(data, null, 2); // Convert data to JSON string
        console.log('Creating JSON file with data:', jsonString);
        const blob = new Blob([jsonString], { type: 'application/json' }); // Create a Blob
        const url = URL.createObjectURL(blob); // Create a URL for the Blob

        // Create a link element to trigger the download
        const a = document.createElement('a');
        a.href = url;
        a.download = `${filename}.json`; // Specify the filename
        document.body.appendChild(a);
        a.click(); // Trigger the download
        document.body.removeChild(a); // Clean up
    }

    // Function to fetch data from the API
    fetchData(apiUrl, sanitizedInput) {
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
                const validatedData = this.validateResponse(data); // Validate API response
                if (validatedData) {
                    this.createJSONFile(validatedData, sanitizedInput); // Use sanitized input for filename
                } else {
                    document.getElementById('message').innerText = 'Invalid data received from API.';
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                document.getElementById('message').innerText = 'An error occurred while fetching the data.';
            });
    }
}

// Instantiate the DataFetcher class with the API URL
const Fetcher = new DataFetcher('https://your-api-here/'); // input apends to the end of url