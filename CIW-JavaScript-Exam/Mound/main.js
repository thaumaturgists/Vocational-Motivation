// main.js
import { Quiz } from '/CIW-JavaScript-Exam/INCAP/quiz.js';
import { displayQuiz } from '/CIW-JavaScript-Exam/INCAP/ui.js';
// export const sharedCounts = {
//     totalCount: 0,
//     totalCorrectCount: 0
// };
window.sharedCounts = {
    totalCount: 0,
    totalCorrectCount: 0
};




console.log('Shared Counts:', sharedCounts);
(async function() {
    // document.addEventListener('contextmenu', event => event.preventDefault());
    // Define an object to hold all question sets
    let questionSets = {};

    // Load questions from JSON file
    try {
        console.log('Fetching questions from JSON file...');
        const response = await fetch('data/questions.json');
        const data = await response.json();
        console.log('Questions loaded successfully:', data);

        // Dynamically create questionSets based on the keys in the JSON
        if (data.questionSets) {
            Object.keys(data.questionSets).forEach(key => {
                questionSets[key] = data.questionSets[key];
                console.log(`Loaded question set: ${key} with ${data.questionSets[key].length} questions.`);
            });
        } else {
            console.warn('No question sets found in the JSON data.');
        }
    } catch (error) {
        console.error('Error loading questions:', error);
        return; // Exit if there's an error loading questions
    }

    // Function to initialize quizzes
    function initializeQuizzes() {
        const quizzes = {};
        Object.keys(questionSets).forEach(key => {
            quizzes[key] = new Quiz(questionSets[key]);
            console.log(`Initialized quiz for question set: ${key}`);
        });
        return quizzes;
    }

    // Initialize quizzes
    let quizzes = initializeQuizzes();

    function initializeQuiz() {
        console.log('Initializing quiz...');
        resetQuiz(); // Start the quiz
        window.scrollTo(0, 0); // Scroll to the top of the page
    }

    document.addEventListener('DOMContentLoaded', () => {
        console.log('Document loaded. Starting quiz...');
        initializeQuiz(); // Start the quiz when the document is loaded
    });

    document.getElementById('refreshButton').onclick = () => {
        console.log('Refresh button clicked. Resetting quiz...');
        initializeQuiz(); // Reset the quiz when the refresh button is clicked
    };

    function resetQuiz() {
        console.log('Resetting quizzes...');
        Object.values(quizzes).forEach(quiz => quiz.reset()); // This resets the quiz state but not the counts
        document.getElementById('clickCount').innerText = 0; // Reset the displayed count to 0
        document.getElementById('correctCountDisplay').innerText = 0; // Reset the displayed correct count to 0
        document.querySelectorAll('.result').forEach(resultDiv => resultDiv.innerText = '');
        document.querySelectorAll('.topic > div').forEach(quizDiv => quizDiv.textContent = '');

        // Reset shared counts
        window.sharedCounts.totalCount = 0; // Reset total count
        window.sharedCounts.totalCorrectCount = 0; // Reset correct count
    
        // Start each quiz
        Object.keys(quizzes).forEach((key, index) => {
            console.log(`Displaying quiz: ${key}`);
            displayQuiz(quizzes[key], `quiz${index + 1}`, `result${index + 1}`);
        });
    }
    


    // Some Script to Place qustionsSets in the console

    function isValidQuestionSet(questionsArray) {
        return Array.isArray(questionsArray) && questionsArray.every(question => {
            return question.question && Array.isArray(question.answers) && question.correct;
        });
    }
    
    function addQuestionSet(setName, questionsArray) {
        if (isValidQuestionSet(questionsArray)) {
            questionSets[setName] = questionsArray;
            console.log(`Added question set: ${setName} with ${questionsArray.length} questions.`);
            quizzes = initializeQuizzes(); // Reinitialize quizzes to reflect the new question set
        } else {
            console.error('Invalid question set structure.');
        }
    }

    // Example usage of adding a new question set
    const newQuestions = [
        {
            question: "your_question_7here", 
            answers: [
                "pick_your_answer_here_17",
                "pick_your_answer_here_18",
                "pick_your_answer_here_19",
                "pick_your_answer_here_20",
                "and_so_on_...5"],
            correct: "pick_your_answer_here_17"
        },
        {
            question: "your_question_8here", 
            answers: [
                "pick_your_answer_here_21",
                "pick_your_answer_here_22",
                "pick_your_answer_here_23",
                "pick_your_answer_here_24",
                "and_so_on_...6"],
            correct: "pick_your_answer_here_24"
        },
        {
            question: "your_question_9here", 
            answers: [
                "pick_your_answer_here_25",
                "pick_your_answer_here_26",
                "pick_your_answer_here_27",
                "pick_your_answer_here_28",
                "and_so_on_...7"],
            correct: "pick_your_answer_here_27"
        },
        {
            question: "your_question_10here", 
            answers: [
                "pick_your_answer_here_29",
                "pick_your_answer_here_30",
                "pick_your_answer_here_31",
                "pick_your_answer_here_32",
                "and_so_on_...8"],
            correct: "pick_your_answer_here_29"
        },
    ];

    addQuestionSet('question7', newQuestions); // Call this function to add a new question set
})();

// This function helps to make sure that any input we get is safe to use
function sanitizeInput(input) {
    const div = document.createElement('div'); // Create a new div element
    div.appendChild(document.createTextNode(input)); // Add the input as text to the div
    return div.innerHTML; // Return the safe HTML version of the input
}

// Imports: The code starts by importing necessary functions from other files to help create and display quizzes.
// Shared Counts: It sets up a way to keep track of how many questions have been answered and how many were correct.
// Fetching Questions: It fetches questions from a JSON file and loads them into the program.
// Initializing Quizzes: It creates quizzes based on the loaded questions and sets them up for display.
// Event Listeners: It listens for when the webpage is fully loaded and when the refresh button is clicked to reset the quiz.
// Resetting Quizzes: It resets the quizzes and updates the display to show the current state.
// Adding New Questions: It allows for adding new sets of questions and checks if they are valid before adding them.
// Sanitizing Input: It includes a function to make sure any input is safe to use, preventing any harmful code from being executed.
// This code is like a big machine that helps create and manage quizzes, making sure everything works smoothly and safely!