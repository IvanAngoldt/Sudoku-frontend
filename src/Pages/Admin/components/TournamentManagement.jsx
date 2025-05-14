import { useState, useEffect } from "react";
import './AdminStyles.css';

const TournamentManagement = () => {
  const [tournamentsLoading, setTournamentsLoading] = useState(true);
  const [tournaments, setTournaments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem('token');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    start_time: '',
    end_time: ''
  });

  const fetchTournaments = async () => {
    setTournamentsLoading(true);
    try {
      const res = await fetch('http://localhost:8080/tournaments/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Ошибка загрузки');
      }

      if (Array.isArray(data)) {
        setTournaments(data);
      } else {
        setTournaments([]);
      }
    } catch (err) {
      console.error('Ошибка при получении турниров:', err.message);
      setTournaments([]);
    } finally {
      setTournamentsLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      const res = await fetch('http://localhost:8080/tournaments/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          start_time: new Date(formData.start_time).toISOString(),
          end_time: new Date(formData.end_time).toISOString()
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Ошибка при создании турнира');
      }

      setShowModal(false);
      setFormData({ name: '', description: '', start_time: '', end_time: '' });
      fetchTournaments();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleStartTournament = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/tournaments/${id}/start`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        const message = data?.error || 'Не удалось запустить турнир';
        alert(message);
        return;
      }
  
      alert('Турнир запущен');
      fetchTournaments();
    } catch (err) {
      alert('Ошибка: ' + err.message);
    }
  };
  
  
  const handleFinishTournament = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/tournaments/${id}/finish`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (!res.ok) throw new Error('Не удалось завершить турнир');
      fetchTournaments();
      alert('Турнир завершен');
    } catch (err) {
      alert(err.message);
    }
  };
  
  const handleDeleteTournament = async (id) => {
    if (!window.confirm("Вы уверены, что хотите удалить турнир?")) return;
  
    try {
      const res = await fetch(`http://localhost:8080/tournaments/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (!res.ok) throw new Error('Не удалось удалить турнир');
      fetchTournaments();
      alert('Турнир удален');
    } catch (err) {
      alert(err.message);
    }
  };
  

  useEffect(() => {
    fetchTournaments();
  }, []);

  return (
    <div className="admin-section">
      <h2>Управление турнирами</h2>
      <button className="create-button" onClick={() => setShowModal(true)}>
        Создать новый турнир
      </button>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Название турнира</th>
            <th>Дата начала</th>
            <th>Дата окончания</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {tournamentsLoading ? (
            <tr><td colSpan="4">Загрузка...</td></tr>
          ) : tournaments.length === 0 ? (
            <tr><td colSpan="4">Нет турниров</td></tr>
          ) : (
            tournaments.map((tournament) => (
              <tr key={tournament.id}>
                <td>{tournament.name}</td>
                <td>{new Date(tournament.start_time).toLocaleString()}</td>
                <td>{new Date(tournament.end_time).toLocaleString()}</td>
                <td>{tournament.status}</td>
                <td>
                  <div className="action-buttons">
                    {/* <button
                      className="action-button view"
                      title="Просмотр участников"
                      onClick={() => console.log('Участники турнира', tournament.id)}
                    >
                      👥
                    </button> */}

                    <button
                      className="action-button start"
                      title="Запустить турнир"
                      onClick={() => handleStartTournament(tournament.id)}
                    >
                      🟢
                    </button>

                    <button
                      className="action-button finish"
                      title="Завершить турнир"
                      onClick={() => handleFinishTournament(tournament.id)}
                    >
                      🔴
                    </button>

                    <button
                      className="action-button delete"
                      title="Удалить турнир"
                      onClick={() => handleDeleteTournament(tournament.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Создание турнира</h3>

            <div className="form-group">
              <label>Название</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Описание</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Дата начала</label>
              <input
                type="datetime-local"
                value={formData.start_time}
                onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Дата окончания</label>
              <input
                type="datetime-local"
                value={formData.end_time}
                onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
              />
            </div>

            <div className="modal-buttons">
              <button className="cancel-button" onClick={() => setShowModal(false)}>Отмена</button>
              <button className="submit-button" onClick={handleCreate}>Создать</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TournamentManagement;
