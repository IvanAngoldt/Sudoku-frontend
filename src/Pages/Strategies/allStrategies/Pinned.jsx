import "./allStrategies.css";
import TraintFeld from "../../../сomponents/Trainer/TraintField";

const steps = [
    { type: "highlightOneCell", index: [79], text: "Иногда для размещения есть несколько причин. Чертвёрка в J8 - отличный пример." },

    // { type: "highlightCells", index: [54, 55, 56, 63, 64, 65, 72, 73, 74], text: "Квадрат 7 кажется почти заполненным, но с четырьмя пустыми клетками, " +
    //     "так что есть все шансы, что некоторые из этих полей можно быстро заполнить." },
        
    {
        type: "combinedHighlight",
        highlightCells: [54, 55, 57, 58, 59, 60, 61, 62, 63, 64, 65, 67, 68, 69, 70, 71, 42, 33, 24, 15, 6, 78],
        highlightOneCell: [56, 66, 51, 79],
        text: "Первая причина: J8 - это последняя оставшаяся клетка для четвёрки в 9-ом квадрате."
    },

    {
        type: "combinedHighlight",
        highlightCells: [18, 19, 20, 21, 23, 24, 25, 26, 33, 34, 35, 42, 43, 44, 52, 53, 54, 55, 57, 58, 59, 60, 61, 62, 63, 64, 65, 67, 68, 69, 70, 71],
        highlightOneCell: [22, 56, 66, 51, 79],
        text: "Вторая причина: J8 - это последнее оставшееся клетка для четвёрки в 8-й колонке."
    },

    {
        type: "combinedHighlight",
        highlightCells: [6, 15, 24, 33, 42, 60, 69, 78, 54, 55, 63, 64, 65, 72, 73, 74, 57, 58, 59, 67, 68, 75, 76, 77],
        highlightOneCell: [51, 56, 66, 79],
        text: "И третья причина: J8 - это последнее оставшееся клетка для четвёрки в строке J."
    },
    
    { type: "fill", index: [79], number: [4], text: "Поэтому с полной уверенностью ставим четвёрку в J8!" },
    // {
    //     type: "combinedHighlight",
    //     highlightCells: [54, 55, 56, 57, 59, 60, 61, 62],
    //     highlightOneCell: [58],
    //     text: "Аналогично восьмёрка в G5 занимает всю строку, не позволяя поставить восьмёрку G1 и G2"
    // },

    // { type: "fill", index: [63], number: [8], text: "Таким образом, последняя оставшаяся клетка в квадрате 7 для восьмёрки - это H1." },
];

const initialGrid = [
    ['2', '4', '0', '0', '7', '0', '0', '3', '8'],
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

const Pinned = ({ onStrategyLearned }) => {
    const handleStepComplete = (stepIndex) => {
        if (stepIndex === steps.length - 1) {
            onStrategyLearned?.();
        }
    };

    return (
        <div>
            <h1>Pinned</h1>
            <TraintFeld 
                steps={steps} 
                initialGrid={initialGrid} 
                initialNotes={initialNotes}
                onStepChange={handleStepComplete}
            />
        </div>
    );
};

export default Pinned;