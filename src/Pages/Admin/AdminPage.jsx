import React, { useState } from 'react';
import UserManagement from './components/UserManagement';
import AchievementManagement from './components/AchievementManagement';
import TournamentManagement from './components/TournamentManagement';
import './components/AdminStyles.css';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState(0);

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