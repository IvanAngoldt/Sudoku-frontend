import React from 'react';

import "./sudokuStyles.css"

const Difficulty = ({ onDifficultyChange, isActive }) => {
    const handleChange = (event) => {
        onDifficultyChange(event.target.value);
    };

    return (
        // <div className="difficulty">
        <div className={`difficulty ${isActive ? '' : 'disabled'}`}>
            <label>Select Difficulty: </label>
            <select onChange={handleChange}>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
            </select>
        </div>
    );
}

export default Difficulty;
