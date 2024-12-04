import React, { useEffect, useState } from 'react';

const decodeHtml = (html) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  return doc.documentElement.textContent;
};

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    fetch(
      'https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple'
    )
      .then((response) => response.json())
      .then((data) => {
        const formattedQuestions = data.results.map((q) => ({
          question: decodeHtml(q.question),
          options: [
            ...q.incorrect_answers.map(decodeHtml),
            decodeHtml(q.correct_answer)
          ].sort(),
          answer: decodeHtml(q.correct_answer)
        }));
        setQuestions(formattedQuestions);
      });
  }, []);

  const handleAnswer = (option) => {
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  if (questions.length === 0) {
    return (
      <div className='flex justify-center items-center h-screen text-lg text-gray-700'>
        Loading...
      </div>
    );
  }

  return (
    <div className='mt-16 bg-gray-700 flex flex-col items-center justify-center p-4 border rounded-md'>
      {showScore ? (
        <div className='bg-gray-800 p-6 rounded-lg shadow-lg text-center'>
          <h2 className='text-2xl font-semibold text-gray-100 mb-4'>
            Quiz Complete
          </h2>
          <p className='text-gray-100 text-lg'>
            You scored <span className='font-bold'>{score}</span> out of{' '}
            <span className='font-bold'>{questions.length}</span>
          </p>
          <button
            className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'
            onClick={() => window.location.reload()}
          >
            Restart Quiz
          </button>
        </div>
      ) : (
        <div className='bg-gray-700 p-6 rounded-lg shadow-lg w-full max-w-lg'>
          <h2 className='text-lg font-semibold text-gray-100 mb-4'>
            {questions[currentQuestion].question}
          </h2>
          <div className='grid grid-cols-1 gap-4'>
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className='px-4 py-2 bg-gray-800 rounded-lg text-left hover:bg-blue-500 hover:text-white transition'
              >
                {option}
              </button>
            ))}
          </div>
          <p className='mt-4 text-sm text-gray-200'>
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
