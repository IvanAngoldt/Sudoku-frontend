import React, { useState, useEffect } from 'react';
import "./sudokuStyles.css"

const Timer = ({ onStatusChange, onReset }) => {
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        } else if (!isActive && time !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, time]);

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
        return `${getMinutes < 10 ? `0${getMinutes}` : getMinutes}:${
            getSeconds < 10 ? `0${getSeconds}` : getSeconds
        }`;
    };

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    return (
        <div className={`timer`}>
            <div>{formatTime(time)}</div>
            <button onClick={toggleTimer}>
                {isActive ? 'Pause' : 'Resume'}
            </button>
        </div>
    );
};

export default Timer;
