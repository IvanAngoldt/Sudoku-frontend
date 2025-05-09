import "./allStrategies.css";
import TraintFeld from "../../../сomponents/Trainer/TraintField";

const steps = [
    { type: "text", text: "Когда вы проверили квадраты на наличие очевидных решений, проверьте строки и столбцы." },

    { type: "highlightOneCell", index: [56, 22, 51], text: "Обратите внимание на расположение четвёрок на этой доске." }, 

    {    
        type: "combinedHighlight",
        highlightCells: [2, 11, 20, 29, 38, 47, 65, 74],
        highlightOneCell: [56, 22, 51],
        text: "Первая червёрка блокирует остальные четвёрки в столбце 3."
    },

    {    
        type: "combinedHighlight",
        highlightCells: [2, 11, 20, 29, 38, 47, 65, 74, 3, 4, 5, 12, 13, 14, 21, 23],
        highlightOneCell: [56, 22, 51],
        text: "Вторая червёрка блокирует остальные четвёрки во втором квадрате."
    },

    {    
        type: "combinedHighlight",
        highlightCells: [2, 11, 20, 29, 38, 47, 65, 74, 3, 4, 5, 12, 13, 14, 21, 23, 6, 15, 24, 33, 42, 60, 69, 78],
        highlightOneCell: [56, 22, 51],
        text: "Третья червёрка блокирует остальные четвёрки во столбце 7."
    },

    { type: "fill", index: [1], number: [4], text: "Таким образом остаётся одна клетка для червёрки в строке А, это клетка A2" },
];

const initialGrid = [
    ['2', '0', '0', '0', '7', '0', '0', '3', '8'],
    ['0', '0', '0', '0', '0', '6', '0', '7', '0'],
    ['3', '0', '0', '0', '4', '0', '6', '0', '0'],
    ['0', '0', '8', '0', '2', '0', '7', '0', '0'],
    ['1', '0', '0', '0', '0', '0', '0', '0', '6'],
    ['0', '0', '7', '0', '3', '0', '4', '0', '0'],
    ['0', '0', '4', '0', '8', '0', '0', '0', '9'],
    ['8', '6', '0', '4', '0', '0', '0', '0', '0'],
    ['9', '1', '0', '0', '6', '0', '0', '0', '2'],
];

const initialNotes = [
    [], [], [], [], [], [], [], [], [],
    [], [], [], [], [], [], [], [], [],
    [], [], [], [], [], [], [], [], [],
    [], [], [], [], [], [], [], [], [],
    [], [], [], [], [], [], [], [], [],
    [], [], [], [], [], [], [], [], [],
    [], [], [], [], [], [], [], [], [],
    [], [], [], [], [], [], [], [], [],
    [], [], [], [], [], [], [], [], [],
];

const LastRemainingCellInARow = ({ onStrategyLearned }) => {
    const handleStepComplete = (stepIndex) => {
        if (stepIndex === steps.length - 1) {
            onStrategyLearned?.();
        }
    };

    return (
        <div>
            <h1>Last Remaining Cell in a Row</h1>
            <TraintFeld 
                steps={steps} 
                initialGrid={initialGrid} 
                initialNotes={initialNotes}
                onStepChange={handleStepComplete}
            />
        </div>
    );
};

export default LastRemainingCellInARow;