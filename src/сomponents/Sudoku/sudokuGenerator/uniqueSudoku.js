import { getSudoku } from './sudoku';

let nullArray = Array(81).fill('0');

function _getBoxCenter(box) {
    switch (box) {
        case 0: return [1, 1];
        case 1: return [1, 4];
        case 2: return [1, 7];
        case 3: return [4, 1];
        case 4: return [4, 4];
        case 5: return [4, 7];
        case 6: return [7, 1];
        case 7: return [7, 4];
        case 8: return [7, 7];
        default: throw new Error("Invalid box index");
    }
}

function _getIndexOfCell(box, cell) {
    let [row, column] = _getBoxCenter(box);
    switch (cell) {
        case 0: { row--; column--; break; }
        case 1: { row--; break; }
        case 2: { row--; column++; break; }
        case 3: { column--; break; }
        case 4: { break; }
        case 5: { column++; break; }
        case 6: { row++; column--; break; }
        case 7: { row++; break; }
        case 8: { row++; column++; break; }
        default: throw new Error("Invalid cell index");
    }
    return row * 9 + column;
}

function _cellAvailable(tempInitArray, box, value) {
    return tempInitArray[_getIndexOfCell(box, value)] === '0' ? 0 : 1;
}

function _generateUniqueSudoku(solvedArray, difficulty) {
    let currentDifficulty = difficulty;
    let minimumCells, maximumCells, totalCells, box, cell;

    let tempInitArray = nullArray.slice();
    let boxCounts = Array(9).fill(0);
    let boxesAvailable = [];
    let cellsAvailable = [];

    if (currentDifficulty === 'Easy') {
        minimumCells = 3; // 3
        maximumCells = 7; // 7
        totalCells = 45; // 45
    } else if (currentDifficulty === 'Medium') {
        minimumCells = 2;
        maximumCells = 6;
        totalCells = 40;
    } else {
        minimumCells = 1;
        maximumCells = 5;
        totalCells = 30;
    }

    for (let j = 0; j < 9; j++) {
        boxCounts[j] = Array.from({ length: 9 }, (_, i) => _cellAvailable(tempInitArray, j, i)).reduce((a, b) => a + b, 0);
    }

    for (let i = 0; i < totalCells; i++) {
        boxesAvailable = [];
        for (let j = 0; j < 9; j++) {
            if (boxCounts[j] < minimumCells) {
                boxesAvailable.push(j);
            }
        }
        if (!boxesAvailable.length) {
            for (let j = 0; j < 9; j++) {
                if (boxCounts[j] < maximumCells) {
                    boxesAvailable.push(j);
                }
            }
        }
        box = boxesAvailable[Math.floor(Math.random() * boxesAvailable.length)];

        cellsAvailable = [];
        for (let j = 0; j < 9; j++) {
            if (tempInitArray[_getIndexOfCell(box, j)] === '0') {
                cellsAvailable.push(j);
            }
        }
        cell = cellsAvailable[Math.floor(Math.random() * cellsAvailable.length)];

        let index = _getIndexOfCell(box, cell);
        tempInitArray[index] = solvedArray[index];
        boxCounts[box]++;
    }

    return tempInitArray;
}

function solveSudoku(puzzle) {
    const sudoku = getSudoku();
    const solutions = [];
    const size = 9;
    const boxSize = 3;

    function isValid(board, row, col, num) {
        for (let x = 0; x < size; x++) {
            if (board[row * size + x] === num || board[x * size + col] === num ||
                board[(Math.floor(row / boxSize) * boxSize + Math.floor(x / boxSize)) * size +
                (Math.floor(col / boxSize) * boxSize + x % boxSize)] === num) {
                return false;
            }
        }
        return true;
    }

    function solve(board, limit) {
        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                for (let num = 1; num <= size; num++) {
                    if (isValid(board, Math.floor(i / size), i % size, num)) {
                        board[i] = num;
                        solve(board, limit);
                        board[i] = null;
                        if (solutions.length >= limit) return;
                    }
                }
                return;
            }
        }
        solutions.push(board.slice());
    }

    solve(puzzle, 2);
    return solutions;
}

function hasUniqueSolution(puzzle) {
    const solutions = solveSudoku(puzzle);
    return solutions.length === 1;
}

export const getUniqueSudoku = (difficulty) => {
    let temporaryInitArray, temporarySolvedArray;
    let sudoku = getSudoku();

    while (true) {
        let str = sudoku.generate(60);

        temporaryInitArray = Array.from(str, value => value === '.' ? '0' : value);

        str = sudoku.solve(str);
        temporarySolvedArray = Array.from(str);

        temporaryInitArray = _generateUniqueSudoku(temporarySolvedArray, difficulty);

        if (hasUniqueSolution(temporaryInitArray.map(val => val === '0' ? null : parseInt(val)))) {
            break;
        }
    }

    return [temporaryInitArray, temporarySolvedArray];
}
