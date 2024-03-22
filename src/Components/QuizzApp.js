import React, { useRef, useState, useEffect } from 'react';
import Chart from 'chart.js/auto'; 

import { data } from '../Questions/data';
import './QuizApp/QuizzApp.css';

const QuizzApp = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(20); // Time remaining for each question
  const [timer, setTimer] = useState(null);

  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);

  const optionArray = [option1, option2, option3, option4];

  // Start timer when a new question is displayed
  useEffect(() => {
    if (!lock) {
      setTimeRemaining(15); // Reset timer for each question
      const countdown = setInterval(() => {
        setTimeRemaining(prevTime => {
          if (prevTime === 0) {
            clearInterval(countdown);
            // Move to the next question when time runs out
            next();
            return 15; // Reset timer for next question
          } else {
            return prevTime - 1;
          }
        });
      }, 1000);
      setTimer(countdown);

      return () => {
        clearInterval(countdown);
      };
    }
  }, [index, lock]);

  const checkAns = (e, ans) => {
    if (!lock) {
      if (question.ans === ans) {
        e.target.classList.add('correct');
        setLock(true);
        setScore(prev => prev + 1);
      } else {
        e.target.classList.add('wrong');
        setLock(true);
        optionArray[question.ans - 1].current.classList.add('correct');
      }
      clearInterval(timer); // Stop the timer when an answer is selected
      setTimeout(next, 2500);
    }
  };

  const next = () => {
    if (lock === false) {
      if (index === data.length - 1) {
        setResult(true);
        return;
      }
      setIndex(prevIndex => prevIndex + 1);
      setQuestion(data[index + 1]);
      setLock(false);
      optionArray.forEach(option => {
        option.current.classList.remove('wrong');
        option.current.classList.remove('correct');
      });
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  // Set up the pie chart when the result changes
  useEffect(() => {
    if (result) {
      const ctx = document.getElementById('pieChart').getContext('2d');
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Correct Answers', 'Incorrect Answers'],
          datasets: [{
            label: 'Quiz Results',
            data: [score, data.length - score],
            backgroundColor: [
              'rgb(75, 192, 192)', // Color for correct answers
              'rgb(255, 99, 132)', // Color for incorrect answers
            ],
            hoverOffset: 4,
          }],
        },
      });
    }
  }, [result, score]);

  return (
    <>
      <div className="contain">
        <h1 style={{textAlign:"center"}}>Quiz App</h1>
        <hr />
        {result ? (
          <>
            <h2>You scored {score} out of {data.length}</h2>
            <canvas id="pieChart" width="300" height="300"></canvas> {/* Add canvas for pie chart */}
            <button onClick={reset}>Restart the Quiz</button>
          </>
        ) : (
          <>
            <h2>{index + 1}.{question.question}</h2>
            <ul>
              <li ref={option1} onClick={e => checkAns(e, 1)}>{question.option1}</li>
              <li ref={option2} onClick={e => checkAns(e, 2)}>{question.option2}</li>
              <li ref={option3} onClick={e => checkAns(e, 3)}>{question.option3}</li>
              <li ref={option4} onClick={e => checkAns(e, 4)}>{question.option4}</li>
            </ul>
            <button onClick={next}>Next</button>
            <div className="intial">
              {index + 1} of {data.length} questions
            </div>
            <div className="timer">Time remaining: {timeRemaining} seconds</div>
          </>
        )}
      </div>
    </>
  );
};

export default QuizzApp;






























