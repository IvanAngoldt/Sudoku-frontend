import { useState, useEffect } from "react";
import './AdminStyles.css';

const AchievementManagement = () => {
  const [achievementsLoading, setAchievementsLoading] = useState(true);
  const [achievements, setAchievements] = useState([]);
  const [iconUrls, setIconUrls] = useState({});
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const response = await fetch('http://localhost:8080/game/achievements', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (!Array.isArray(data)) {
        console.error('Некорректный формат данных:', data);
        return;
      }

      setAchievements(data);
      loadIcons(data);
    } catch (err) {
      console.error('Ошибка при загрузке достижений:', err);
    }
  };

  const loadIcons = async (achList) => {
    const urls = {};
    for (const ach of achList) {
      const code = ach.Code;
      try {
        const res = await fetch(`http://localhost:8080/game/achievements/${code}/icon`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) continue;

        const blob = await res.blob();
        const blobUrl = URL.createObjectURL(blob);
        urls[code] = blobUrl;
      } catch (err) {
        console.error(`Ошибка загрузки иконки для "${code}":`, err);
      }
    }
    setIconUrls(urls);
  };

  // if (achievementsLoading) return <p>Загрузка достижений...</p>;

  return (
    <div className="admin-section">
      <h2>Управление достижениями</h2>
      <button className="create-button">
        Создать новое достижение
      </button>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Title</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {achievements.map((achievement) => (
            <tr key={achievement.code}>
              <td>{achievement.Code}</td>
              <td>{achievement.Title}</td>
              <td>{achievement.Description}</td>
              <td>
                <img
                  src={iconUrls[achievement.Code]}
                  alt={`${achievement.Code}-icon`}
                  style={{ width: '64px', height: '64px', objectFit: 'cover', marginBottom: '8px' }}
                />
              </td> 
              <td>
                <button className="action-button award" title="Выдать достижение">
                  🏆
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AchievementManagement; 