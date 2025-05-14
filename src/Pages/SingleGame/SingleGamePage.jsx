
import SingleGameEntryPage from "../../сomponents/Sudoku/SingleGameEntryPage";
import "./SingleGamePage.css";

const SingleGamePage = () => {
    return (
      <div className="single-game-main-container">
        <div className="single-game-content">
          <SingleGameEntryPage />
        </div>
      </div>
      );
  };
  
  export default SingleGamePage;