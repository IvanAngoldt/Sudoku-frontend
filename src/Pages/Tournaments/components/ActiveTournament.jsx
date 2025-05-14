import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthUser } from '../../../hooks/useAuthUser';
import '../TournamentsPage.css';

const ActiveTournament = ({ tournament }) => {
  const { data, loading: userLoading } = useAuthUser();
  const [dashboard, setDashboard] = useState([]);
  const [error, setError] = useState(null);

  const userId = data?.user?.id;
  const [isParticipant, setIsParticipant] = useState(false);
  const navigate = useNavigate();

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:8080/tournaments/${tournament.id}/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Ошибка загрузки дашборда');

      const data = await res.json();
      if (data) {
        setDashboard(data);
        if (userId && data.some((p) => p.user_id === userId)) {
          setIsParticipant(true);
        }
      }
      else {
        setDashboard([]);
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [tournament.id, userId]);
  

  const handlePlay = () => {
    navigate(`/tournament`);
  };

  if (userLoading) return <div>Загрузка...</div>;

  return (
    <div className="tournaments-main-container">
      <div className="tournaments-main-content">
        <h1>{tournament.name}</h1>
        <p>Турнир сейчас активен — поспешите участвовать!</p>

        {isParticipant ? (
          <button className="register-button" onClick={handlePlay}>
            Играть
          </button>
        ) : (
          <p style={{ color: 'gray', marginTop: '1rem' }}>
            Вы не зарегистрированы в этом турнире и не можете участвовать
          </p>
        )}

        <div className="tournaments-table-container">
          <h2>Промежуточные результаты</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <table className="tournaments-table">
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>Место</th>
                <th style={{ textAlign: 'left' }}>Участник</th>
                <th style={{ textAlign: 'right' }}>Решено</th>
                <th style={{ textAlign: 'right' }}>Очки</th>
              </tr>
            </thead>
            <tbody>
              {dashboard.map((p, index) => (
                  <tr key={p.user_id || index}>
                    <td>{p.rank}</td>

                    <td>
                      {p.user_id === userId ? (
                        <strong>Вы</strong>
                      ) : (
                        <Link to={`/profile/${p.username}`} className="tournament-user-link">
                          {p.username}
                        </Link>
                      )}
                    </td>

                    <td className="elo-cell">{p.solved_count}</td>
                    <td className="elo-cell">{p.score}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ActiveTournament;
