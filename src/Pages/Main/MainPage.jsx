import { Link } from 'react-router-dom';

import "./MainPage.css";

const MainPage = () => {
    return (
      <div className="main-container">
        <div className="main-content">
          <ol>
            <li>
              <Link to="/single" className="header-link">
                Play Single Sudoku
              </Link>
            </li>

            <li>
              <Link to="/tournaments" className="header-link">
                Play Tournaments
              </Link>
            </li>
          </ol>
        </div>
        <div className="divider"></div>
      </div>
      );
  };
  
  export default MainPage;