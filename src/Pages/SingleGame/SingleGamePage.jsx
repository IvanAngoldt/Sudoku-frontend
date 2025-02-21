import Game from "../../сomponents/Sudoku/sudokuLogic/Game";
import "./SingleGamePage.css";

const SingleGamePage = () => {
    return (
      <div className="game-main-container">
        <div className="game-content">
          <Game />
        </div>
      </div>
      );
  };
  
  export default SingleGamePage;