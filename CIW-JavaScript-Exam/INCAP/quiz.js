// quiz.js
// import { sharedCounts } from '/CIW-JavaScript-Exam/INCAP/main.js'; // Adjust the path as necessary
// console.log('Shared Counts:', sharedCounts); // Debugging line to check the imported object

export class Quiz {
    constructor(questions) {
        this.questions = questions;
        this.count = 0; // Count for this specific quiz
        this.correctCount = 0; // Correct count for this specific quiz
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
