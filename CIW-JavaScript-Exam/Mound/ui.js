// ui.js
export function displayQuiz(quiz, quizContainerId, resultContainerId) {
    const quizContainer = document.getElementById(quizContainerId);
    const resultContainer = document.getElementById(resultContainerId);

    // Log the containers to check if they are found
    console.log('Quiz Container:', quizContainer);
    console.log('Result Container:', resultContainer);

    // Check if the containers exist
    if (!quizContainer) {
        console.error(`Quiz container with ID "${quizContainerId}" not found.`);
        return; // Exit the function if the quiz container is not found
    }
    if (!resultContainer) {
        console.error(`Result container with ID "${resultContainerId}" not found.`);
        return; // Exit the function if the result container is not found
    }

    const selectedQuestions = quiz.getRandomQuestions(5);
    const buttons = [];

    selectedQuestions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.textContent = `${index + 1}. ${q.question}\n`;

        const shuffledAnswers = quiz.shuffle([...q.answers]);

        shuffledAnswers.forEach(answer => {
            const button = document.createElement('button');
            button.textContent = answer;
            button.className = 'answer-button';
            button.setAttribute('role', 'button');

            buttons.push(button);

            // button.onclick = () => {
            //     const result = quiz.checkAnswer(answer, q.correct, { totalCount, totalCorrectCount });
            //     updateResult(result.message, resultContainerId);
            button.onclick = () => {
                const result = quiz.checkAnswer(answer, q.correct);
                updateResult(result.message, resultContainerId);
                
                // // Update the counts by topic
                // document.getElementById('clickCount').innerText = quiz.count; // Update total answers
                // document.getElementById('correctCountDisplay').innerText = quiz.correctCount; // Update correct answers

                // // Update the shared counts
                // document.getElementById('clickCount').innerText = totalCount; // Update total answers
                // document.getElementById('correctCountDisplay').innerText = totalCorrectCount; // Update correct answers

                // // Update the shared counts in the UI
                // document.getElementById('clickCount').innerText = sharedCounts.totalCount; // Update total answers
                // document.getElementById('correctCountDisplay').innerText = sharedCounts.totalCorrectCount; // Update correct answers

                // Update the shared counts in the UI
                document.getElementById('clickCount').innerText = window.sharedCounts.totalCount; // Update total answers
                document.getElementById('correctCountDisplay').innerText = window.sharedCounts.totalCorrectCount; // Update correct answers

                // Disable all buttons for this question after answering
                questionDiv.querySelectorAll('button').forEach(button => button.disabled = true);
            };

            button.tabIndex = 0;
            button.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    button.click();
                }
            });

            questionDiv.appendChild(button);
        });
        quizContainer.appendChild(questionDiv);
    });

    if (buttons.length > 0) {
        buttons[0].focus(); // Focus the first button
    }

    addKeyboardNavigation(quizContainer, buttons);
}

function updateResult(message, resultContainerId) {
    const resultDiv = document.getElementById(resultContainerId);
    if (resultDiv) {
        resultDiv.innerText = message;
    } else {
        console.error(`Result container with ID "${resultContainerId}" not found when updating result.`);
    }
}

function addKeyboardNavigation(quizContainer, buttons) {
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
}
// This function helps to make sure that any output we display is safe to use
function sanitizeOutput(text) {
    const div = document.createElement('div'); // Create a new div element
    div.appendChild(document.createTextNode(text)); // Add the text as a text node to the div
    return div.innerHTML; // Return the safe HTML version of the text
}

// Summary of the ui.js Code:
// Display Quiz: The displayQuiz function shows the quiz questions and answers on the webpage. It checks if the containers for the quiz and results exist and if the quiz object is valid.
// Creating Questions and Buttons: For each question, it creates a div and buttons for each answer. When an answer button is clicked, it checks if the answer is correct and updates the result display.
// Keyboard Accessibility: The buttons can also be activated using the keyboard. If the user presses the Enter key or Space bar, it simulates a button click.
// Updating Results: The updateResult function updates the result display with the message about whether the answer was correct or incorrect.
// // Keyboard Navigation: The addKeyboardNavigation function allows users to navigate through the answer buttons using the arrow keys. It wraps around when reaching the end or beginning of the button list.
// Sanitizing Output: The sanitizeOutput function ensures that any text we display is safe and won't cause any issues, like running harmful code.
// This code is like a friendly helper that makes sure the quiz looks good on the screen, works well with the keyboard, and keeps everything safe and organized!

// // (old)
// // ui.js

// // This function displays a quiz in a specific part of the webpage
// export function displayQuiz(quiz, quizContainerId, resultContainerId) {
//     // Get the containers where we will show the quiz and the results
//     const quizContainer = document.getElementById(quizContainerId);
//     const resultContainer = document.getElementById(resultContainerId);

//     // Log the containers to check if they are found
//     console.log('Quiz Container:', quizContainer);
//     console.log('Result Container:', resultContainer);

