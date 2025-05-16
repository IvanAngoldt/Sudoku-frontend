import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminStyles.css';
import { useState, useEffect } from "react";

const UserManagement = () => {
  const [usersLoading, setUsersLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const handleUserClick = (username) => {
    navigate(`/profile/${username}`);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
  
      // Загрузка users
      setUsersLoading(true);
      try {
        const res = await fetch("http://localhost:8080/users/", {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (!res.ok) {
          const msg = await res.text();
          throw new Error(`Users load failed: ${msg}`);
        }
  
        const users = await res.json();
        setUsers(users);
      } catch (err) {
        console.error("Error loading users:", err);
      } finally {
        setUsersLoading(false);
      }
    };
  
    fetchUsers();
  }, []);

  // if (usersLoading) return <p>Загрузка пользователей...</p>;

  return (
    <div className="admin-section">
      <h2>Управление пользователями</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Никнейм</th>
            <th>Дата регистрации</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <button 
                  className="link-button"
                  onClick={() => handleUserClick(user.username)}
                >
                  {user.username}
                </button>
              </td>
              <td>
                {new Date(user.created_at).toLocaleString('ru-RU', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </td>
              <td>
                <div className="action-buttons">
                  <button className="action-button block" title="Заблокировать">
                    🚫
                  </button>
                  <button className="action-button delete" title="Удалить">
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

export default UserManagement; 