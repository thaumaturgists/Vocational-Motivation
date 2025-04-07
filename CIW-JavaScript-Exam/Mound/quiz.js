// quiz.js
export class Quiz {
    constructor(questions) {
        this.questions = questions;
        this.count = 0;
        this.correctCount = 0;
    }

    reset() {
        this.count = 0;
        this.correctCount = 0;
    }

    incrementCount() {
        this.count++;
    }

    checkAnswer(selected, correct) {
        if (selected === correct) {
            this.correctCount++;
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
