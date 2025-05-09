import React from 'react';
import "./sudokuStyles.css"

const Overlay = ({ won, elapsedTime, newAchievements = [] }) => {
  if (!won) return null;

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${secs < 10 ? '0' + secs : secs}`;
  };

  const handleNewGame = () => {
    window.location.reload();
  };

  return (
    <div className="overlay">
      <div className="overlay__content">
        <div className="overlay__text">
          <span className="overlay__textspan1">Поздравляю, </span>
          <span className="overlay__textspan2">вы победили за {formatTime(elapsedTime)}</span>
        </div>

        {newAchievements.length > 0 && (
          <div className="overlay__achievements">
            <h3>Вы получили достижения:</h3>
            <ul>
              {newAchievements.map((ach) => (
                <li key={ach.code}>
                  <strong>{ach.title}</strong> — {ach.description}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div
          className="overlay__text"
          onClick={handleNewGame}
          onMouseEnter={(e) => (e.target.style.cursor = 'pointer')}
        >
          <span className="overlay__textspan1">Хотите сыграть </span>
          <span className="overlay__textspan2">новую игру?</span>
        </div>
      </div>
    </div>
  );
};

  

export default Overlay;
