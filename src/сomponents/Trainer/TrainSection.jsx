import React from "react";
import "./trainerStyles.css";

const TrainSection = ({ stratText, onNextStep, onPrevStep, isFirstStep, isLastStep }) => {
    return (
        <div className="train-section">
            <div className="train-section-text-wrapper">
                <div className="train-section-text">
                    <span>{stratText}</span>
                </div>
            </div>
            <div className="train-section-buttons">
                <button onClick={onPrevStep} disabled={isFirstStep} className="train-button-back">Назад</button>
                <button onClick={onNextStep} disabled={isLastStep} className="train-button-forward">Вперёд</button>
            </div>
        </div>
    );
};

export default TrainSection;
