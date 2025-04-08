// Function to create and append the div with styles
function loadDivInHead() {
    const div = document.createElement('div');
    div.id = 'myDiv';
    div.textContent = 'This is a div loaded in the head!';

    // Set styles directly in the function
    div.style.backgroundColor = '#f0f0f0';
    div.style.padding = '10px';
    div.style.border = '1px solid #ccc';
    div.style.marginTop = '10px';

    // Append the div to the head
    document.head.appendChild(div);
}

// Wait for the DOM to load before executing the function
document.addEventListener('DOMContentLoaded', loadDivInHead);