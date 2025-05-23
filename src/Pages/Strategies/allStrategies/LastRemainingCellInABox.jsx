import "./allStrategies.css";
import TraintFeld from "../../../сomponents/Trainer/TraintField";

const steps = [
    { type: "text", text: "Эта простая головоломка продемонстрирует, как нужно работать " +
        "с самой простой, но в то же время самой полезной стратегией. Лучше всего начать разгадывание головоломки с квадратов, так как с ними проще всего работать." },

    { type: "highlightCells", index: [54, 55, 56, 63, 64, 65, 72, 73, 74], text: "Квадрат 7 кажется почти заполненным, но с четырьмя пустыми клетками, " +
        "так что есть все шансы, что некоторые из этих полей можно быстро заполнить." },
        
    {
        type: "combinedHighlight",
        highlightCells: [2, 11, 20, 38, 47, 56, 65, 74, 83],
        highlightOneCell: [29],
        text: "Взглянув на восьмёрку в D3 можно отметить, что она заполняет всю колонку и блокирует клетки H3 и J3."
    },

    {
        type: "combinedHighlight",
        highlightCells: [54, 55, 56, 57, 59, 60, 61, 62],
        highlightOneCell: [58],
        text: "Аналогично восьмёрка в G5 занимает всю строку, не позволяя поставить восьмёрку G1 и G2"
    },

    { type: "fill", index: [63], number: [8], text: "Таким образом, последняя оставшаяся клетка в квадрате 7 для восьмёрки - это H1." },
];

const initialGrid = [
    ['2', '0', '0', '0', '7', '0', '0', '3', '8'],
    ['0', '0', '0', '0', '0', '6', '0', '7', '0'],
    ['3', '0', '0', '0', '4', '0', '6', '0', '0'],
    ['0', '0', '8', '0', '2', '0', '7', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '6'],
    ['0', '0', '7', '0', '3', '0', '4', '0', '0'],
    ['0', '0', '4', '0', '8', '0', '0', '0', '9'],
    ['0', '6', '0', '4', '0', '0', '0', '0', '0'],
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

const LastRemainingCellInABox = ({ onStrategyLearned }) => {
    const handleStepComplete = (stepIndex) => {
        if (stepIndex === steps.length - 1) {
            onStrategyLearned?.();
        }
    };

    return (
        <div className="strategy-container">
            <h1>Last Remaining Cell in a Box</h1>
            <TraintFeld 
                steps={steps} 
                initialGrid={initialGrid} 
                initialNotes={initialNotes}
                onStepChange={handleStepComplete}
            />
        </div>
    );
};

export default LastRemainingCellInABox;