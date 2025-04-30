import React, { useState, useEffect } from 'react';

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(null);

  useEffect(() => {
    fetch('http://192.168.1.2:5000/questions.json') // Update the URL to your backend endpoint
      .then(response => response.json())
      .then(data => setQuestions(data.quiz)) // Ensure data.quiz is the correct path to the questions array
      .catch(error => console.error('Error fetching quiz:', error));
  }, []);

  const handleOptionSelect = (questionId, option) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: option
    });
  };

  const handleNextQuestion = () => {
    // Check if the current question is answered correctly
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = userAnswers[currentQuestion.id] === currentQuestion.correctAnswer; // Assuming correctAnswer is a property in your question object

    if (isCorrect) {
      // Move to the next set of questions
      const nextIndex = currentQuestionIndex + 3;
      if (nextIndex < questions.length) {
        setCurrentQuestionIndex(nextIndex);
      } else {
        submitQuiz(); // Submit the quiz if there are no more questions
      }
    } else {
      alert("Please answer the current question correctly to proceed.");
    }
  };

  const submitQuiz = () => {
    fetch('/submit-quiz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answers: userAnswers }),
    })
      .then(response => response.json())
      .then(data => {
        setScore(data.score);
        setQuizCompleted(true);
      })
      .catch(error => console.error('Error submitting quiz:', error));
  };

  if (quizCompleted) {
    return (
      <div>
        <h2>Quiz Completed!</h2>
        <p>Your score: {score} out of {questions.length}</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <h2>Question {currentQuestionIndex + 1}</h2>
      <p>{currentQuestion.question}</p>
      <ul>
        {currentQuestion.options.map((option, index) => (
          <li key={index}>
            <label>
              <input
                type="radio"
                name={`question-${currentQuestion.id}`}
                value={option}
                checked={userAnswers[currentQuestion.id] === option}
                onChange={() => handleOptionSelect(currentQuestion.id, option)}
              />
              {option}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleNextQuestion}>
        {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Submit'}
      </button>
    </div>
  );
}