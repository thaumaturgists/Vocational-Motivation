// Define the function
const addKeyboardNavigation = (quizContainer, buttons) => {
    quizContainer.addEventListener('keydown', (event) => {
        const focusedButton = document.activeElement;

        if (buttons.includes(focusedButton)) {
            const currentIndex = buttons.indexOf(focusedButton);

            if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
                const nextIndex = (currentIndex + 1) % buttons.length;
                buttons[nextIndex].focus();
                event.preventDefault();
            } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
                const prevIndex = (currentIndex - 1 + buttons.length) % buttons.length;
                buttons[prevIndex].focus();
                event.preventDefault();
            }
        }
    });
};

// Immediately invoke the function if needed
// addKeyboardNavigation(quizContainer, buttons); // Uncomment and use as needed

// Export the function
export { addKeyboardNavigation };
