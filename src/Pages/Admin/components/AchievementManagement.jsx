
import { useState, useEffect, useCallback } from "react";
import './AdminStyles.css';

const AchievementManagement = () => {
  const [achievements, setAchievements] = useState([]);
  const [iconUrls, setIconUrls] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAchievement, setNewAchievement] = useState({
    code: '',
    title: '',
    description: '',
    condition: '',
    icon: null
  });

  const token = localStorage.getItem('token');

  const loadIcons = useCallback(async (achList) => {
    const urls = {};
    for (const ach of achList) {
      const code = ach.code;
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
  }, [token]);

  const fetchAchievements = useCallback(async () => {
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
  }, [token, loadIcons]);
  
  useEffect(() => {
    fetchAchievements();
  }, [fetchAchievements]);

  const handleCreateAchievement = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('code', newAchievement.code);
    formData.append('title', newAchievement.title);
    formData.append('description', newAchievement.description);
    formData.append('condition', newAchievement.condition);
    if (newAchievement.icon) {
      formData.append('icon', newAchievement.icon);
    }

    try {
      const response = await fetch('http://localhost:8080/game/achievements', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData
      });

      if (response.ok) {
        setIsModalOpen(false);
        setNewAchievement({
          code: '',
          title: '',
          description: '',
          condition: '',
          icon: null
        });
        fetchAchievements();
      } else {
        const errData = await response.json();
        console.error('Ошибка при создании достижения:', errData);
      }
    } catch (err) {
      console.error('Ошибка при создании достижения:', err);
    }
  };

  return (
    <div className="admin-section">
      <h2>Управление достижениями</h2>
      <button className="create-button" onClick={() => setIsModalOpen(true)}>
        Создать новое достижение
      </button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Создание нового достижения</h3>
            <form onSubmit={handleCreateAchievement}>
              <div className="form-group">
                <label>Код:</label>
                <input
                  type="text"
                  value={newAchievement.code}
                  onChange={(e) => setNewAchievement({...newAchievement, code: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Название:</label>
                <input
                  type="text"
                  value={newAchievement.title}
                  onChange={(e) => setNewAchievement({...newAchievement, title: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Описание:</label>
                <textarea
                  value={newAchievement.description}
                  onChange={(e) => setNewAchievement({...newAchievement, description: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Условие (JSON):</label>
                <textarea
                  placeholder='Пример: {"type":"solved_count","difficulty":"medium","count":1}'
                  value={newAchievement.condition}
                  onChange={(e) => setNewAchievement({...newAchievement, condition: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Иконка:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewAchievement({...newAchievement, icon: e.target.files[0]})}
                />
              </div>
              <div className="modal-buttons">
                <button type="submit" className="submit-button">Создать</button>
                <button type="button" className="cancel-button" onClick={() => setIsModalOpen(false)}>Отмена</button>
              </div>
            </form>
          </div>
        </div>
      )}

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
              <td>{achievement.code}</td>
              <td>{achievement.title}</td>
              <td>{achievement.description}</td>
              <td>
                <img
                  src={iconUrls[achievement.code]}
                  alt={`${achievement.code}-icon`}
                  style={{ width: '64px', height: '64px', objectFit: 'cover', marginBottom: '8px' }}
                />
              </td> 
              <td>
                <button className="action-button award" title="Выдать вручную">
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
