// This function helps to make sure that any output we display is safe to use
function sanitizeOutput(text) {
    const div = document.createElement('div'); // Create a new div element
    div.appendChild(document.createTextNode(text)); // Add the text as a text node to the div
    return div.innerHTML; // Return the safe HTML version of the text
}