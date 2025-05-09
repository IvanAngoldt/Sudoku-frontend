import React from 'react';
import './sudokuStyles.css';

const RoundButton = ({ onClick, icon, label, active }) => {
  return (
    <div className="round-button" onClick={onClick}>
      <div className="round-icon">
        {icon}
        {label === 'Note' && (
          <span className={`note-indicator ${active ? 'on' : 'off'}`}>
            {active ? 'ON' : 'OFF'}
          </span>
        )}
      </div>
    </div>
  );
};

export default RoundButton;
