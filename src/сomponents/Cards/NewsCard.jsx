import { Link } from 'react-router-dom';
import './NewsCard.css';

const NewsCard = ({ link, name, img_src, img_alt, text }) => {
  return (
    <Link to={link} className="news-card-link">
      <div className="news-card">
        <div className="news-card-title">
          {name}
        </div>

        <div className='news-card-background'>
          <img src={img_src} alt={img_alt} className="news-card-image" />
        </div>
        
        <div className="news-card-action">
          <h4 className="news-card-action-text">{text}</h4> 
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;