// toggleContent.js

// This function shows or hides content when called
function toggleContent(contentId) {
    // Get the content element by its ID
    const content = document.getElementById(contentId); // Find the element with the given ID

    // Check if the content element exists
    if (!content) {
        console.warn(`Element with ID "${contentId}" not found.`); // Log a warning if the element is not found
        return; // Exit the function if the element does not exist
    }

    // Toggle the display property
    if (content.style.display === 'block') { // Check if the content is currently visible
        content.style.display = 'none'; // Hide the content by setting display to 'none'
        content.setAttribute('aria-hidden', 'true'); // Update ARIA attribute for accessibility (indicates it's hidden)
    } else {
        content.style.display = 'block'; // Show the content by setting display to 'block'
        content.setAttribute('aria-hidden', 'false'); // Update ARIA attribute for accessibility (indicates it's visible)
    }
}