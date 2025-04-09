(function() {
    function generateStars(numStars) {
        console.log(`Generating ${numStars} stars...`);

        // Create a style element for the stars
        const style = document.createElement('style');
        style.textContent = `
            .star-field {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none; /* Allow clicks to pass through */
            }
            .star {
                width: 2px;
                height: 2px;
                position: absolute;
                background: rgba(255, 255, 255, 0.8);
                border-radius: 50%;
                animation: twinkle 1.5s infinite alternate, starAnimation 1s forwards;
            }
            .star:nth-child(odd) { animation-duration: 1.5s; }
            .star:nth-child(even) { animation-duration: 2s; }
            @keyframes twinkle {
                0% { transform: scale(1); opacity: 0.8; }
                100% { transform: scale(1.2); opacity: 0; }
            }
            @keyframes starAnimation {
                0% { opacity: 0; }
                100% { opacity: 1; }
            }
            @keyframes fall {
                0% { top: -5px; } /* Start just above the viewport */
                100% { top: 100vh; } /* Move to the bottom of the viewport */
            }
        `;
        document.head.appendChild(style); // Append the style to the head
        console.log('Styles added to the document.');

        // Create the star field
        const starField = document.createElement('stars'); // Corrected to 'div'
        starField.className = 'star-field';
        document.body.appendChild(starField); // Append to body
        console.log('Star field created and added to the document.');

        // Function to create a star
        function createStar() {
            const star = document.createElement('stars');
            star.className = 'star';

            // Generate random positions using crypto.getRandomValues
            const top = new Uint32Array(1);
            const left = new Uint32Array(1);
            window.crypto.getRandomValues(top);
            window.crypto.getRandomValues(left);

            // Scale the random values to the viewport dimensions
            star.style.top = (top[0] % 100) + 'vh'; // Random vertical position
            star.style.left = (left[0] % 100) + 'vw'; // Random horizontal position

            // Append the star to the star field
            starField.appendChild(star);
            console.log(`Star created at position: ${star.style.left}, ${star.style.top}`);

            // Animate the star falling down
            star.style.animation += ', fall 5s linear forwards'; // Add fall animation

            // Reset the star position after it falls
            star.addEventListener('animationend', () => {
                star.style.top = '-5px'; // Reset to start position
                star.style.animation = ''; // Reset animation
                createStar(); // Create a new star to replace it
            });
        }

        // Dynamically load stars at intervals
        for (let i = 0; i < numStars; i++) {
            createStar();
        }
        console.log('All stars have been loaded.');
    }

    // Call the function to generate 100 stars when the DOM is fully loaded
    document.addEventListener('DOMContentLoaded', () => generateStars(100));
})();
