import { Link } from 'react-router-dom';
import './MainCard.css';

const MainCard = ({ link, name, img_src, img_alt, text }) => {
  return (
    <Link to={link} className="main-card-link">
      <div className="main-card">
        <div className="main-card-title">
          {name}
        </div>

        <div className='main-card-background'>
          <img src={img_src} alt={img_alt} className="main-card-image" />
        </div>
        
        <div className="main-card-action">
          <h4 className="main-card-action-text">{text}</h4> 
        </div>
      </div>
    </Link>
  );
};

export default MainCard;