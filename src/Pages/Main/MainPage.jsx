import Game from "../../сomponents/Sudoku/sudokuLogic/Game";
import "./MainPage.css";

const MainPage = () => {
    return (
      <div className="main-container">
        <div className="game-content">
          <Game />
        </div>
        <div className="divider"></div>
      </div>
      );
  };
  
  export default MainPage;