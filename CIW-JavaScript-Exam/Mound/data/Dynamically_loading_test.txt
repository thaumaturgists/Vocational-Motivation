// main.js
import { Quiz } from './quiz.js';
import { displayQuiz } from './ui.js';

(async function() {
    document.addEventListener('contextmenu', event => event.preventDefault());

    // Function to initialize question sets and quizzes
    function initializeQuizzes(questionSetNames) {
        const questionSetting = {};
        const quizzes = {};

        // Create questionSetting and quizzes dynamically
        questionSetNames.forEach((name, index) => {
            questionSetting[name] = []; // Initialize empty array for each question set
            quizzes[`quiz${index + 1}`] = new Quiz(questionSetting[name]); // Create a new Quiz instance
        });

        console.log('Initialized questionSetting:', questionSetting);
        console.log('Initialized quizzes:', quizzes);

        return { questionSetting, quizzes };
    }

    // Load questions from JSON file
    let questionSetting, quizzes; // Declare variables here
    try {
        const response = await fetch('data/questions.json');
        const data = await response.json();
        console.log('Loaded data from JSON:', data);

        // Define question set names
        const questionSetNames = Object.keys(data.questionSets);
        console.log('Question set names:', questionSetNames);

        // Initialize quizzes
        ({ questionSetting, quizzes } = initializeQuizzes(questionSetNames));

        // Assign each question set to the corresponding property in questionSetting
        questionSetNames.forEach(name => {
            if (data.questionSets[name]) {
                questionSetting[name] = data.questionSets[name];
                console.log(`Assigned ${name} to questionSetting:`, questionSetting[name]);
            }
        });
    } catch (error) {
        console.error('Error loading questions:', error);
        return; // Exit if there's an error loading questions
    }

    console.log('Final questionSetting:', questionSetting);
    console.log('Final quizzes:', quizzes);

    function initializeQuiz() {
        resetQuiz(); // Start the quiz
        window.scrollTo(0, 0); // Scroll to the top of the page
    }

    document.addEventListener('DOMContentLoaded', () => {
        console.log('Document loaded, initializing quiz...');
        initializeQuiz(); // Start the quiz when the document is loaded
    });

    document.getElementById('refreshButton').onclick = () => {
        console.log('Refresh button clicked, resetting quiz...');
        initializeQuiz(); // Reset the quiz when the refresh button is clicked
    };

    function resetQuiz() {
        console.log('Resetting quizzes...');
        Object.values(quizzes).forEach(quiz => quiz.reset());
        document.getElementById('clickCount').innerText = 0;
        document.getElementById('correctCountDisplay').innerText = 0;
        document.querySelectorAll('.result').forEach(resultDiv => resultDiv.innerText = '');
        document.querySelectorAll('.topic > div').forEach(quizDiv => quizDiv.textContent = '');
    
        // Start each quiz dynamically
        Object.keys(quizzes).forEach((quizKey, index) => {
            console.log(`Displaying ${quizKey}...`);
            displayQuiz(quizzes[quizKey], `quiz${index + 1}`, `result${index + 1}`);
        });
    }
    
})();
