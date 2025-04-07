// This function shows or hides content when called
function toggleContent(contentId) {
    // Get the content element by its ID
    const content = document.getElementById(contentId);

    // Check if the content element exists
    if (!content) {
        console.warn(`Element with ID "${contentId}" not found.`);
        return; // Exit if the element does not exist
    }

    // Toggle the display property
    if (content.style.display === 'block') {
        content.style.display = 'none'; // Hide the content
        content.setAttribute('aria-hidden', 'true'); // Update ARIA attribute for accessibility
    } else {
        content.style.display = 'block'; // Show the content
        content.setAttribute('aria-hidden', 'false'); // Update ARIA attribute for accessibility
    };
};

// // // Example usage in your main.js or ui.js
// document.getElementById('toggleButton').onclick = () => {
//     toggleContent('quizContainer'); // Replace 'quizContainer' with the actual ID of the content you want to toggle
// };

////////////////////////////////
// document.getElementById('toggleButton').addEventListener('click', () => {
//     toggleContent('contentId'); // Replace 'contentId' with the actual ID of the content to toggle
// });

// window.onload = () => {
//     const content = document.getElementById('contentId'); // Replace with actual ID
//     if (content) {
//         content.style.display = 'none'; // Set initial state to hidden
//         content.setAttribute('aria-hidden', 'true');
//     }
// };

// // ```css
// // .hidden {
// //     display: none;
// // }
// // ```

// function toggleContent(contentId) {
//     const content = document.getElementById(contentId);
//     if (!content) {
//         console.warn(`Element with ID "${contentId}" not found.`);
//         return;
//     }

//     content.classList.toggle('hidden');
//     const isHidden = content.classList.contains('hidden');
//     content.setAttribute('aria-hidden', isHidden);
// }

//////////////////////////////
// This function shows or hides content when called
// function toggleContent(contentId) {
//     // Get the content element by its ID
//     const content = document.getElementById(contentId);
//     // Check if the content is currently hidden or not displayed
//     content.style.display = (content.style.display === 'block') ? 'none' : 'block';
// }

/////////////////////////////More_toggln
// // This function shows or hides content when called
// function toggleContent(contentId) {
//     // Get the content element by its ID
//     const content = document.getElementById(contentId);

//     // Check if the content element exists
//     if (!content) {
//         console.warn(`Element with ID "${contentId}" not found.`);
//         return; // Exit if the element does not exist
//     }

//     // Log the current visibility state
//     const isVisible = content.classList.contains('visible');
//     console.log(`Current visibility state of "${contentId}": ${isVisible}`);

//     // Toggle the visibility using classList
//     if (isVisible) {
//         content.classList.remove('visible'); // Hide the content
//         content.setAttribute('aria-hidden', 'true'); // Update ARIA attribute for accessibility
//         console.log(`Hiding content with ID "${contentId}".`);
//     } else {
//         content.classList.add('visible'); // Show the content
//         content.setAttribute('aria-hidden', 'false'); // Update ARIA attribute for accessibility
//         console.log(`Showing content with ID "${contentId}".`);

//         // Optionally, set focus to the first interactive element within the content
//         const firstInteractiveElement = content.querySelector('button, [href], input, [tabindex]:not([tabindex="-1"])');
//         if (firstInteractiveElement) {
//             firstInteractiveElement.focus();
//             console.log(`Focusing on the first interactive element:`, firstInteractiveElement);
//         } else {
//             console.log(`No interactive elements found within "${contentId}".`);
//         }
//     }
// }

// // // Example of how to use this function with a button
// // document.getElementById('toggleButton').addEventListener('click', () => {
// //     console.log('Toggle button clicked.'); // Log when the toggle button is clicked
// //     toggleContent(contentId); // Replace 'contentId' with the actual ID of the content to toggle
// // });

// /* CSS for toggling visibility */
// // #contentId {
// //     display: none; /* Initially hidden */
// //     transition: opacity 0.3s ease; /* Smooth transition */
// // }

// // #contentId.visible {
// //     display: block; /* Show when visible */
// //     opacity: 1; /* Ensure opacity is set for transition */
// // }
////////////////////////////////////////////////

// // toggleContent.js

// // This function shows or hides content when called
// function toggleContent(contentId) {
//     // Get the content element by its ID
//     const content = document.getElementById(contentId); // Find the element with the given ID

//     // Check if the content element exists
//     if (!content) {
//         console.warn(`Element with ID "${contentId}" not found.`); // Log a warning if the element is not found
//         return; // Exit the function if the element does not exist
//     }

//     // Toggle the display property
//     if (content.style.display === 'block') { // Check if the content is currently visible
//         content.style.display = 'none'; // Hide the content by setting display to 'none'
//         content.setAttribute('aria-hidden', 'true'); // Update ARIA attribute for accessibility (indicates it's hidden)
//     } else {
//         content.style.display = 'block'; // Show the content by setting display to 'block'
//         content.setAttribute('aria-hidden', 'false'); // Update ARIA attribute for accessibility (indicates it's visible)
//     }
// }

// Function Definition: The toggleContent function is defined to show or hide content based on its ID.
// Getting the Content Element: It retrieves the content element from the document using the provided contentId.
// Checking for Existence: The function checks if the content element exists. If it doesn't, it logs a warning message and exits the function to prevent errors.
// Toggling Visibility:
// If the content is currently displayed (its display style is set to 'block'), it hides the content by changing the display style to 'none' and updates the aria-hidden attribute to indicate that the content is hidden.
// If the content is not displayed, it shows the content by setting the display style to 'block' and updates the aria-hidden attribute to indicate that the content is visible.
// Accessibility:
// The use of the aria-hidden attribute is important for accessibility. It helps screen readers and other assistive technologies understand whether the content is currently visible or hidden, making the web more accessible to everyone.
// This code is like a light switch for content! When you call the toggleContent function with the ID of the content you want to show or hide, it will either make it appear or disappear, just like flipping a switch!