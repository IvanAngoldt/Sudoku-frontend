import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthUser } from '../../../hooks/useAuthUser';
import '../TournamentsPage.css';

const FinishedTournament = ({ tournament }) => {
  const { data, loading: userLoading } = useAuthUser();
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const userId = data?.user?.id;

  const fetchResults = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:8080/tournaments/${tournament.id}/results`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Ошибка загрузки результатов');

      const data = await res.json();
      console.log(data);
      setResults(data ?? []);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [tournament.id]);
  

  if (userLoading) return <div>Загрузка...</div>;

  return (
    <div className="tournaments-main-container">
      <div className="tournaments-main-content">
        <h1>{tournament.name}</h1>
        <p>Турнир завершён</p>

        <div className="tournaments-table-container">
          <h2>Итоговая таблица</h2>
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
              {results && results.length > 0 ? (
                results.map((r) => (
                  <tr key={r.user_id}>
                    <td>{r.rank}</td>
                    <td>
                      {r.user_id === userId ? (
                        <strong>Вы</strong>
                      ) : (
                        <Link to={`/profile/${r.username}`} className="tournament-user-link">
                          {r.username}
                        </Link>
                      )}
                    </td>
                    <td className="elo-cell">{r.solved_count}</td>
                    <td className="elo-cell">{r.score}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', color: 'gray' }}>
                    В этом турнире не было участников :,( 
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FinishedTournament;
