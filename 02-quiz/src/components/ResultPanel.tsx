import React, { useState } from 'react'
import { classicNameResolver } from 'typescript';
import './ResultPanel.css'

type Props = {
    gameOver: boolean;
    loading: boolean;
    hasBeenAnswered: boolean;
    isLastQuestion: boolean;
    answerCorrect: boolean;
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    seePopUp: boolean;
}
export const ResultPanel: React.FC<Props> = ({
    gameOver,
    loading,
    hasBeenAnswered,
    isLastQuestion,
    answerCorrect,
    callback,
    seePopUp,
}) => {
    return (
        <>
        {seePopUp && 
        (<div className="modal" >
            {hasBeenAnswered && ( <p style={{color: answerCorrect ? 'green' : 'red'}}> {answerCorrect ? 'You are correct!' : 'You are wrong!'}</p>)}
            <br />
            {!gameOver && !loading && hasBeenAnswered ? (
                <button className='next' onClick={callback}>
                    {isLastQuestion ? 'Restart Game ': 'Next Question'}
                </button>
            ): null}
    </div>) }</>
    );
}
