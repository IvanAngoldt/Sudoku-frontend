import "./allStrategies.css";
import TraintFeld from "../../../сomponents/Trainer/TraintField";

const steps = [
    // ... existing steps ...
];

const initialGrid = [
    // ... existing grid ...
];

const initialNotes = [
    // ... existing notes ...
];

const GettingStarted = ({ onStrategyLearned }) => {
    const handleStepComplete = (stepIndex) => {
        if (stepIndex === steps.length - 1) {
            onStrategyLearned?.();
        }
    };

    return (
        <div>
            <h1>Getting Started</h1>
            <TraintFeld 
                steps={steps} 
                initialGrid={initialGrid} 
                initialNotes={initialNotes}
                onStepChange={handleStepComplete}
            />

            <div className="inrow">
                <div>
                    <span className="strategy_text">
                    Every puzzle from the easiest to the hardest requires simple 'eyeballing' 
                    to detect the easy solutions. You certainly need to start the puzzle by 
                    checking for simple placements and when you have cracked a puzzle the last 
                    ten or twenty cells will fall into place just by letting your eye scan the 
                    board. You are looking for any unsolved cell that is the last possible place 
                    a number can go in a row, column or box. There are a number of patterns to look out for.
                    </span>
                </div>
                <div>
                    <img src="https://www.sudokuwiki.org/PuzImages/BoxNumbers.png" alt="BoxNumbers" className="strategy_img"/>
                </div>
            </div>
            <span>
            The convention on this site is to refer to columns with numbers, rows with letters 
            (I is skipped since it looks like 1 and we use J). Box numbers may not be so obvious, 
            so to the right is a plan of them. There is also a Glossary of terms.
            </span>


            <h2>Last Remaining Cell in a Box</h2>
            <div className="inrow">
                <div>
                    <span className="strategy_text">
                    This easy puzzle will demonstrate 'eyeballing'. It is best to start with boxes as 
                    they are the easiest shape to work with. Box 7 seems rather crowded with four 
                    clues so it's a good bet that some of these cells can be filled in quickly. Looking 
                    at the 8s on the board I can see that the 8 in D3 occupies the whole column and 
                    prohibits any 8 in H3 and J3. Likewise the 8 in G5 fills in the whole row preventing 
                    any 8 from being placed in G1 and G2.
                    </span>
                </div>
                <div>
                    <img src="https://www.sudokuwiki.org/PuzImages/Singles001.png" alt="Singles001" className="strategy_img"/>
                </div>
            </div>
            <span>
            So the last remaining cell in box 7 for an 8 is H1.
            </span>

            <h2>Last Remaining Cell in a Row (or Column)</h2>
            <div className="inrow">
                <div>
                    <span className="strategy_text">
                    When you have scanned the boxes for obvious solutions, check the rows and columns. 
                    The arrangement of 4s on this board suggests something in the first row, row A. 
                    We have a 4 in G3 which occupies the space in A3. Likewise the 4 in F7 removes A7 
                    as a placement for 4. And the 4 in box 2 uses up all the places in A4 and A6.
                    </span>
                    <span className="strategy_text">
                    So the last remaining cell for 4 in the row is A2.
                    </span>
                </div>
                <div>
                    <img src="https://www.sudokuwiki.org/PuzImages/Singles002.png" alt="Singles002" className="strategy_img"/>
                </div>
            </div>

            <h2>Pinned!</h2>
            <div className="inrow">
                <div>
                    <span className="strategy_text">
                    Sometimes there are several reasons for a placement. This 4 in J8 is a great example. 
                    In blue I have shown that 4 in J8 is the last remaining number in terms of the box 
                    it is in. The red + blue lines show it is the last number in column 8 and the green 
                    + blue lines demonstrate it is the last number in row J. 
                    </span>
                    <span className="strategy_text">
                    This 4 has been pinned to the board quite conclusively.
                    </span>
                </div>
                <div>
                    <img src="https://www.sudokuwiki.org/PuzImages/Singles003.png" alt="Singles003" className="strategy_img"/>
                </div>
            </div>

            <h2>The Last Possible Number</h2>
            <div className="inrow">
                <div>
                    <span className="strategy_text">
                    Eyeballing is actually quicker than checking each cell for the last possible number,
                    but it is a valid approach, so I include it here. It is the sort of strategy a beginner 
                    thinks of when faced with the puzzle for the first time. It is best used when a cell 
                    stands out because all the other numbers seem to be in place.
                    </span>
                    <span className="strategy_text">
                    Here the 5 in B1 can be determined because every other number from 1 to 9 apart 
                    from 5 is present in either the row, column or box (marked in green).
                    </span>
                </div>
                <div>
                    <img src="https://www.sudokuwiki.org/PuzImages/Singles004.png" alt="Singles004" className="strategy_img"/>
                </div>
            </div>

            <span>
            In the jargon, this is a Naked Single - if you were using candidates at this stage it would be the 
            only candidate in the cell. The 'eyeballing' techniques help determine Hidden Singles since other 
            candidates are possible in those places but at least one candidate is unique to a particular row, 
            column and box. You can see this difference if you 'Take Step' with candidates turned on.
            </span>

        </div>
    );
};

export default GettingStarted;
  