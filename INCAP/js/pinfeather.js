// pinfeather.js

// Feather In Cap
(function() {
    // This function runs when the feather button is clicked
    document.getElementById('featherButton').addEventListener('click', function() {
        const feather = document.getElementById('feather'); // Get the feather element

        // Make the feather invisible and move it above the cap
        feather.style.opacity = '0'; // Set the feather to be invisible
        feather.style.transform = 'translateX(-50%) translateY(-100%)'; // Move it above the cap

        // This line makes the browser re-check the feather's position
        void feather.offsetWidth; // Forces a reflow to ensure the feather is in its new position

        // Now make the feather visible and start the animation
        feather.style.opacity = '1'; // Set the feather to be visible
        feather.classList.add('animate'); // Add the 'animate' class to start the animation

        // When the animation is done, remove the animation class
        feather.addEventListener('transitionend', function() {
            feather.classList.remove('animate'); // Remove the 'animate' class after the animation ends
        }, { once: true }); // Only do this once, so it doesn't keep listening after the first time
    });
})();