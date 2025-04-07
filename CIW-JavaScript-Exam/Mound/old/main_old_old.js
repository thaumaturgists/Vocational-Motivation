// main.js
import { Quiz } from '/CIW-JavaScript-Exam/INCAP/quiz.js';
import { displayQuiz } from '/CIW-JavaScript-Exam/INCAP/ui.js';
// import { toggleContent } from './toggleContent.js';

// document.getElementById('toggleButton').addEventListener('click', () => {
//     toggleContent(contentID); // Replace 'contentId' with the actual ID of the content to toggle
// });

(async function() {
    document.addEventListener('contextmenu', event => event.preventDefault());

    // Define an object to hold all question sets
    const questionSetting = {
        questions: [],
        questions2: [],
        questions3: [],
        questions4: [],
        questions5: [],
        questions6: [],
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
        quiz4: new Quiz(questionSetting.questions4),
        quiz5: new Quiz(questionSetting.questions5),
        quiz6: new Quiz(questionSetting.questions6),
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
        displayQuiz(quizzes.quiz4, 'quiz4', 'result4');
        displayQuiz(quizzes.quiz5, 'quiz5', 'result5');
        displayQuiz(quizzes.quiz6, 'quiz6', 'result6');
        // Add more displayQuiz calls for additional quizzes
    }
})();
