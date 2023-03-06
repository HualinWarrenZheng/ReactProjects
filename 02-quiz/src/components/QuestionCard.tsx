import React, { useState } from 'react'
import { AnswerType } from '../API';
import './QuestionCard.css'
type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerType | undefined;
    questionNr: number;
    totalQuestions: number;
  };

export const QuestionCard: React.FC<Props> = ({
    question,
    answers,
    userAnswer,
    questionNr,
    totalQuestions,
    callback,
  }) => {
    
  return (
    <div>
        <p> Question: {questionNr} / {totalQuestions}</p>
        <p dangerouslySetInnerHTML={{ __html: question }} />
            {answers.map((answer) => (
            <button disabled={userAnswer ? true : false} value={answer} onClick={callback}>
                <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
        ))}
    </div>
  )
}
