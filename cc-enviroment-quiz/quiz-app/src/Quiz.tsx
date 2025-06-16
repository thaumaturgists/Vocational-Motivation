// src/Quiz.tsx
import React, { useState } from 'react';
import './Quiz.css'; // Import the CSS file

interface Question {
  question: string;
  answers: string[];
  correctAnswer: string;
}

const questions: Question[] = [
  {
    question: "What is the capital of France?",
    answers: ["Berlin", "Madrid", "Paris", "Lisbon"],
    correctAnswer: "Paris",
  },
  {
    question: "What is 2 + 2?",
    answers: ["3", "4", "5", "6"],
    correctAnswer: "4",
  },
];

const Quiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const handleAnswer = (answer: string) => {
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuizFinished(true);
    }
  };

  if (isQuizFinished) {
    return (
      <div className="quiz-finished">
        Your score: {score} out of {questions.length}
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <h2 className="quiz-question">{currentQuestion.question}</h2>
      <ul className="quiz-answers">
        {currentQuestion.answers.map((answer) => (
          <li
            key={answer}
            className="quiz-answer"
            onClick={() => handleAnswer(answer)}
          >
            {answer}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Quiz;
