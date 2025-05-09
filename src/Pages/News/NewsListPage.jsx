import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './NewsPage.module.css';

const NewsListPage = () => {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    // Здесь будет запрос к API для получения списка новостей
    // Пока используем моковые данные
    const mockNewsList = [
      {
        id: 1,
        title: 'Новые стратегии решения Судоку',
        content: 'Мы добавили новые стратегии для решения сложных головоломок Судоку. Узнайте, как применять продвинутые техники для решения самых сложных задач.',
        date: '20 марта 2024',
        image: 'https://distribution.faceit-cdn.net/images/b78243b7-f150-4b26-b691-c2c700c8e899.png'
      },
      {
        id: 2,
        title: 'Турнир по Судоку',
        content: 'Присоединяйтесь к нашему еженедельному турниру по Судоку. Соревнуйтесь с другими игроками и выигрывайте призы!',
        date: '19 марта 2024',
        image: 'https://distribution.faceit-cdn.net/images/e8caa03f-d51f-4919-8ed5-9e19d2eeadcb.png'
      },
      {
        id: 3,
        title: 'Обновление платформы',
        content: 'Мы рады представить новое обновление нашей платформы с улучшенным интерфейсом и новыми функциями.',
        date: '18 марта 2024',
        image: 'https://distribution.faceit-cdn.net/images/c2f473d7-aaf5-4ca1-9f11-ed029338682a.png'
      }
    ];

    setNewsList(mockNewsList);
  }, []);

  return (
    <div className={styles.newsListPage}>
      <h1 className={styles.newsListTitle}>Новости</h1>
      <div className={styles.newsList}>
        {newsList.map((news) => (
          <Link to={`/news/${news.id}`} key={news.id} className={styles.newsCard}>
            <div className={styles.newsCardImage}>
              <img src={news.image} alt={news.title} />
            </div>
            <div className={styles.newsCardContent}>
              <h2>{news.title}</h2>
              <p>{news.content}</p>
              <span className={styles.date}>{news.date}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NewsListPage; 