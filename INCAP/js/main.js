// main.js

// We are importing two things from other files: 
// 1. Quiz - which helps us create quizzes
// 2. displayQuiz - which shows the quiz on the screen
import { Quiz } from './quiz.js';
import { displayQuiz } from './ui.js';


// This is a special object that keeps track of how many questions we've answered
// and how many of those were correct.
window.sharedCounts = {
    totalCount: 0, // Total number of questions answered
    totalCorrectCount: 0 // Total number of questions answered correctly
};

// We print the sharedCounts object to the console so we can see its values
console.log('Shared Counts:', sharedCounts);

// This is an async function that allows us to wait for things to finish before moving on
(async function() {
    let questionSets = {}; // This will hold all the sets of questions we get from a file

    try {
        // We are trying to fetch (get) questions from a JSON file
        console.log('Fetching questions from JSON file...');
        const response = await fetch('data/questions.json'); // Get the questions
        const data = await response.json(); // Convert the response to JSON format
        console.log('Questions loaded successfully:', data); // Show that we got the questions

        // Check if we have question sets in the data we received
        if (data.questionSets) {
            // For each question set we found, we add it to our questionSets object
            Object.keys(data.questionSets).forEach(key => {
                questionSets[key] = data.questionSets[key];
                console.log(`Loaded question set: ${key} with ${data.questionSets[key].length} questions.`);
            });
        } else {
            // If we didn't find any question sets, we warn the user
            console.warn('No question sets found in the JSON data.');
        }
    } catch (error) {
        // If there was an error while fetching the questions, we log it
        console.error('Error loading questions:', error);
        return; // Stop the function if there was an error
    }

    // This function creates quizzes from the question sets we loaded
    function initializeQuizzes() {
        const quizzes = {}; // This will hold our quizzes
        Object.keys(questionSets).forEach(key => {
            quizzes[key] = new Quiz(questionSets[key]); // Create a new quiz for each question set
            console.log(`Initialized quiz for question set: ${key}`);
        });
        return quizzes; // Return the quizzes we created
    }

    let quizzes = initializeQuizzes(); // Call the function to create quizzes

    // This function sets up the quiz
    function initializeQuiz() {
        resetQuiz(); // Start the quiz fresh
        window.scrollTo(0, 0); // Scroll to the top of the page

        // After a little wait, focus on the first answer button
        setTimeout(() => {
            const firstButton = document.querySelector('#quiz1 .answer-button');
            if (firstButton) {
                firstButton.focus(); // Make the first button ready to be clicked
            }
        }, 100); // Wait 100 milliseconds
    }

    // This event listener waits for the webpage to load before starting the quiz
    document.addEventListener('DOMContentLoaded', () => {
        console.log('Document loaded. Starting quiz...'); // Log that the document is ready
        initializeQuiz(); // Start the quiz
    });

    // This code runs when the refresh button is clicked
    document.getElementById('refreshButton').onclick = () => {
        console.log('Refresh button clicked. Resetting quiz...'); // Log that the button was clicked
        initializeQuiz(); // Start the quiz again
    };

    // This function resets the quiz to its initial state
    function resetQuiz() {
        console.log('Resetting quizzes...'); // Log that we are resetting the quizzes
        Object.values(quizzes).forEach(quiz => quiz.reset()); // Reset each quiz
        document.getElementById('clickCount').innerText = 0; // Reset the click count display
        document.getElementById('correctCountDisplay').innerText = 0; // Reset the correct answers display
        document.querySelectorAll('.result').forEach(resultDiv => resultDiv.innerText = ''); // Clear results
        document.querySelectorAll('.topic > div').forEach(quizDiv => quizDiv.textContent = ''); // Clear quiz topics

        // Reset the shared counts to zero
        window.sharedCounts.totalCount = 0;
        window.sharedCounts.totalCorrectCount = 0;

        // For each quiz, we display it on the screen
        Object.keys(quizzes).forEach((key, index) => {
            console.log(`Displaying quiz: ${key}`); // Log which quiz we are displaying
            displayQuiz(quizzes[key], `quiz${index + 1}`, `result${index + 1}`); // Show the quiz on the screen
        });
    }
})();