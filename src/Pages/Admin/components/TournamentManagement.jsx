import { useState, useEffect } from "react";
import './AdminStyles.css';

const TournamentManagement = () => {
  const [tournamentsLoading, setTournamentsLoading] = useState(true);
  const [tournaments, setTournaments] = useState([]);

  return (
    <div className="admin-section">
      <h2>Управление турнирами</h2>
      <button className="create-button">
        Создать новый турнир
      </button>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Название турнира</th>
            <th>Участники</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {tournaments.map((tournament) => (
            <tr key={tournament.id}>
              <td>{tournament.name}</td>
              <td>{tournament.participants}</td>
              <td>
                <div className="action-buttons">
                  <button className="action-button view" title="Просмотр участников">
                    👥
                  </button>
                  <button className="action-button delete" title="Удалить турнир">
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TournamentManagement; 