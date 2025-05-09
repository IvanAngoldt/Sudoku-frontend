import React, { useState } from 'react';
import UserManagement from './components/UserManagement';
import AchievementManagement from './components/AchievementManagement';
import TournamentManagement from './components/TournamentManagement';
import './components/AdminStyles.css';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  // Заглушки для данных
  const users = [
    { id: 1, username: 'user1', registrationDate: '2024-03-20' },
    { id: 2, username: 'user2', registrationDate: '2024-03-19' },
  ];

  const achievements = [
    { id: 1, name: 'Первая победа', description: 'Выиграйте свой первый турнир' },
    { id: 2, name: 'Мастер головоломок', description: 'Решите 100 судоку' },
  ];

  const tournaments = [
    { id: 1, name: 'Весенний турнир', participants: 15 },
    { id: 2, name: 'Чемпионат по судоку', participants: 25 },
  ];

  return (
    <div className="admin-container">
      <h1>Панель администратора</h1>
      
      <div className="tabs">
        <button
          className={`tab ${activeTab === 0 ? 'active' : ''}`}
          onClick={() => setActiveTab(0)}
        >
          Управление пользователями
        </button>
        <button
          className={`tab ${activeTab === 1 ? 'active' : ''}`}
          onClick={() => setActiveTab(1)}
        >
          Управление достижениями
        </button>
        <button
          className={`tab ${activeTab === 2 ? 'active' : ''}`}
          onClick={() => setActiveTab(2)}
        >
          Турниры
        </button>
      </div>

      {activeTab === 0 && <UserManagement />}
      {activeTab === 1 && <AchievementManagement />}
      {activeTab === 2 && <TournamentManagement />}
    </div>
  );
};

export default AdminPage; 