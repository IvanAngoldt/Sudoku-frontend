import React from "react";

import { getUniqueSudoku } from "../sudokuGenerator/uniqueSudoku";

import GameSection from "./GameSection";
import StatusSection from "./StatusSection";
import Numbers from "./Numbers";
import Timer from "./Timer";
import Difficulty  from "./Difficulty";
import Overlay from "./Overlay";

import "./sudokuStyles.css"

const Game = () => {

    const [gameArray, setGameArray] = React.useState([])
    const [initArray, setInitArray] = React.useState([])
    const [solvedArray, setSolvedArray] = React.useState([])
    const [cellSelected, setCellSelected] = React.useState(-1)
    const [incorrectCells, setIncorrectCells] = React.useState([])
    const [completedNumbers, setCompletedNumbers] = React.useState([])
    const [highlightCubes, setHighlightCubes] = React.useState([]);
    const [highlightNumber, setHighlightNumber] = React.useState(-1);
    const [noteMode, setNoteMode] = React.useState(false);
    const [notesArray, setNotesArray] = React.useState([]);
    const [history, setHistory] = React.useState([]);
    const [isGameActive, setIsGameActive] = React.useState(true);
    const [difficulty, setDifficulty] = React.useState('Easy');
    const [resetTimer, setResetTimer] = React.useState(false);
    const [won, setWon] = React.useState(false);

    React.useEffect(() => {
        let [temporaryInitArray, temporarySolvedArray] = getUniqueSudoku(difficulty);
        setGameArray(temporaryInitArray)
        setInitArray(temporaryInitArray)
        setSolvedArray(temporarySolvedArray)
        setCellSelected(-1)
        setIncorrectCells([])
        setCompletedNumbers([])
        setHighlightCubes([])
        setHighlightNumber(-1)
        setNoteMode(false)
        setNotesArray([])
        setHistory([])
        setResetTimer(true);
        setWon(false);

        let initialNotesArray = new Array(81).fill(null).map(() => [])
        setNotesArray(initialNotesArray)
    }, [difficulty])

    React.useEffect(() => {
        if (resetTimer) {
            setResetTimer(false);
        }
    }, [resetTimer]);

    React.useEffect(() => {
        const handleKeyDown = (event) => {
            const { key } = event;
            if (key >= '1' && key <= '9') {
                if (cellSelected !== -1) {
                    handleNumberClick(key.toString());
                }
            }

            if (key === '0') {
                userClickedNote()
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [gameArray, cellSelected, notesArray, noteMode, isGameActive]);

    const handleTimerStatusChange = (status) => {
        setIsGameActive(status);
    };

    const handleDifficultyChange = (newDifficulty) => {
        setDifficulty(newDifficulty);
        setResetTimer(true);
    };

    const checkCompletedNumbers = (array) => {
        const count = Array(9).fill(0)
        array.forEach(value => {
            if (value !== '0') {
                count[parseInt(value) - 1]++
            }
        })

        const completed = []
        count.forEach((num, index) => {
            if (num === 9) {
                completed.push((index + 1).toString())
            }
        })

        setCompletedNumbers(completed)
    }


    const isSolved = (index, value) => {
        if (gameArray.every((cell, cellIndex) => {
            if (cellIndex === index)
                return value === solvedArray[cellIndex]
            else
                return cell === solvedArray[cellIndex]
        })) {
            return true
        }
        return false
    }


    const fillCell = (index, value, isCorrect) => {
        if (initArray[index] === '0' && isGameActive) {
            // Добавляем текущее состояние в историю
            let tempHistory = history.slice();
            tempHistory.push({
                gameArray: gameArray.slice(),
                notesArray: notesArray.map(notes => [...notes]) // Клонируем notesArray
            });

            // Удалить заметки из ячейки
            setNotesArray(prevNotesArray => {
                const updatedArray = [...prevNotesArray];
                updatedArray[index] = [];
                return updatedArray;
            });

            // Удалить цифру из заметок по Cubes, если необходимо
            setNotesArray(prevNotesArray => {
                const updatedArray = [...prevNotesArray];
                updatedArray.forEach((notes, i) => {
                    if (highlightCubes.includes(i) && notes.includes(value)) {
                        updatedArray[i] = notes.filter(note => note !== value);
                    }
                });
                return updatedArray;
            });

            let tempIncorrectCells = incorrectCells.slice();
            if (!isCorrect) {
                if (!tempIncorrectCells.includes(index)) {
                    tempIncorrectCells.push(index);
                }
            } else {
                tempIncorrectCells = tempIncorrectCells.filter(cellIndex => cellIndex !== index);
            }

            let tempArray = gameArray.slice();
            tempArray[index] = value;
            setGameArray(tempArray);

            setIncorrectCells(tempIncorrectCells);
            setHistory(tempHistory);

            checkCompletedNumbers(tempArray);

            if (isSolved(index, value)) {
                setWon(true);
            }
        }
    };

    const fillNote = (index, value) => {
        if (initArray[index] === '0'  && isGameActive) {
            // Добавляем текущее состояние в историю
            let tempHistory = history.slice();
            tempHistory.push({
                gameArray: gameArray.slice(),
                notesArray: notesArray.map(notes => [...notes]) // Клонируем notesArray
            });

            if (gameArray[index] > 0) {
                fillCell(index, '0', true); // Убираем цифру перед добавлением заметки
                setHighlightNumber(-1);
            }

            let tempNotes = notesArray.slice();
            if (!tempNotes[index]) {
                tempNotes[index] = [];
            }
            tempNotes[index].push(value);
            setNotesArray(tempNotes);
            setHistory(tempHistory);
        }
    };

    const userClickedUndo = () => {
        if (history.length  && isGameActive) {
            let tempHistory = history.slice();
            let lastState = tempHistory.pop();

            // Восстанавливаем состояние
            setGameArray(lastState.gameArray);
            setNotesArray(lastState.notesArray);

            // Находим индекс ячейки, в которой было отменено действие (цифра или заметка)
            let canceledIndex = -1;

            // Проверяем изменения в gameArray
            for (let i = 0; i < gameArray.length; i++) {
                if (gameArray[i] !== lastState.gameArray[i]) {
                    canceledIndex = i;

                    // Вызываем функции для подсветки
                    highLightingCells(canceledIndex);
                    if (lastState.gameArray[canceledIndex] !== '0')
                        makeHighlightNumber(lastState.gameArray[canceledIndex]);
                    else
                        makeHighlightNumber(-1);

                    const isCorrect = lastState.gameArray[canceledIndex] === solvedArray[canceledIndex]

                    let tempIncorrectCells = incorrectCells.slice();
                    if (!isCorrect) {
                        if (!tempIncorrectCells.includes(canceledIndex)) {
                            tempIncorrectCells.push(canceledIndex);
                        }
                    } else {
                        tempIncorrectCells = tempIncorrectCells.filter(cellIndex => cellIndex !== canceledIndex);
                    }
                    setIncorrectCells(tempIncorrectCells);

                    break;
                }
            }

            // Если не нашли в gameArray, ищем в notesArray
            if (canceledIndex === -1) {
                for (let i = 0; i < notesArray.length; i++) {
                    if (notesArray[i].join(',') !== lastState.notesArray[i].join(',')) {
                        canceledIndex = i;
                        break;
                    }
                }
            }

            // Устанавливаем выбранную ячейку
            setCellSelected(canceledIndex);

            setHistory(tempHistory);

            checkCompletedNumbers(lastState.gameArray);
        }
    };

    const userFillCell = (index, value) => {
        const isCorrect = value === solvedArray[index]
        fillCell(index, value, isCorrect)
    }

    const highLightingCells = (index) => {
        const indexes = [];

        const rowStart = Math.floor(index / 9) * 9;
        const columnStart = index % 9;

        // строка
        for (let i = rowStart; i < rowStart + 9; i++) {
            if (!indexes.includes(i)) {
                indexes.push(i)
            }
        }

        // столбец
        for (let i = columnStart; i < 81; i += 9) {
            if (!indexes.includes(i)) {
                indexes.push(i)
            }
        }

        // квадрат
        const squareRowStart = Math.floor(Math.floor(index / 9) / 3) * 3
        const squareColumnStart = Math.floor(columnStart / 3) * 3
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                const squareIndex = (squareRowStart + r) * 9 + (squareColumnStart + c)
                if (!indexes.includes(squareIndex)) {
                    indexes.push(squareIndex)
                }
            }
        }

        setHighlightCubes(indexes)
    }


    const highlightingNumbers = (index) => {
        const value = gameArray[index];

        if (value !== '0')
            setHighlightNumber(value);
        else
            setHighlightNumber(-1);
    };


    const makeHighlightNumber = (number) => {
        if (number !== '0')
            setHighlightNumber(number)
        else
            setHighlightNumber(-1);
    }

    const handleNumberClick = (number) => {
        if (cellSelected !== -1  && initArray[cellSelected] === '0'  && isGameActive) {
            if (noteMode === false) {
                if (gameArray[cellSelected] === number) {
                    userFillCell(cellSelected, '0')
                    setHighlightNumber(-1)
                } else {
                    userFillCell(cellSelected, number)
                    makeHighlightNumber(number)
                }
            } else {
                if (notesArray[cellSelected].includes(number)) {
                    const updatedNotes = notesArray[cellSelected].filter(note => note !== number);
                    setNotesArray(prevNotesArray => {
                        const updatedArray = [...prevNotesArray];
                        updatedArray[cellSelected] = updatedNotes;
                        return updatedArray;
                    });
                } else {
                    fillNote(cellSelected, number)
                }
            }
        }
    }

    const handleCellClicked = (index) => {
        // if (numberSelected !== '0') {
        //     userFillCell(index, numberSelected)
        // }
        if (isGameActive) {
            setCellSelected(index)
            highLightingCells(index)
            highlightingNumbers(index)
        }
    }

    const userClickedNote = () => {
        if (!noteMode) {
            setNoteMode(true)
        }
        else {
            setNoteMode(false)
        }
    }

    const clearCell = () => {
        if (cellSelected !== -1 && initArray[cellSelected] === '0') {
            let tempHistory = history.slice();

            // Сохраняем текущее состояние до очистки ячейки
            tempHistory.push({
                gameArray: gameArray.slice(),
                notesArray: notesArray.slice()
            });

            // Очищаем цифру в ячейке
            if (gameArray[cellSelected] !== '0') {
                fillCell(cellSelected, '0', true);
            }

            // Очищаем заметки в ячейке
            let tempNotes = notesArray.slice();
            tempNotes[cellSelected] = []; // Очищаем массив заметок для выбранной ячейки
            setNotesArray(tempNotes);

            setHighlightNumber(-1);

            let tempIncorrectCells = incorrectCells.slice();
            if (tempIncorrectCells.includes(cellSelected)) {
                tempIncorrectCells = tempIncorrectCells.filter(cellIndex => cellIndex !== cellSelected);
            }
            setIncorrectCells(tempIncorrectCells);

            // Обновляем историю
            setHistory(tempHistory);
        }
    };
    
    return (
        <div className="game-container">
            <Overlay
                won={won}
            />
            <Timer
                onStatusChange={handleTimerStatusChange}
                onReset={resetTimer}
                isGameActive={isGameActive}
            />
            <Difficulty
                onDifficultyChange={handleDifficultyChange}
                isActive={isGameActive}
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
}

export default Game