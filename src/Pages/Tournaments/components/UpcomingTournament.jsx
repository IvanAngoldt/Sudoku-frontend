import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuthUser } from '../../../hooks/useAuthUser';
import '../TournamentsPage.css';

const formatIsoUtcToReadable = (isoString) => {
  const [datePart, timePart] = isoString.split('T');
  const [year, month, day] = datePart.split('-');
  const [hour, minute] = timePart.split(':');

  const monthNames = [
    '', 'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ];

  return `${parseInt(day)} ${monthNames[parseInt(month)]} в ${hour}:${minute}`;
};


const calculateTimeLeft = (startTime) => {
  const now = new Date();
  const start = new Date(startTime);
  const diff = start - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const UpcomingTournament = ({ tournament }) => {
  const { data, loading: userLoading } = useAuthUser();
  const [participants, setParticipants] = useState([]);
  const [registered, setRegistered] = useState(false);
  const userId = data?.user?.id;
  const username = data?.user?.username;

  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(tournament.start_time));

  const fetchParticipants = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:8080/tournaments/${tournament.id}/participants`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data) {
      setParticipants(data);
      if (userId && data.some((p) => p.user_id === userId)) {
        setRegistered(true);
      }
    }
    else {
      setParticipants([]);
      setRegistered(false);
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, [tournament.id, userId]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(tournament.start_time));
    }, 1000);

    return () => clearInterval(timer);
  }, [tournament.start_time]);

  const handleRegister = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:8080/tournaments/${tournament.id}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id: userId, username: username }),
      });
  
      if (res.status === 409) {
        setRegistered(true);
        return;
      }
  
      if (!res.ok) throw new Error('Ошибка регистрации');
  
      await fetchParticipants();
      setRegistered(true);
    } catch (err) {
      alert(err.message);
    }
  };
  

  const handleUnregister = async () => {
    try {
      const token = localStorage.getItem('token');
  
      const res = await fetch(`http://localhost:8080/tournaments/${tournament.id}/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id: userId }),
      });
  
      if (!res.ok) throw new Error('Не удалось сняться с участия');
  
      // убираем пользователя из списка
      setParticipants((prev) => prev.filter((p) => p.user_id !== userId));
      setRegistered(false);
    } catch (err) {
      alert(err.message);
    }
  };
  

  if (userLoading) return <div>Загрузка...</div>;

  return (
    <div className="tournaments-main-container">
      <div className="tournaments-main-content">
        <h1>{tournament.name}</h1>

        <div className="countdown-container">
          <h2>До начала турнира осталось:</h2>
          <div className="countdown-timer">
            <div className="countdown-item">
              <span className="countdown-value">{timeLeft.days}</span>
              <span className="countdown-label">дней</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-value">{timeLeft.hours}</span>
              <span className="countdown-label">часов</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-value">{timeLeft.minutes}</span>
              <span className="countdown-label">минут</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-value">{timeLeft.seconds}</span>
              <span className="countdown-label">секунд</span>
            </div>
          </div>
        </div>

        {registered ? (
          <button
            className="register-button"
            onClick={handleUnregister}
            style={{
              backgroundColor: '#e74c3c',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Сняться с участия
          </button>
        ) : (
          <button
            className="register-button"
            onClick={handleRegister}
          >
            Зарегистрироваться на турнир
          </button>
        )}


        <div className="tournaments-table-container">
          <h2>Зарегистрированные участники</h2>
          <table className="tournaments-table">
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>ID участника</th>
                <th style={{ textAlign: 'right' }}>Дата регистрации</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((p, index) => (
                <tr key={p.user_id || index}>
                  <td>
                    {p.user_id === userId ? (
                      <strong>Вы</strong>
                    ) : (
                      <Link to={`/profile/${p.username}`} className="tournament-user-link">
                        {p.username}
                      </Link>
                    )}
                  </td>

                  <td className="elo-cell">
                    {p.joined_at ? formatIsoUtcToReadable(p.joined_at) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UpcomingTournament;
