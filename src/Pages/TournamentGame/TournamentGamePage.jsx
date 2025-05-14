import TournamentGameEntryPage from "../../сomponents/Sudoku/TournamentGameEntryPage";
import "./TournamentGamePage.css";

const TournamentGamePage = () => {
    return (
      <div className="tournament-game-main-container">
        <div className="tournament-game-content">
          <TournamentGameEntryPage />
        </div>
      </div>
      );
  };
  
  export default TournamentGamePage;