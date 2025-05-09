import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './News.module.css';

const News = ({ id, title, content, date, image }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/news/${id}`);
  };

  return (
    <div className={styles.news} onClick={handleClick} style={{ cursor: 'pointer' }}>
      {image && (
        <div className={styles.newsImage}>
          <img src={image} alt={title} className={styles.newsImage} />
        </div>
      )}
      <div className={styles.newsContent}>
        <h2 className={styles.newsTitle}>{title}</h2>
        <p className={styles.newsText}>{content}</p>
        <div className={styles.newsFooter}>
          <span className={styles.newsDate}>{date}</span>
        </div>
      </div>
    </div>
  );
};

export default News; 