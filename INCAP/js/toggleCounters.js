(function() {
    // Function to append CSS styles to the head
    function appendStyles() {
        const style = document.createElement('style');
        style.textContent = `
            body {
                margin: 0; /* Remove default margin */
            }

            .floating-button {
                position: fixed; /* Fixes the button in place */
                top: 20px; /* Distance from the top */
                left: 20px; /* Distance from the right */
                padding: 10px 15px; /* Padding for the button */
                background-color: #007BFF; /* Button background color */
                color: white; /* Button text color */
                border: none; /* Remove border */
                border-radius: 30px; /* Rounded corners */
                cursor: pointer; /* Pointer cursor on hover */
                z-index: 9999; /* Ensure it stays on top of other elements */
                font-size: 18px; /* Increase font size for better readability */
                font-weight: bold; /* Make the text bold */
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add shadow for depth */
                transition: background-color 0.3s, transform 0.2s; /* Smooth transitions */
            }

            /* Add hover effect */
            .floating-button:hover {
                background-color: #0056b3; /* Darker shade on hover */
                transform: scale(1.05); /* Slightly enlarge on hover */
            }

            #floatingCounters.hidden {
                display: none; /* Hides the element */
            }
        `;
        document.head.appendChild(style);
    }

    // Function to create and append the toggle button
    function createToggleButton() {
        const button = document.createElement('button');
        button.id = 'toggleButton';
        button.className = 'floating-button';
        button.textContent = '☰';
        document.body.appendChild(button);

        // Add event listener to the button
        button.addEventListener('click', function() {
            const counters = document.getElementById('floatingCounters');
            counters.classList.toggle('hidden'); // Toggle the 'hidden' class
        });
    }

    // Call the functions to append styles and create the button
    appendStyles();
    createToggleButton();
})();
// // Example Useage
// <aside id="floatingCounters">
//     <h2 class="counter-header">
//         <span id="clickCount">0</span>/0
//         <button id="refreshButton">Start</button>
//     </h2>

//     <div>
//         <div class="correct-display">
//             <span id="correctCountDisplay">0</span>
//             <span class="correct-label">Correct</span>
//         </div><br>
//     </div>
// </aside>