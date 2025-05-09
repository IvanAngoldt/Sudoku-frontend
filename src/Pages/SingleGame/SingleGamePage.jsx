import Game from "../../сomponents/Sudoku/sudokuLogic/Game";
import "./SingleGamePage.css";
import { useParams } from "react-router-dom";

const SingleGamePage = () => {
  const { id } = useParams();

    return (
      <div className="game-main-container">
        <div className="game-content">
          <Game key={id} />
        </div>
      </div>
      );
  };
  
  export default SingleGamePage;