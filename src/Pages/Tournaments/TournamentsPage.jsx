import { useState, useEffect } from "react";
import "./TournamentsPage.css";

const TournamentsPage = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const tournamentStartDate = new Date('2025-05-10T18:00:00Z');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = tournamentStartDate - now;

      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const participants = [
    { id: 1, name: "Иван Петров", elo: 2450 },
    { id: 2, name: "Анна Сидорова", elo: 2300 },
    { id: 3, name: "Петр Иванов", elo: 2200 },
    { id: 4, name: "Мария Смирнова", elo: 2150 },
    { id: 5, name: "Алексей Козлов", elo: 2100 },
  ].sort((a, b) => b.elo - a.elo); // Сортировка по убыванию ELO

  const handleRegister = () => {
    // Здесь будет логика регистрации
    alert('Функция регистрации будет реализована позже');
  };

  return (
    <div className="tournaments-main-container">
      <div className="tournaments-main-content">
        <h1>Предстоящий турнир</h1>
        
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

        <button className="register-button" onClick={handleRegister}>
          Зарегистрироваться на турнир
        </button>

        <div className="tournaments-table-container">
          <h2>Зарегистрированные участники</h2>
          <table className="tournaments-table">
            <thead>
              <tr>
                <th style={{textAlign: "left"}}>Участник</th>
                <th style={{textAlign: "right"}}>ELO</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((participant, index) => (
                <tr key={participant.id}>
                  <td>{participant.name}</td>
                  <td className="elo-cell">{participant.elo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TournamentsPage;