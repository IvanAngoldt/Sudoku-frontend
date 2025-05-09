import React, { useState, useEffect } from 'react';

const CreateAchievementsPage = () => {
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState(null);
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
      const code = ach.code || ach.Code;
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

  const handleSubmit = async () => {
    if (!code || !title || !icon) {
      alert("Поля 'code', 'title' и иконка обязательны");
      return;
    }

    const formData = new FormData();
    formData.append('code', code);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('icon', icon);

    try {
      const response = await fetch('http://localhost:8080/game/achievements', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const rawBody = await response.text();

      if (!response.ok) {
        let errorMessage = 'Ошибка при создании';
        try {
          const error = JSON.parse(rawBody);
          if (error?.error) errorMessage = error.error;
        } catch (_) {
          if (rawBody) errorMessage = rawBody;
        }
        throw new Error(errorMessage);
      }

      alert("Достижение успешно создано!");

      setCode('');
      setTitle('');
      setDescription('');
      setIcon(null);

      fetchAchievements();
    } catch (err) {
      alert("Ошибка при отправке: " + err.message);
    }
  };

  const handleDelete = async (achievementCode, achievementTitle) => {
    if (!window.confirm(`Удалить достижение "${achievementTitle}"?`)) return;

    try {
      const res = await fetch(`http://localhost:8080/game/achievements/${achievementCode}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const raw = await res.text();
        throw new Error(raw || 'Ошибка при удалении');
      }

      alert("Достижение удалено");
      fetchAchievements();
    } catch (err) {
      alert("Ошибка удаления: " + err.message);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '16px' }}>
      <h2>Создание достижения</h2>

      <div style={{ marginBottom: '10px' }}>
        <label>
          Код:
          <input
            type="text"
            value={code}
            onChange={e => setCode(e.target.value)}
          />
        </label>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>
          Заголовок:
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </label>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>
          Описание:
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </label>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>
          Иконка:
          <input
            type="file"
            accept="image/*"
            onChange={e => {
              const file = e.target.files?.[0];
              if (file) setIcon(file);
            }}
          />
        </label>
      </div>

      <button onClick={handleSubmit}>Создать достижение</button>

      <hr style={{ margin: '40px 0' }} />

      <h3>Существующие достижения</h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '16px',
      }}>
        {achievements.map((ach, index) => {
          const code = ach.code || ach.Code;
          const title = ach.title || ach.Title;
          const description = ach.description || ach.Description;

          return (
            <div key={index} style={{
              position: 'relative',
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '12px',
              backgroundColor: '#f9f9f9',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
            }}>
              <button
                onClick={() => handleDelete(code, title)}
                style={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#c00',
                  fontSize: '16px',
                  cursor: 'pointer',
                }}
                title="Удалить достижение"
              >
                ✖
              </button>

              {iconUrls[code] ? (
                <img
                  src={iconUrls[code]}
                  alt={`${code}-icon`}
                  style={{ width: '64px', height: '64px', objectFit: 'cover', marginBottom: '8px' }}
                />
              ) : (
                <div style={{ width: '64px', height: '64px', backgroundColor: '#eee', marginBottom: '8px' }} />
              )}
              <strong>{title}</strong>
              <p style={{ fontSize: '14px', color: '#555' }}>{description}</p>
              <code style={{ fontSize: '12px', color: '#888' }}>{code}</code>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CreateAchievementsPage;
