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