//     // Check if the quiz container exists
//     if (!quizContainer) {
//         console.error(`Quiz container with ID "${quizContainerId}" not found.`); // Log an error if not found
//         return; // Exit the function if the quiz container is not found
//     }
//     // Check if the result container exists
//     if (!resultContainer) {
//         console.error(`Result container with ID "${resultContainerId}" not found.`); // Log an error if not found
//         return; // Exit the function if the result container is not found
//     }

//     // Validate that the quiz object has the necessary functions
//     if (typeof quiz.getRandomQuestions !== 'function' || typeof quiz.checkAnswer !== 'function') {
//         console.error('Invalid quiz object provided.'); // Log an error if the quiz object is not valid
//         return; // Exit the function if the quiz object is invalid
//     }

//     // Get 5 random questions from the quiz
//     const selectedQuestions = quiz.getRandomQuestions(5);
//     const buttons = []; // This will hold the answer buttons

//     // Loop through each selected question
//     selectedQuestions.forEach((q, index) => {
//         const questionDiv = document.createElement('div'); // Create a new div for the question
//         questionDiv.className = 'question'; // Set the class name for styling
//         questionDiv.textContent = `${index + 1}. ${q.question}\n`; // Add the question text

//         // Shuffle the answers for this question
//         const shuffledAnswers = quiz.shuffle([...q.answers]);

//         // Loop through each answer and create a button for it
//         shuffledAnswers.forEach(answer => {
//             const button = document.createElement('button'); // Create a new button
//             button.textContent = answer; // Set the button text to the answer
//             button.className = 'answer-button'; // Set the class name for styling
//             button.setAttribute('role', 'button'); // Set the role for accessibility

//             buttons.push(button); // Add the button to the buttons array

//             // When the button is clicked, check the answer
//             button.onclick = () => {
//                 const result = quiz.checkAnswer(answer, q.correct); // Check if the answer is correct
//                 updateResult(result.message, resultContainerId); // Update the result display

//                 // Update the shared counts in the UI
//                 document.getElementById('clickCount').innerText = window.sharedCounts.totalCount; // Update total answers
//                 document.getElementById('correctCountDisplay').innerText = window.sharedCounts.totalCorrectCount; // Update correct answers

//                 // Disable all buttons for this question after answering
//                 questionDiv.querySelectorAll('button').forEach(button => button.disabled = true);
//             };

//             // Allow the button to be activated with the keyboard
//             button.tabIndex = 0; // Make the button focusable
//             button.addEventListener('keydown', (event) => {
//                 if (event.key === 'Enter' || event.key === ' ') { // If Enter or Space is pressed
//                     event.preventDefault(); // Prevent the default action
//                     button.click(); // Simulate a click on the button
//                 }
//             });

//             questionDiv.appendChild(button); // Add the button to the question div
//         });
//         quizContainer.appendChild(questionDiv); // Add the question div to the quiz container
//     });

//     // If there are buttons, focus on the first one
//     if (buttons.length > 0) {
//         buttons[0].focus(); // Focus the first button
//     }

//     // Add keyboard navigation for the buttons
//     addKeyboardNavigation(quizContainer, buttons);
// }

// // This function updates the result display with a message
// function updateResult(message, resultContainerId) {
//     const resultDiv = document.getElementById(resultContainerId); // Get the result container
//     if (resultDiv) {
//         resultDiv.innerText = message; // Update the text with the result message
//     } else {
//         console.error(`Result container with ID "${resultContainerId}" not found when updating result.`); // Log an error if not found
//     }
// }

// // This function adds keyboard navigation for the answer buttons
// function addKeyboardNavigation(quizContainer, buttons) {
//     // Listen for keydown events in the quiz container
//     quizContainer.addEventListener('keydown', (event) => {
//         const focusedButton = document.activeElement; // Get the currently focused button

//         // Check if the focused element is one of the answer buttons
//         if (buttons.includes(focusedButton)) {
//             const currentIndex = buttons.indexOf(focusedButton); // Find the index of the focused button

//             // If the down arrow or right arrow key is pressed
//             if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
//                 const nextIndex = (currentIndex + 1) % buttons.length; // Move to the next button (wrap around if at the end)
//                 buttons[nextIndex].focus(); // Focus the next button
//                 event.preventDefault(); // Prevent the default action of the key
//             } 
//             // If the up arrow or left arrow key is pressed
//             else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
//                 const prevIndex = (currentIndex - 1 + buttons.length) % buttons.length; // Move to the previous button (wrap around if at the start)
//                 buttons[prevIndex].focus(); // Focus the previous button
//                 event.preventDefault(); // Prevent the default action of the key
//             }
//         }
//     });
// }

// // This function helps to make sure that any output we display is safe to use
// function sanitizeOutput(text) {
//     const div = document.createElement('div'); // Create a new div element
//     div.appendChild(document.createTextNode(text)); // Add the text as a text node to the div
//     return div.innerHTML; // Return the safe HTML version of the text
// }