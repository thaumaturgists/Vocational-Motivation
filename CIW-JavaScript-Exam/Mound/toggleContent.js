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