// quiz.js

// This is a class called Quiz that helps us create and manage quizzes
// export
class Quiz {
    // The constructor function runs when we create a new Quiz
    constructor(questions) {
        // We check if the questions are valid: 
        // They must be an array, not empty, and pass validation
        if (!Array.isArray(questions) || questions.length === 0 || !this.validateQuestions(questions)) {
            throw new Error('Invalid questions array'); // If not valid, throw an error
        }
        this.questions = questions; // Store the questions in this quiz
        this.count = 0; // This keeps track of how many questions have been answered in this quiz
        this.correctCount = 0; // This keeps track of how many answers were correct
    }

    // This function checks if the questions are valid
    validateQuestions(questions) {
        // We check if every question has a question text, answers, at least one answer, and a correct answer
        return questions.every(question => 
            question.question && 
            Array.isArray(question.answers) && 
            question.answers.length > 0 && 
            question.correct
        );
    }

    // This function resets the quiz counts back to zero
    reset() {
        this.count = 0; // Reset the count of answered questions
        this.correctCount = 0; // Reset the count of correct answers
    }

    // This function increments the count of answered questions by one
    incrementCount() {
        this.count++; // Increase the count by one
    }

    // This function checks if the selected answer is correct
    checkAnswer(selected, correct) {
        this.incrementCount(); // Increment the count of answered questions
        window.sharedCounts.totalCount++; // Also increment the total count of answered questions globally
        // Check if the selected answer is the same as the correct answer
        if (selected === correct) {
            this.correctCount++; // If correct, increment the correct count for this quiz
            window.sharedCounts.totalCorrectCount++; // Also increment the total correct count globally
            return { correct: true, message: `Correct! The answer is: ${correct}` }; // Return a success message
        } else {
            return { correct: false, message: `Incorrect. The correct answer is: ${correct}` }; // Return a failure message
        }
    }
    
    // This function gets a random set of questions from the quiz
    getRandomQuestions(num) {
        return this.shuffle([...this.questions]).slice(0, num); // Shuffle the questions and return the first 'num' questions
    }

    // This function shuffles an array to randomize the order of its elements
    shuffle(array) {
        const shuffledArray = array.slice(); // Create a copy of the array to shuffle
        // Loop through the array backwards
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            // Get a random index to swap with
            const randomIndex = Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / (Math.pow(2, 32) - 1) * (i + 1));
            // Swap the current element with the random element
            [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
        }
        return shuffledArray; // Return the shuffled array
    }
}
