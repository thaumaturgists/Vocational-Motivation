(function() {
    // Create and style the error log div
    const div = document.createElement('div');
    div.id = 'errorLog';
    div.textContent = 'Error Log:';
    div.style.backgroundColor = '#fdd';
    div.style.padding = '10px';
    div.style.border = '1px solid #f00';
    div.style.marginTop = '10px';
    div.style.overflowY = 'auto';
    div.style.maxHeight = '200px'; // Optional: limit height for scrolling

    // Append the div to the body (recommended)
    document.body.appendChild(div);

    // Function to log errors to the div
    function logErrorToDiv(message) {
        div.textContent += message + '\n'; // Append the error message
    }

    // Capture unhandled errors
    window.onerror = function(message, source, lineno, colno, error) {
        const errorMessage = `Error: ${message} at ${source}:${lineno}:${colno}`;
        logErrorToDiv(errorMessage);
        return true; // Prevent the default browser error handling
    };

    // Example of triggering an error
    // Uncomment the line below to see the error being caught
    // nonExistentFunction(); // This will cause a ReferenceError

    // Example of a handled error
    try {
        throw new Error("This is a manually thrown error.");
    } catch (e) {
        logErrorToDiv(`Caught error: ${e.message}`);
    }
})(); // Immediately invoke the function


// .catch(error => {
//     console.error('Fetch error:', error.message); // Log only the error message
//     document.getElementById('message').innerText = 'An error occurred while fetching the data.';
// });