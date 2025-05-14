import React, { useEffect, useState } from 'react';
import UpcomingTournament from './components/UpcomingTournament';
import ActiveTournament from './components/ActiveTournament';
import FinishedTournament from './components/FinishedTournament';

const TournamentsPage = () => {
  const [tournament, setTournament] = useState(null);
  const [error, setError] = useState(null);
  const [noTournament, setNoTournament] = useState(false);

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Пользователь не авторизован');
        }

        const res = await fetch('http://localhost:8080/tournaments/current', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Ошибка запроса: ${res.status}`);
        }

        const data = await res.json();

        // Поддержка ответа: null или { tournament: null }
        const t = data?.tournament ?? data;

        if (!t) {
          setNoTournament(true);
        } else {
          setTournament(t);
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchTournament();
  }, []);

  if (error) {
    return <div style={styles.center}>Ошибка загрузки турнира: {error}</div>;
  }

  if (noTournament) {
    return (
      <div style={styles.center}>
        <h2>🎯 Сейчас нет активных турниров</h2>
        <p>Следите за новостями — скоро начнётся новый турнир!</p>
      </div>
    );
  }

  if (!tournament) {
    return <div style={styles.center}>Загрузка...</div>;
  }

  switch (tournament.status) {
    case 'upcoming':
      return <UpcomingTournament tournament={tournament} />;
    case 'active':
      return <ActiveTournament tournament={tournament} />;
    case 'finished':
      return <FinishedTournament tournament={tournament} />;
    default:
      return <div style={styles.center}>Неизвестный статус турнира</div>;
  }
};

const styles = {
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '70vh',
    fontSize: '1.2rem',
    textAlign: 'center',
  },
};

export default TournamentsPage;
