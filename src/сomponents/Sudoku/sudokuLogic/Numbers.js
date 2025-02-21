import React from "react";
import "./sudokuStyles.css"

const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const Numbers = ({onClick, completedNumbers, isActive}) => {
    return (
        <div className={`status__numbers ${isActive ? '' : 'disabled'}`}>
            {
                NUMBERS.map((number) => {
                    if (completedNumbers.includes(number.toString()))
                        return <div key={number} className='status__number status__number--completed' onClick={() => onClick(number.toString())}>{number}</div>
                    else
                        return <div key={number} className='status__number' onClick={() => onClick(number.toString())}>{number}</div>
                })

            }
        </div>
    )
}

export default Numbers

