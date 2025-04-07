// quiz.js
// import { sharedCounts } from '/CIW-JavaScript-Exam/INCAP/main.js'; // Adjust the path as necessary
// console.log('Shared Counts:', sharedCounts); // Debugging line to check the imported object

export class Quiz {
    constructor(questions) {
        if (!Array.isArray(questions) || questions.length === 0 || !this.validateQuestions(questions)) {
            throw new Error('Invalid questions array');
        }
        this.questions = questions;
        this.count = 0; // Count for this specific quiz
        this.correctCount = 0; // Correct count for this specific quiz
    }

    validateQuestions(questions) {
        return questions.every(question => 
            question.question && 
            Array.isArray(question.answers) && 
            question.answers.length > 0 && 
            question.correct
        );
    }

    reset() {
        this.count = 0;
        this.correctCount = 0;
    }

    incrementCount() {
        this.count++;
    }

    // checkAnswer(selected, correct, sharedCounts) {
    //     this.incrementCount(); // Increment this quiz's count
    //     sharedCounts.totalCount++; // Increment the shared total count
    //     if (selected === correct) {
    //         this.correctCount++;
    //         sharedCounts.totalCorrectCount++; // Increment the shared correct count
    //         return { correct: true, message: `Correct! The answer is: ${correct}` };
    //     } else {
    //         return { correct: false, message: `Incorrect. The correct answer is: ${correct}` };
    //     }

    // }

    checkAnswer(selected, correct) {
        console.log('Before Check:', window.sharedCounts); // Debugging line before checking answer
        this.incrementCount(); // Increment this quiz's count
        window.sharedCounts.totalCount++; // Increment the shared total count
        console.log('Correct Answer:', window.sharedCounts); // Debugging line after correct answer
        if (selected === correct) {
            this.correctCount++;
            window.sharedCounts.totalCorrectCount++; // Increment the shared correct count
            return { correct: true, message: `Correct! The answer is: ${correct}` };
        } else {
            return { correct: false, message: `Incorrect. The correct answer is: ${correct}` };
        }
    }
    
    getRandomQuestions(num) {
        return this.shuffle([...this.questions]).slice(0, num);
    }

    shuffle(array) {
        const shuffledArray = array.slice();
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / (Math.pow(2, 32) - 1) * (i + 1));
            [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
        }
        return shuffledArray;
    }
}

// Summary of the Quiz Class:
// Constructor: When we create a new Quiz, it checks if the questions are valid. If they are, it stores them and sets up counters for answered and correct questions.
// Validation: The validateQuestions function checks if each question has the necessary parts (text, answers, and a correct answer).
// Resetting: The reset function sets the counts back to zero, preparing the quiz for a new round.
// Counting Answers: The incrementCount function increases the count of how many questions have been answered.
// Checking Answers: The checkAnswer function checks if the selected answer is correct, updates the counts, and returns a message about the result.
// Random Questions: The getRandomQuestions function returns a random selection of questions from the quiz.
// Shuffling: The shuffle function randomizes the order of the questions so that they appear in a different order each time.
// This class is like a smart helper that keeps track of everything related to a quiz, making sure it runs smoothly and fairly!