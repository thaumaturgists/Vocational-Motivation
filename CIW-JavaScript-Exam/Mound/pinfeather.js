// Feather In Cap
(function() {
    // This function runs when the feather button is clicked
    document.getElementById('featherButton').addEventListener('click', handleFeatherClick);

    function handleFeatherClick() {
        const feather = document.getElementById('feather');

        // Check if the feather element exists
        if (!feather) {
            console.error('Feather element not found.');
            return; // Exit if the feather element does not exist
        }

        console.log('Feather button clicked. Starting animation...');

        // Make the feather invisible and move it above the cap
        feather.style.opacity = '0';
        feather.style.transform = 'translateX(-50%) translateY(-100%)'; // Start above the cap

        // This line makes the browser re-check the feather's position
        void feather.offsetWidth; // Forces a reflow

        // Now make the feather visible and start the animation
        feather.style.opacity = '1';
        feather.classList.add('animate');

        // When the animation is done, remove the animation class
        feather.addEventListener('transitionend', function() {
            console.log('Animation completed. Removing animation class.');
            feather.classList.remove('animate');
        }, { once: true }); // Only do this once
    }
})();


// Console Logging: Added logs to indicate when the button is clicked and when the animation is completed.
// Error Handling: Added a check to ensure the feather element exists before manipulating it.
// Named Function: Used a named function (handleFeatherClick) for better readability and debugging.
// Maintainability: The structure is clearer, making it easier to maintain and understand.
// CSS Animation Example
// Make sure you have the appropriate CSS for the .animate class to define the animation. Here’s a simple example:

/* CSS for visibility */
// #feather {
//     transition: opacity 0.5s ease, transform 0.5s ease; /* Smooth transition for opacity and transform */
// }

// #feather.animate {
//     transform: translateX(-50%) translateY(0); /* Move feather to its final position */
// }

///////////////////////////////////////////////

// // Feather In Cap
// (function() {
//     // This function runs when the feather button is clicked
//     document.getElementById('featherButton').addEventListener('click', function() {
//         const feather = document.getElementById('feather'); // Get the feather element

//         // Make the feather invisible and move it above the cap
//         feather.style.opacity = '0'; // Set the feather to be invisible
//         feather.style.transform = 'translateX(-50%) translateY(-100%)'; // Move it above the cap

//         // This line makes the browser re-check the feather's position
//         void feather.offsetWidth; // Forces a reflow to ensure the feather is in its new position

//         // Now make the feather visible and start the animation
//         feather.style.opacity = '1'; // Set the feather to be visible
//         feather.classList.add('animate'); // Add the 'animate' class to start the animation

//         // When the animation is done, remove the animation class
//         feather.addEventListener('transitionend', function() {
//             feather.classList.remove('animate'); // Remove the 'animate' class after the animation ends
//         }, { once: true }); // Only do this once, so it doesn't keep listening after the first time
//     });
// })();

// Self-Executing Function: The entire code is wrapped in a self-executing function (also called an IIFE - Immediately Invoked Function Expression). This means it runs as soon as it's defined, without needing to be called elsewhere.
// Event Listener: It adds a click event listener to a button with the ID featherButton. When this button is clicked, the function inside runs.
// Getting the Feather: It retrieves the feather element from the document using its ID feather.
// Making the Feather Invisible: The feather is first made invisible by setting its opacity to 0 and moving it above the cap using CSS transforms.
// Forcing a Reflow: The line void feather.offsetWidth; forces the browser to re-check the feather's position. This is important because it ensures that the browser recognizes the feather's new position before starting the animation.
// Starting the Animation: The feather is then made visible again by setting its opacity to 1, and the animate class is added to it, which likely contains CSS animations.
// Removing the Animation Class: After the animation is finished, an event listener waits for the transitionend event. When the animation ends, it removes the animate class from the feather. The { once: true } option ensures that this listener only runs once and then is removed.
// This code is like a little magic trick! When you click the feather button, the feather disappears, moves above the cap, and then reappears with a cool animation!
