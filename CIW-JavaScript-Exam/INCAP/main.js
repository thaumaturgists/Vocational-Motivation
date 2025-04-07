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
    

    // Function to add a new question set
    function addQuestionSet(setName, questionsArray) {
        questionSets[setName] = questionsArray;
        console.log(`Added question set: ${setName} with ${questionsArray.length} questions.`);
        quizzes = initializeQuizzes(); // Reinitialize quizzes to reflect the new question set
    }

    // Example usage of adding a new question set
    const newQuestions = [
        {
            question: "What is the largest planet in our solar system?",
            answers: ["Earth", "Jupiter", "Mars", "Saturn"],
            correct: "Jupiter"
        },
        {
            question: "What is the chemical symbol for water?",
            answers: ["H2O", "O2", "CO2", "NaCl"],
            correct: "H2O"
        },
        {
            question: "Who wrote 'Romeo and Juliet'?",
            answers: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
            correct: "William Shakespeare"
        },
        {
            question: "What is the powerhouse of the cell?",
            answers: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"],
            correct: "Mitochondria"
        }
    ];

    addQuestionSet('questions5', newQuestions); // Call this function to add a new question set
})();
