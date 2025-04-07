// This function shows or hides content when called
function toggleContent(contentId) {
    // Get the content element by its ID
    const content = document.getElementById(contentId);
    // Check if the content is currently hidden or not displayed
    content.style.display = (content.style.display === 'block') ? 'none' : 'block';
}

(async function() {
    document.addEventListener('contextmenu', event => event.preventDefault()); // Not a foolproof Source-No-Snoop
    let count = 0;
    let correctCount = 0;
    let questions = []; // Initialize an empty array for questions

    // Load questions from JSON file
    try {
        const response = await fetch('data/questions.json');
        const data = await response.json();
        questions = data.questions; // Access the questions array
    } catch (error) {
        console.error('Error loading questions:', error);
    }

    function initializeQuiz() {
        resetQuiz(); // Start the quiz
        window.scrollTo(0, 0); // Scroll to the top of the page
    
        // Set focus on the first answer button of the first quiz after a slight delay
        setTimeout(() => {
            const firstButton = document.querySelector('#quiz .answer-button');
            if (firstButton) {
                firstButton.focus();
            }
        }, 100); // Adjust the delay as needed
    }
    
    document.addEventListener('DOMContentLoaded', () => {
        initializeQuiz(); // Start the quiz when the document is loaded
    });
    
    document.getElementById('refreshButton').onclick = () => {
        initializeQuiz(); // Reset the quiz when the refresh button is clicked
    };
    
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

    function countClick() {
        count++;
        document.getElementById('clickCount').innerText = count;
    }

    function secureShuffle(array) {
        const shuffledArray = array.slice();
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / (Math.pow(2, 32) - 1) * (i + 1));
            [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
        }
        return shuffledArray;
    }

    function getRandomQuestions(questionsArray, num) {
        return secureShuffle([...questionsArray]).slice(0, num);
    }

    function displayQuiz(questionsArray, quizContainerId, resultContainerId) {
        const quizContainer = document.getElementById(quizContainerId);
        const selectedQuestions = getRandomQuestions(questionsArray, 5);
        const buttons = [];

        selectedQuestions.forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question';
            questionDiv.textContent = `${index + 1}. ${q.question}\n`;

            const shuffledAnswers = secureShuffle([...q.answers]);

            shuffledAnswers.forEach(answer => {
                const button = document.createElement('button');
                button.textContent = answer;
                button.className = 'answer-button';
                button.setAttribute('role', 'button');

                buttons.push(button);

                button.onclick = () => {
                    checkAnswer(answer, q.correct, resultContainerId);
                    countClick();
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

        // Add a keydown event listener for arrow key navigation
        quizContainer.addEventListener('keydown', (event) => {
            const focusedButton = document.activeElement; // Get the currently focused button

            // Check if the focused element is one of the buttons
            if (buttons.includes(focusedButton)) {
                const currentIndex = buttons.indexOf(focusedButton); // Find the index of the focused button

                // If the down arrow key is pressed, move focus to the next button
                if (event.key === 'ArrowDown') {
                    const nextIndex = (currentIndex + 1) % buttons.length; // Wrap around to the first button if at the end
                    buttons[nextIndex].focus(); // Focus the next button
                    event.preventDefault(); // Prevent scrolling
                } 
                // If the up arrow key is pressed, move focus to the previous button
                else if (event.key === 'ArrowUp') {
                    const prevIndex = (currentIndex - 1 + buttons.length) % buttons.length; // Wrap around to the last button if at the start
                    buttons[prevIndex].focus(); // Focus the previous button
                    event.preventDefault(); // Prevent scrolling
                } 
                // If the right arrow key is pressed, move focus to the next button
                else if (event.key === 'ArrowRight') {
                    const nextIndex = (currentIndex + 1) % buttons.length; // Wrap around to the first button if at the end
                    buttons[nextIndex].focus(); // Focus the next button
                    event.preventDefault(); // Prevent scrolling
                } 
                // If the left arrow key is pressed, move focus to the previous button
                else if (event.key === 'ArrowLeft') {
                    const prevIndex = (currentIndex - 1 + buttons.length) % buttons.length; // Wrap around to the last button if at the start
                    buttons[prevIndex].focus(); // Focus the previous button
                    event.preventDefault(); // Prevent scrolling
                }
            }
        });
    }

    function checkAnswer(selected, correct, resultContainerId) {
        const resultDiv = document.getElementById(resultContainerId);
        if (selected === correct) {
            correctCount++;
            resultDiv.innerText = `Correct! The answer is: ${correct}`;
        } else {
            resultDiv.innerText = `Incorrect. The correct answer is: ${correct}`;
        }
        document.getElementById('correctCountDisplay').innerText = `${correctCount}`;
    }

    function startQuiz(questionsArray, quizContainerId, resultContainerId) {
        count = 0;
        correctCount = 0;
        document.getElementById('clickCount').innerText = count;
        document.getElementById(resultContainerId).innerText = '';
        displayQuiz(questionsArray, quizContainerId, resultContainerId);
    }

    function resetQuiz() {
        count = 0;
        correctCount = 0;
        document.getElementById('clickCount').innerText = count;
        document.getElementById('correctCountDisplay').innerText = correctCount;
        document.querySelectorAll('.result').forEach(resultDiv => resultDiv.innerText = '');
        document.querySelectorAll('.topic > div').forEach(quizDiv => quizDiv.textContent = '');
        startQuiz(questions, 'quiz', 'result1');
        startQuiz(questions2, 'quiz2', 'result2');
        startQuiz(questions3, 'quiz3', 'result3');
        startQuiz(questions4, 'quiz4', 'result4');
        startQuiz(questions5, 'quiz5', 'result5');
        startQuiz(questions6, 'quiz6', 'result6');
    }
})();