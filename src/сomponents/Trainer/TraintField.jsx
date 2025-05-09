import React from "react";
import TrainGameSection from "./TrainGameSection";
import TrainSection from "./TrainSection";
import "./trainerStyles.css";

const TraintFeld = ({ steps, initialGrid, initialNotes, onStepChange }) => {
    const [gameArray, setGameArray] = React.useState([]);
    const [initArray, setInitArray] = React.useState([]);
    const [cellSelected, setCellSelected] = React.useState(-1);

    const [highlightCells, setHighlightCells] = React.useState([]);
    const [highlightOneCell, setHighlightOneCell] = React.useState([]);

    const [highlightCellsWithNote, setHighlightCellsWithNote] = React.useState([]);
    const [highlightNotes, setHighlightNotes] = React.useState([]);

    const [highlightCellsWithBadNote, setHighlightCellsWithBadNote] = React.useState([]);
    const [highlightBadNotes, setHighlightBadNotes] = React.useState([]);


    const [highlightCubes, setHighlightCubes] = React.useState([]);
    const [highlightNumber, setHighlightNumber] = React.useState(-1);
    const [stepIndex, setStepIndex] = React.useState(0);
    const [stratText, setStratText] = React.useState("");
    const [history, setHistory] = React.useState([]);
    const [notesArray, setNotesArray] = React.useState([]);
    
    React.useEffect(() => {
        const flatInit = initialGrid.flat();
        setGameArray(flatInit);
        setInitArray(flatInit);
        setHistory([]);

        const preparedNotes = initialNotes?.length === 81
            ? initialNotes.map(notes => [...notes])
            : new Array(81).fill(null).map(() => []);

        setNotesArray(preparedNotes);
    }, [initialGrid, initialNotes]);

    React.useEffect(() => {
        if (stepIndex >= 0 && stepIndex < steps.length) {
            const step = steps[stepIndex];
            handleStep(step);
            setStratText(step.text);
            
            // Вызываем onStepChange только при достижении последнего шага
            if (stepIndex === steps.length - 1) {
                onStepChange?.(stepIndex);
            }
        }
    }, [stepIndex, steps]);

    const fillNumber = (index, number) => {
        const tempHistory = [...history];
        tempHistory.push({
            gameArray: [...gameArray],
            notesArray: notesArray.map(notes => [...notes])
        });

        setNotesArray(prevNotesArray => {
            const updatedArray = [...prevNotesArray];
            updatedArray[index] = [];
            return updatedArray;
        });

        const tempArray = [...gameArray];
        tempArray[index] = number.toString();

        const updatedNotes = [...notesArray];
        updatedNotes[index] = [];

        setGameArray(tempArray);
        setNotesArray(updatedNotes);
        
        makeHighlightNumber(number);
        setCellSelected(index);
        highLightingCells(index);

        setHistory(tempHistory);
    };

    const fillNote = (index, value) => {
        // Добавляем текущее состояние в историю
        let tempHistory = history.slice();
        tempHistory.push({
            gameArray: gameArray.slice(),
            notesArray: notesArray.map(notes => [...notes]) // Клонируем notesArray
        });

        if (gameArray[index] > 0) {
            fillNumber(index, '0'); // Убираем цифру перед добавлением заметки
            setHighlightNumber(-1);
        }

        let tempNotes = notesArray.slice();
        if (!tempNotes[index]) {
            tempNotes[index] = [];
        }
        tempNotes[index].push(value);
        setNotesArray(tempNotes);

        makeHighlightNumber(value);
        setCellSelected(index);
        highLightingCells(index);

        setHistory(tempHistory);
    };

    const deleteNote = (indexes, values) => {
        const tempHistory = history.slice();
        tempHistory.push({
            gameArray: [...gameArray],
            notesArray: notesArray.map(notes => [...notes]) // глубокое копирование
        });
    
        const updatedNotesArray = notesArray.map((notes, i) => {
            if (indexes.includes(i)) {
                return notes.filter(note => !values.includes(note));
            }
            return notes;
        });
    
        setHighlightCells(indexes);

        setNotesArray(updatedNotesArray);
        setHistory(tempHistory);
    };    

    const handleStep = (step) => {
        if (step.type === "highlightCells") {
            setHighlightCells(step.index);
        } else if (step.type === "highlightOneCell") {
            setHighlightOneCell(step.index);
        } else if (step.type === "combinedHighlight") {
            setHighlightOneCell(step.highlightOneCell);
            setHighlightCells(step.highlightCells);
        } else if (step.type === "highlightNotes") {
            setHighlightCellsWithNote(step.index);
            setHighlightNotes(step.number);
        } else if (step.type === "highlightBadNotes") {
            setHighlightCellsWithBadNote(step.index);
            setHighlightBadNotes(step.number);
        } else if (step.type === "select") {
            handleCellClickedy(step.index);
        } else if (step.type === "fill") {
            fillNumber(step.index, step.number);
        } else if (step.type === "note") {
            fillNote(step.index, step.number);
        } else if (step.type === "deleteNotes") {
            deleteNote(step.index, step.number);
        }
    };
    

    const handleNextStep = () => {
        if (stepIndex < steps.length - 1) {
            setHighlightCells([]);
            setHighlightOneCell([]);
            setHighlightCubes([]);

            setHighlightNotes([]);
            setHighlightCellsWithNote([]);

            setHighlightBadNotes([]);
            setHighlightCellsWithBadNote([]);

            setStepIndex(prev => prev + 1);
        }
    };

    const handlePrevStep = () => {
        if (stepIndex <= 0) return;

        setHighlightCells([]);
        setHighlightOneCell([]);
        setHighlightCubes([]);

        setHighlightNotes([]);
        setHighlightCellsWithNote([]);

        setHighlightBadNotes([]);
        setHighlightCellsWithBadNote([]);
    
        const tempHistory = [...history];
        const lastState = tempHistory.pop();
    
        if (lastState) {
            setGameArray(lastState.gameArray);
            setNotesArray(lastState.notesArray);
    
            let canceledIndex = -1;
            for (let i = 0; i < lastState.gameArray.length; i++) {
                if (gameArray[i] !== lastState.gameArray[i]) {
                    canceledIndex = i;
                    highLightingCells(canceledIndex);
                    const restoredValue = lastState.gameArray[canceledIndex];
                    makeHighlightNumber(restoredValue !== '0' ? restoredValue : -1);
                    break;
                }
            }
    
            setCellSelected(canceledIndex);
            setHistory(tempHistory);
        }
    
        setStepIndex(prev => prev - 1);
    };
    
    const highLightingCells = (index) => {
        const indexes = [];
        const rowStart = Math.floor(index / 9) * 9;
        const columnStart = index % 9;

        for (let i = rowStart; i < rowStart + 9; i++) indexes.push(i);
        for (let i = columnStart; i < 81; i += 9) indexes.push(i);

        const squareRowStart = Math.floor(Math.floor(index / 9) / 3) * 3;
        const squareColumnStart = Math.floor(columnStart / 3) * 3;

        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                const squareIndex = (squareRowStart + r) * 9 + (squareColumnStart + c);
                indexes.push(squareIndex);
            }
        }

        setHighlightCubes(indexes);
    };

    const highlightingNumbers = (index) => {
        const value = gameArray[index];
        if (value !== '0') setHighlightNumber(value);
        else setHighlightNumber(-1);
    };

    const makeHighlightNumber = (number) => {
        setHighlightNumber(number ? number.toString() : -1);
    };

    const handleCellClickedy = (index) => {
        setCellSelected(index);
        highLightingCells(index);
        highlightingNumbers(index);
    };

    return (
        <div className="game-container">
            <TrainGameSection
                gameArray={gameArray}
                initArray={initArray}
                onClick={() => {}}
                cellSelected={cellSelected}

                highlightCells={highlightCells}
                highlightOneCell={highlightOneCell}

                highlightCellsWithNote={highlightCellsWithNote}
                highlightNotes={highlightNotes}

                highlightCellsWithBadNote={highlightCellsWithBadNote}
                highlightBadNotes={highlightBadNotes}
                
                highlightCubes={highlightCubes}
                highlightNumber={highlightNumber}
                notesArray={notesArray}
            />
            <TrainSection
                stratText={stratText}
                onNextStep={handleNextStep}
                onPrevStep={handlePrevStep}
                isFirstStep={stepIndex === 0}
                isLastStep={stepIndex === steps.length - 1}
            />
        </div>
    );
};

export default TraintFeld;
