// Feather In Cap
(function() {
   // This function runs when the feather button is clicked
    document.getElementById('featherButton').addEventListener('click', function() {
        const feather = document.getElementById('feather');

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
            feather.classList.remove('animate');
        }, { once: true }); // Only do this once
    });
})();