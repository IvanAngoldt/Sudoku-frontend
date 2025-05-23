import MainCard from "../../сomponents/Cards/MainCard";
import News from "../../сomponents/News/News";
import { Link } from "react-router-dom";
import EloProgress from "../../сomponents/EloProgress/EloProgress";

import "./MainPage.css";


const main_cards = [
  { 
    link: '/game',
    name: 'Play Single Sudoku', 
    img_src: '/imgs/playCardImage.png',
    img_alt: 'playCardImage',
    text: 'Play'
  },

  { 
    link: '/strategies',
    name: 'Learn Strategies', 
    img_src: '/imgs/learnCardImage.png',
    img_alt: 'playCardImage',
    text: 'Start learning'
  },

  { 
    link: '/tournaments',
    name: 'Play Tournaments', 
    img_src: '/imgs/playTournamentCardImage.png',
    img_alt: 'playCardImage',
    text: 'View tournaments'
  },
];

const news_items = [
  { 
    id: 1,
    title: 'Новые стратегии решения Судоку', 
    content: 'Мы добавили новые стратегии для решения сложных головоломок Судоку. Узнайте, как применять продвинутые техники для решения самых сложных задач.',
    date: '2024-03-20',
    image: '/imgs/newsNewStrategies.png',
  },
  { 
    id: 2,
    title: 'Турнир по Судоку', 
    content: 'Присоединяйтесь к нашему еженедельному турниру по Судоку. Соревнуйтесь с другими игроками и выигрывайте призы!',
    date: '2024-03-19',
    image: '/imgs/newsTournament.png',
  },
  { 
    id: 3,
    title: 'Обновление платформы', 
    content: 'Мы рады представить новое обновление нашей платформы с улучшенным интерфейсом и новыми функциями.',
    date: '2024-03-18',
    image: '/imgs/newsUpdate.png'
  }
];

const MainPage = () => {
  const currentElo = 1320; // Пример, заменить на актуальный ELO

  return (
    <div className="main-container">
      {/* <EloProgress currentElo={currentElo} /> */}

      <div className="main-content">
        {main_cards.map((card, index) => (
          <MainCard 
            key={card.id || index} // ✅ добавили key
            link={card.link} 
            name={card.name} 
            img_src={card.img_src} 
            img_alt={card.img_alt}
            text={card.text}
          />
        ))}
      </div>

      {/* <div className="main-divider"></div> */}

      <div className="content">
        <div className="latest-news">
          <span>Latest News</span>
        </div>

        <div className="news-content">
          {news_items.slice(0, 3).map((item) => (
            <News
              key={item.id} // ✅ уже был — оставляем
              id={item.id}
              title={item.title}
              content={item.content}
              date={item.date}
              image={item.image}
            />
          ))}
        </div>

        <div className="check-all-news">
          <Link to="/news">
            <span>Check All News</span>
          </Link>
        </div>
      </div>
    </div>
  );
};


export default MainPage;