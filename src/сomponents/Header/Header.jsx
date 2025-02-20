import { Link } from 'react-router-dom';

import Notifications from './Notifications';
import Menu from './Menu';

import './Header.css';

const Header = () => {

  return (
    <header>
      <nav className="header-nav">
        <div className="header-left">
          <Link to="profile" className="header-link">
              MainPage
          </Link>
        </div>
        <div className="header-right">
          <Notifications />
          <Menu/>
        </div>
      </nav>
    </header>
  );
};

export default Header;
