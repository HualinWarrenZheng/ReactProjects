import React, { useState } from 'react';
import './App.css';
import * as type from './API'
import { fetchQuizQuestions } from './API';
import { QuestionCard } from './components/QuestionCard';
import { ResultPanel } from './components/ResultPanel';


function App() {
  //Fields
  const TOTAL_QUESTIONS = 10;

  //States
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<type.QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<type.AnswerType[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [answerCorrect, setAnswerCorrect] = useState(false);
  const [seePopUp, setSeePopUp] = useState(false);

  //Functions
  const startState = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      type.Difficulty.EASY
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: any) => {
    if (!gameOver) {
      // User's answer
      const answer = e.currentTarget.value;
      // Check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      // Add score if answer is correct
      if (correct) setScore((prev) => prev + 1);
      // Save the answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
      setAnswerCorrect(correct);
      setSeePopUp(true);
    }
  };

  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQ = number + 1;

    if (nextQ === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }

    setSeePopUp(false);
  };
 
  return(
    <>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className='start' onClick={startState}>
          Start Game
        </button>
      ) : null}
      {!gameOver ? <p className='score'>Score: {score}</p> : null}
      {loading ? <p>Loading Questions...</p> : null}
      {!loading && !gameOver && (<QuestionCard
        questionNr={number + 1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        callback={checkAnswer}
        />)}

        {<ResultPanel
        answerCorrect = {answerCorrect}
        gameOver = {gameOver}
        loading = {loading}
        hasBeenAnswered = {userAnswers.length === number + 1}
        isLastQuestion = {number === TOTAL_QUESTIONS - 1 }
        callback = {nextQuestion}
        seePopUp = {seePopUp}
         />}
    </>
  );
}

export default App;
