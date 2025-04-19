(function() {
    // Define the function in the outer scope
    window.generateStars = function(numStars) {
        console.log(`Generating ${numStars} stars...`);

        // Create a style element for the stars
        const style = document.createElement('style');
        style.textContent = `
            .star {
                width: 2px;
                height: 2px;
                position: absolute;
                background: rgba(255, 255, 255, 0.8);
                border-radius: 50%;
                animation: twinkle 1.5s infinite alternate, starAnimation 1s forwards; /* Added starAnimation */
            }
            .star:nth-child(odd) { animation-duration: 1.5s; }
            .star:nth-child(even) { animation-duration: 2s; }
            @keyframes twinkle {
                0% { transform: scale(1); opacity: 0.8; }
                100% { transform: scale(1.2); opacity: 1; }
            }
            @keyframes starAnimation {
                0% { opacity: 0; }
                100% { opacity: 1; }
            }
        `;
        document.head.appendChild(style); // Append the style to the head
        console.log('Style for stars added to the document head.');

        // Create the star field
        const starField = document.createElement('div');
        starField.className = 'star-field';
        document.body.appendChild(starField); // Corrected this line
        console.log('Star field created and appended to the body.');

        // Generate stars
        for (let i = 0; i < numStars; i++) {
            const star = document.createElement('div');
            star.className = 'star';

            // Generate random positions using crypto.getRandomValues
            const top = new Uint32Array(1);
            const left = new Uint32Array(1);
            window.crypto.getRandomValues(top);
            window.crypto.getRandomValues(left);

            // Scale the random values to the viewport dimensions
            const topPosition = (top[0] % 100) + 'vh'; // Modulo to ensure it's within 0-100
            const leftPosition = (left[0] % 100) + 'vw'; // Modulo to ensure it's within 0-100

            star.style.top = topPosition;
            star.style.left = leftPosition;

            console.log(`Star ${i + 1}: Position - Top: ${topPosition}, Left: ${leftPosition}`);

            starField.appendChild(star);
        }

        console.log(`${numStars} stars generated successfully.`);
    };

    // Call the function to generate 70 stars when the DOM is fully loaded
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM fully loaded. Starting star generation...');
        generateStars(70);
    });

//     ### Usage:
// Now, you can call `generateStars(numStars)` from anywhere in your JavaScript code after the DOM is fully loaded. For example:

// ```javascript
// // Call the function to generate 50 stars after 2 seconds
setTimeout(() => {
    generateStars(35);
}, 2000);
setTimeout(() => {
    generateStars(0);
}, 4000);
setTimeout(() => {
    generateStars(35);
}, 8000);
setTimeout(() => {
    generateStars(35);
}, 10000);
setTimeout(() => {
    generateStars(0);
}, 12000);
setTimeout(() => {
    generateStars(35);
}, 14000);
setTimeout(() => {
    generateStars(35);
}, 15000);
// // This will generate 145 stars after a 2-s, 4-s, 8-second delay.
})();