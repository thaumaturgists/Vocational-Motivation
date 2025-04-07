// ui.js
export function displayQuiz(quiz, quizContainerId, resultContainerId) {
    const quizContainer = document.getElementById(quizContainerId);
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

            button.onclick = () => {
                const result = quiz.checkAnswer(answer, q.correct);
                updateResult(result.message, resultContainerId);
                quiz.incrementCount();
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
    resultDiv.innerText = message;
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
