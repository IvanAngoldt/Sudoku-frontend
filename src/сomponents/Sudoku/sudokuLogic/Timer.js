import React, { useState, useEffect } from 'react';
import "./sudokuStyles.css"

const Timer = ({ onStatusChange, onReset, won, onTimeUpdate }) => {
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        if (won) {
            setIsActive(false);
        }
    }, [won]);

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isActive]);

    // 💡 вызываем onTimeUpdate после изменения time
    useEffect(() => {
        if (onTimeUpdate) {
            onTimeUpdate(time);
        }
    }, [time, onTimeUpdate]);

    useEffect(() => {
        onStatusChange(isActive);
    }, [isActive, onStatusChange]);

    useEffect(() => {
        if (onReset) {
            setTime(0);
        }
    }, [onReset]);

    const formatTime = (seconds) => {
        const getMinutes = Math.floor(seconds / 60);
        const getSeconds = seconds % 60;
        return `${getMinutes < 10 ? `0${getMinutes}` : getMinutes}:${getSeconds < 10 ? `0${getSeconds}` : getSeconds}`;
    };

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    return (
        <div className="timer">
            <div>{formatTime(time)}</div>
            <button onClick={toggleTimer}>
                {isActive ? 'Pause' : 'Resume'}
            </button>
        </div>
    );
};

export default Timer;
