import React from 'react';
import "./sudokuStyles.css";

const Difficulty = ({ onDifficultyChange, isActive, difficulty }) => {
  const handleChange = (event) => {
    onDifficultyChange(event.target.value);
  };

  return (
    <div className={`difficulty ${isActive ? '' : 'disabled'}`}>
      <label>Выберите сложность: </label>
      <select onChange={handleChange} value={difficulty}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
        <option value="very_hard">Very Hard</option>
        <option value="insane">Insane</option>
        <option value="inhuman">Inhuman</option>
      </select>
    </div>
  );
};

export default Difficulty;
