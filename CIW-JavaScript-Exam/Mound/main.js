// main.js
import { Quiz } from './quiz.js';
import { displayQuiz } from './ui.js';


(async function() {
    document.addEventListener('contextmenu', event => event.preventDefault());

    // Define an object to hold all question sets
    const questionSetting = {
        questions: [],
        questions2: [],
        questions3: [],
        // Add more question sets as needed
    };

    // Load questions from JSON file
    try {
        const response = await fetch('data/questions.json');
        const data = await response.json();
        // Assign each question set to the corresponding property in questionSetting
        Object.keys(questionSetting).forEach(key => {
            if (data.questionSets[key]) {
                questionSetting[key] = data.questionSets[key];
            }
        });
    } catch (error) {
        console.error('Error loading questions:', error);
        return; // Exit if there's an error loading questions
    }

    // Initialize quizzes
    const quizzes = {
        quiz1: new Quiz(questionSetting.questions),
        quiz2: new Quiz(questionSetting.questions2),
        quiz3: new Quiz(questionSetting.questions3),
        // Add more quizzes as needed
    };

    function initializeQuiz() {
        resetQuiz(); // Start the quiz
        window.scrollTo(0, 0); // Scroll to the top of the page
    }

    document.addEventListener('DOMContentLoaded', () => {
        initializeQuiz(); // Start the quiz when the document is loaded
    });

    document.getElementById('refreshButton').onclick = () => {
        initializeQuiz(); // Reset the quiz when the refresh button is clicked
    };

    function resetQuiz() {
        Object.values(quizzes).forEach(quiz => quiz.reset());
        document.getElementById('clickCount').innerText = 0;
        document.getElementById('correctCountDisplay').innerText = 0;
        document.querySelectorAll('.result').forEach(resultDiv => resultDiv.innerText = '');
        document.querySelectorAll('.topic > div').forEach(quizDiv => quizDiv.textContent = '');

        // Start each quiz
        displayQuiz(quizzes.quiz1, 'quiz', 'result1');
        displayQuiz(quizzes.quiz2, 'quiz2', 'result2');
        displayQuiz(quizzes.quiz3, 'quiz3', 'result3');
        // Add more displayQuiz calls for additional quizzes
    }
})();
