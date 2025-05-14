import React from "react";
import { useCallback } from "react";
import GameSection from "./GameSection";
import StatusSection from "./StatusSection";
import Numbers from "./Numbers";
import Timer from "./Timer";
import Difficulty from "./Difficulty";
import Overlay from "./Overlay";
import SudokuStatsPopup from "../../SudokuStatsPopup/SudokuStatsPopup";

import "./sudokuStyles.css";

const Game = ({ 
  initialField, 
  solution, 
  complexity, 
  stats,
  onGameComplete,
  onDifficultyChange 
}) => {
  
  const [gameArray, setGameArray] = React.useState([]);
  const [initArray, setInitArray] = React.useState([]);
  const [solvedArray, setSolvedArray] = React.useState([]);
  const [cellSelected, setCellSelected] = React.useState(-1);
  const [incorrectCells, setIncorrectCells] = React.useState([]);
  const [completedNumbers, setCompletedNumbers] = React.useState([]);
  const [highlightCubes, setHighlightCubes] = React.useState([]);
  const [highlightNumber, setHighlightNumber] = React.useState(-1);
  const [noteMode, setNoteMode] = React.useState(false);
  const [notesArray, setNotesArray] = React.useState([]);
  const [history, setHistory] = React.useState([]);
  const [isGameActive, setIsGameActive] = React.useState(true);
  const [resetTimer, setResetTimer] = React.useState(false);
  const [won, setWon] = React.useState(false);
  const [elapsedTime, setElapsedTime] = React.useState(0);
  const [newAchievements, setNewAchievements] = React.useState([]);
  const [showStats, setShowStats] = React.useState(true);
  const [statsTimer, setStatsTimer] = React.useState(null);
  const statsRef = React.useRef(null);

  const parseSudokuString = (input) => input.split(",");

  const startStatsTimer = () => {
    if (statsTimer) {
      clearTimeout(statsTimer);
    }
    const timer = setTimeout(() => {
      setShowStats(false);
    }, 5000);
    setStatsTimer(timer);
  };

  const handleStatsMouseEnter = () => {
    if (statsTimer) {
      clearTimeout(statsTimer);
    }
  };

  const handleStatsMouseLeave = () => {
    startStatsTimer();
  };

  const handleClickOutside = (event) => {
    if (statsRef.current && !statsRef.current.contains(event.target)) {
      setShowStats(false);
      if (statsTimer) {
        clearTimeout(statsTimer);
      }
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (statsTimer) {
        clearTimeout(statsTimer);
      }
    };
  }, [statsTimer]);

  React.useEffect(() => {
    setGameArray(parseSudokuString(initialField));
    setInitArray(parseSudokuString(initialField));
    setSolvedArray(parseSudokuString(solution));
    setCellSelected(-1);
    setIncorrectCells([]);
    setCompletedNumbers([]);
    setHighlightCubes([]);
    setHighlightNumber(-1);
    setNoteMode(false);
    setNotesArray([]);
    setHistory([]);
    setResetTimer(true);
    setWon(false);
    setElapsedTime(0);
    setShowStats(true);
    startStatsTimer();

    const initialNotesArray = new Array(81).fill(null).map(() => []);
    setNotesArray(initialNotesArray);
  }, [initialField, solution]);

  React.useEffect(() => {
    if (resetTimer) {
      setResetTimer(false);
    }
  }, [resetTimer]);

  const isSolved = useCallback((index, value) => {
    return gameArray.every((cell, i) =>
      i === index ? value === solvedArray[i] : cell === solvedArray[i]
    );
  }, [gameArray, solvedArray]);

  const fillCell = useCallback((index, value, isCorrect) => {
    if (initArray[index] === "0" && isGameActive) {
      let tempHistory = history.slice();
      tempHistory.push({
        gameArray: gameArray.slice(),
        notesArray: notesArray.map((notes) => [...notes]),
      });

      setNotesArray((prev) => {
        const updated = [...prev];
        updated[index] = [];
        return updated;
      });

      setNotesArray((prev) => {
        const updated = [...prev];
        updated.forEach((notes, i) => {
          if (highlightCubes.includes(i) && notes.includes(value)) {
            updated[i] = notes.filter((note) => note !== value);
          }
        });
        return updated;
      });

      let tempIncorrectCells = incorrectCells.slice();
      if (!isCorrect) {
        if (!tempIncorrectCells.includes(index)) {
          tempIncorrectCells.push(index);
        }
      } else {
        tempIncorrectCells = tempIncorrectCells.filter((i) => i !== index);
      }

      let tempArray = gameArray.slice();
      tempArray[index] = value;

      setGameArray(tempArray);
      setIncorrectCells(tempIncorrectCells);
      setHistory(tempHistory);
      checkCompletedNumbers(tempArray);

      if (isSolved(index, value)) {
        setWon(true);
        setIsGameActive(false);

        const sendResult = async () => {
          try {
            const result = await onGameComplete(elapsedTime * 1000);
            if (Array.isArray(result.qualified_rewards) && result.qualified_rewards.length > 0) {
              setNewAchievements(result.qualified_rewards);
            }
          } catch (err) {
            console.error("Ошибка при отправке результата:", err);
          }
        };
      
        sendResult();
      }
    }
  }, [gameArray, initArray, isGameActive, notesArray, history, setHistory, 
    elapsedTime, highlightCubes, incorrectCells, isSolved, onGameComplete]);

  const fillNote = useCallback((index, value) => {
    if (initArray[index] === "0" && isGameActive) {
      let tempHistory = history.slice();
      tempHistory.push({
        gameArray: gameArray.slice(),
        notesArray: notesArray.map((notes) => [...notes]),
      });

      if (gameArray[index] > 0) {
        fillCell(index, "0", true);
        setHighlightNumber(-1);
      }

      let tempNotes = notesArray.slice();
      if (!tempNotes[index]) tempNotes[index] = [];
      tempNotes[index].push(value);
      setNotesArray(tempNotes);
      setHistory(tempHistory);
    }
  }, [initArray, history, isGameActive, gameArray, notesArray, fillCell, setHighlightNumber, setHistory]);

  const makeHighlightNumber = useCallback((number) => {
    setHighlightNumber(number !== "0" ? number : -1);
  }, [setHighlightNumber]);

  const userFillCell = useCallback((index, value) => {
    const isCorrect = value === solvedArray[index];
    fillCell(index, value, isCorrect);
  }, [fillCell, solvedArray]);

  const handleNumberClick = useCallback((number) => {
    if (cellSelected === -1 || initArray[cellSelected] !== "0" || !isGameActive) return;

    if (!noteMode) {
      if (gameArray[cellSelected] === number) {
        userFillCell(cellSelected, "0");
        setHighlightNumber(-1);
      } else {
        userFillCell(cellSelected, number);
        makeHighlightNumber(number);
      }
    } else {
      if (notesArray[cellSelected].includes(number)) {
        const updatedNotes = notesArray[cellSelected].filter((n) => n !== number);
        setNotesArray((prev) => {
          const updated = [...prev];
          updated[cellSelected] = updatedNotes;
          return updated;
        });
      } else {
        fillNote(cellSelected, number);
      }
    }
  }, [cellSelected, initArray, isGameActive, noteMode, gameArray, notesArray, fillNote, makeHighlightNumber, userFillCell]);

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;
      if (key >= "1" && key <= "9") {
        if (cellSelected !== -1) {
          handleNumberClick(key.toString());
        }
      }
      if (key === "0") {
        userClickedNote();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameArray, cellSelected, notesArray, noteMode, isGameActive, handleNumberClick]);

  React.useEffect(() => {
    checkCompletedNumbers(gameArray);
  }, [gameArray]);

  const handleTimerStatusChange = (status) => {
    setIsGameActive(status);
  };

  const checkCompletedNumbers = (array) => {
    const count = Array(9).fill(0);
    array.forEach((value) => {
      if (value !== "0") {
        count[parseInt(value) - 1]++;
      }
    });

    const completed = [];
    count.forEach((num, index) => {
      if (num === 9) {
        completed.push((index + 1).toString());
      }
    });

    setCompletedNumbers(completed);
  };

  const userClickedUndo = () => {
    if (!history.length || !isGameActive) return;

    let tempHistory = history.slice();
    let lastState = tempHistory.pop();

    setGameArray(lastState.gameArray);
    setNotesArray(lastState.notesArray);

    let canceledIndex = -1;

    for (let i = 0; i < gameArray.length; i++) {
      if (gameArray[i] !== lastState.gameArray[i]) {
        canceledIndex = i;
        highLightingCells(i);
        makeHighlightNumber(lastState.gameArray[i] !== "0" ? lastState.gameArray[i] : -1);

        const isCorrect = lastState.gameArray[i] === solvedArray[i];
        let tempIncorrect = incorrectCells.slice();
        if (!isCorrect) {
          if (!tempIncorrect.includes(i)) tempIncorrect.push(i);
        } else {
          tempIncorrect = tempIncorrect.filter((idx) => idx !== i);
        }
        setIncorrectCells(tempIncorrect);
        break;
      }
    }

    if (canceledIndex === -1) {
      for (let i = 0; i < notesArray.length; i++) {
        if (notesArray[i].join(",") !== lastState.notesArray[i].join(",")) {
          canceledIndex = i;
          break;
        }
      }
    }

    setCellSelected(canceledIndex);
    setHistory(tempHistory);
    checkCompletedNumbers(lastState.gameArray);
  };

  const highLightingCells = (index) => {
    const indexes = [];
    const rowStart = Math.floor(index / 9) * 9;
    const col = index % 9;

    for (let i = rowStart; i < rowStart + 9; i++) indexes.push(i);
    for (let i = col; i < 81; i += 9) indexes.push(i);

    const squareRow = Math.floor(Math.floor(index / 9) / 3) * 3;
    const squareCol = Math.floor(col / 3) * 3;
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const i = (squareRow + r) * 9 + (squareCol + c);
        indexes.push(i);
      }
    }

    setHighlightCubes([...new Set(indexes)]);
  };

  const highlightingNumbers = (index) => {
    const value = gameArray[index];
    setHighlightNumber(value !== "0" ? value : -1);
  };

  const handleCellClicked = (index) => {
    if (!isGameActive) return;
    setCellSelected(index);
    highLightingCells(index);
    highlightingNumbers(index);
  };

  const userClickedNote = () => {
    setNoteMode((prev) => !prev);
  };

    const clearCell = () => {
        if (cellSelected === -1 || initArray[cellSelected] !== "0") return;

        let tempHistory = history.slice();
        tempHistory.push({
            gameArray: gameArray.slice(),
            notesArray: notesArray.slice(),
        });

        if (gameArray[cellSelected] !== "0") {
            fillCell(cellSelected, "0", true);
        }

        let tempNotes = notesArray.slice();
        tempNotes[cellSelected] = [];
        setNotesArray(tempNotes);
        setHighlightNumber(-1);
        setIncorrectCells((prev) => prev.filter((i) => i !== cellSelected));
        setHistory(tempHistory);
    };

    return (
        <div className="game-container">
          {stats && showStats && (
            <div 
              ref={statsRef}
              onMouseEnter={handleStatsMouseEnter}
              onMouseLeave={handleStatsMouseLeave}
            >
              <SudokuStatsPopup
                complexity={stats.complexity}
                avgTimeMs={stats.avgTimeMs}
                attempts={stats.attempts}
                successRate={stats.successRate}
              />
            </div>
          )}

          <Overlay won={won} 
            elapsedTime={elapsedTime} 
            newAchievements={newAchievements} 
          />
          <Timer
            onStatusChange={handleTimerStatusChange}
            onReset={resetTimer}
            won={won}
            onTimeUpdate={setElapsedTime}
          />
          <Difficulty
            onDifficultyChange={onDifficultyChange}
            isActive={isGameActive}
            difficulty={complexity}
          />
          <GameSection
            gameArray={gameArray}
            initArray={initArray}
            onClick={handleCellClicked}
            cellSelected={cellSelected}
            incorrectCells={incorrectCells}
            highlightCubes={highlightCubes}
            highlightNumber={highlightNumber}
            notesArray={notesArray}
            isActive={isGameActive}
          />
          <StatusSection
            noteClick={userClickedNote}
            noteMode={noteMode}
            undoClick={userClickedUndo}
            clearCell={clearCell}
            isActive={isGameActive}
          />
          <Numbers
            onClick={handleNumberClick}
            completedNumbers={completedNumbers}
            isActive={isGameActive}
          />
        </div>
    );
};

export default Game;
