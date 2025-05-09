import React, { useEffect, useRef, useState } from "react";
import "./SudokuStatsPopup.css";

const AUTO_HIDE_DELAY = 2500;
const FADE_OUT_DURATION = 400;

const SudokuStatsPopup = ({ complexity, avgTimeMs, attempts, successRate }) => {
  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);
  const [hovering, setHovering] = useState(false);

  const popupRef = useRef(null);
  const timeoutRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const elapsedRef = useRef(0);

  const startTimer = (delay) => {
    timeoutRef.current = setTimeout(() => {
      setFadingOut(true);
      setTimeout(() => setVisible(false), FADE_OUT_DURATION);
    }, delay);
    startTimeRef.current = Date.now();
  };

  const clearTimer = () => {
    clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    startTimer(AUTO_HIDE_DELAY);

    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setFadingOut(true);
        setTimeout(() => setVisible(false), FADE_OUT_DURATION);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      clearTimer();
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMouseEnter = () => {
    clearTimer();
    elapsedRef.current = Date.now() - startTimeRef.current;
    setHovering(true);
  };

  const handleMouseLeave = () => {
    const remaining = AUTO_HIDE_DELAY - elapsedRef.current;
    if (remaining > 0) {
      startTimer(remaining);
    } else {
      setFadingOut(true);
      setTimeout(() => setVisible(false), FADE_OUT_DURATION);
    }
    setHovering(false);
  };

  if (!visible) return null;

  return (
    <div
      ref={popupRef}
      className={`sudoku-popup ${hovering ? "hovered" : ""} ${fadingOut ? "fade-out" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <strong>Информация о поле:</strong>
      <p>Сложность: <b>{complexity}</b></p>
      <p>Среднее время решения: {Math.round(avgTimeMs / 1000)} сек</p>
      <p>Попыток решения: {attempts}</p>
      <p>Успешных решений: {successRate}%</p>
    </div>
  );
};

export default SudokuStatsPopup;
