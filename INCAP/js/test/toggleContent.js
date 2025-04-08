// toggleContent.js

class ContentToggler {
    constructor(contentId) {
        this.contentId = contentId; // Store the content ID
        this.content = document.getElementById(contentId); // Get the content element by its ID

        // Check if the content element exists
        if (!this.content) {
            console.warn(`Element with ID "${contentId}" not found.`); // Log a warning if the element does not exist
        }
    }

    toggle() {
        // Check if the content element exists
        if (!this.content) return; // Exit if the element does not exist

        // Toggle the display property
        if (this.content.style.display === 'block') {
            this.content.style.display = 'none'; // Hide the content
            this.content.setAttribute('aria-hidden', 'true'); // Update ARIA attribute
        } else {
            this.content.style.display = 'block'; // Show the content
            this.content.setAttribute('aria-hidden', 'false'); // Update ARIA attribute
        }
    }
}

// // Usage example
const toggler = new ContentToggler('myContentId'); // Replace 'myContentId' with your actual content ID
document.getElementById('toggleButton').addEventListener('click', () => {
    toggler.toggle(); // Call the toggle method when the button is clicked
});
