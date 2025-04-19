function createToggleButton(text) {
    // Create the button element
    const button = document.createElement('button');
    
    // Set the button ID
    button.id = 'createToggleButton';

    // Set the button text
    button.innerText = text;

    // Add styles to the button
    button.style.position = 'fixed';
    button.style.top = '20px'; // Distance from the top
    button.style.right = '20px'; // Distance from the right
    button.style.padding = '5px 10px';
    button.style.backgroundColor = '#007BFF'; // Button color
    button.style.color = 'white'; // Text color
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
    button.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    button.style.zIndex = '1000'; // Ensure it stays on top of other elements

    // Add hover effect
    button.addEventListener('mouseover', () => {
        button.style.backgroundColor = '#0056b3'; // Darker shade on hover
    });

    button.addEventListener('mouseout', () => {
        button.style.backgroundColor = '#007BFF'; // Original color
    });

    // Add click event listener that calls toggleContent with the button's ID
    button.addEventListener('click', () => {
        toggleContent(button.id);
    });

    // Append the button to the body
    document.body.appendChild(button);
}

// Example toggleContent function
function toggleContent(buttonId) {
    alert(`Toggling content for button with ID: ${buttonId}`);
}

// Example usage
// createToggleButton('-');
