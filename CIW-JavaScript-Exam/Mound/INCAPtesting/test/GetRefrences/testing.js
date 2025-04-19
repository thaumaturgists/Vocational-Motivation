class DataFetcher {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
        this.initEventListeners();
    }

    initEventListeners() {
        document.getElementById('fetchButton').addEventListener('click', async () => {
            try {
                const userInput = document.getElementById('userInput').value;
                const sanitizedInput = this.sanitizeInput(userInput);
                const encodedUrl = encodeURIComponent(sanitizedInput);
                const fullApiUrl = `${this.apiUrl}/${encodedUrl}`;
                await this.fetchData(fullApiUrl, sanitizedInput);
            } catch (error) {
                console.error('Error:', error.message);
                document.getElementById('message').innerText = error.message;
            }
        });
    }

    sanitizeInput(input) {
        const sanitized = input.replace(/[^a-zA-Z0-9\s-_]/g, '');
        if (sanitized.length > 50) {
            throw new Error('Input exceeds maximum length.');
        }
        if (sanitized.trim() === '') {
            throw new Error('Input cannot be empty.');
        }
        return sanitized.replace(/\s+/g, '_'); // Replace spaces with underscores
    }

    validateResponse(data) {
        if (data && typeof data === 'object' && data.hasOwnProperty('expectedProperty')) {
            return data;
        }
        return null;
    }

    async fetchData(apiUrl, sanitizedInput) {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            const data = await response.json();
            const validatedData = this.validateResponse(data);
            if (validatedData) {
                this.createJSONFile(validatedData, sanitizedInput); // Use sanitized input for filename
            } else {
                throw new Error('Invalid data received from API.');
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error.message);
            document.getElementById('message').innerText = 'An error occurred while fetching the data.';
        }
    }

    createJSONFile(data, filename) {
        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `${filename}.json`; // Filename is now sanitized
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url); // Clean up the URL object
    }
}

// Instantiate the DataFetcher class with the API URL
const Fetcher = new DataFetcher('https://your-api-here/');
