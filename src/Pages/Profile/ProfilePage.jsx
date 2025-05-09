import { useEffect, useState, useRef } from "react";
import { useAuthUser } from "../../hooks/useAuthUser";
import { useAvatarVersion } from "../../context/avatar-context";
import "./ProfilePage.css";
import Avatar from "../../сomponents/Avatar/Avatar";
import AchievementsList from "../../сomponents/Achievements/AchievementsList";

const ProfilePage = () => {
  const { user, loading } = useAuthUser();
  const { bumpAvatarVersion } = useAvatarVersion();

  const [userStats, setUserStats] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [achievementsLoading, setAchievementsLoading] = useState(true);

  const [infoLoading, setInfoLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editedFullName, setEditedFullName] = useState("");

  const avatarRef = useRef();

  const handleEditClick = async () => {
    if (!isEditing) {
      setEditedFullName(userInfo?.full_name ?? "");
      setIsEditing(true);
      return;
    }

    const trimmed = editedFullName.trim();
    if (trimmed.length < 2 || trimmed.length > 100) {
      setErrorMessage("Имя должно быть от 2 до 100 символов");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      // Загружаем аватарку, если выбрана
      const avatarFile = avatarRef.current?.getSelectedFile();
      if (avatarFile) {
        const formData = new FormData();
        formData.append("avatar", avatarFile);

        const res = await fetch("http://localhost:8080/users/avatar", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!res.ok) throw new Error("Не удалось загрузить аватарку");

        bumpAvatarVersion(); // ⬅️ уведомляем всех, что аватарка изменилась
      }

      // Сохраняем имя
      const res = await fetch("http://localhost:8080/users/info", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ full_name: trimmed }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.error || "Не удалось сохранить данные");
      }

      const updatedInfo = await res.json();
      setUserInfo(updatedInfo);
      setSuccessMessage("Данные успешно обновлены");
      setTimeout(() => setSuccessMessage(""), 3000);
      setIsEditing(false);
      setErrorMessage("");
    } catch (err) {
      console.error("Error updating profile:", err);
      setErrorMessage(err.message || "Произошла ошибка при сохранении");
    }
  };

  
  
  useEffect(() => {
    const fetchUserInfoAndStats = async () => {
      const token = localStorage.getItem("token");
      if (!user || !token) return;
  
      // Загрузка userInfo
      setInfoLoading(true);
      try {
        const res = await fetch("http://localhost:8080/users/info", {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (!res.ok) {
          const msg = await res.text();
          throw new Error(`User info load failed: ${msg}`);
        }
  
        const data = await res.json();
        setUserInfo(data);
      } catch (err) {
        console.error("Error loading user info:", err);
      } finally {
        setInfoLoading(false);
      }
  
      // Загрузка статистики
      setStatsLoading(true);
      try {
        const res = await fetch(`http://localhost:8080/users/statistics/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (!res.ok) {
          const msg = await res.text();
          throw new Error(`Statistics load failed: ${msg}`);
        }
  
        const data = await res.json();
        setUserStats(data.statistics || []);
      } catch (err) {
        console.error("Error loading statistics:", err);
      } finally {
        setStatsLoading(false);
      }

      // Загрузка достижений
      setAchievementsLoading(true);
      try {
        const res = await fetch(`http://localhost:8080/game/my-achievements`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const msg = await res.text();
          throw new Error(`Achievements load failed: ${msg}`);
        }

        const data = await res.json();

        
        setAchievements(Array.isArray(data) ? data : []);

        

      } catch (err) {
        console.error("Error loading achievements:", err);
      } finally {
        setAchievementsLoading(false);
      }
    };
  
    fetchUserInfoAndStats();
  }, [user]);

  const getTotalSolved = () =>
    userStats.reduce((acc, stat) => acc + stat.total_solved, 0);

  if (loading || infoLoading || statsLoading || achievementsLoading) return <p>Загрузка профиля...</p>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-header-container">
          <div className="edit-button-container">
            <button className="edit-button" onClick={handleEditClick}>
              {isEditing ? "Сохранить" : "Редактировать"}
            </button>
          </div>

          <div className="profile-avatar">
            <Avatar isEditing={isEditing} ref={avatarRef} />
          </div>

          <div className="profile-info">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
              {isEditing ? (
                <input
                  type="text"
                  value={editedFullName}
                  onChange={(e) => setEditedFullName(e.target.value)}
                  className="profile-name-input"
                />
              ) : (
                <h1>{userInfo?.full_name ?? "Имя не указано"}</h1>
              )}
            </div>
            <p className="profile-username">@{user?.username}</p>
            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-value">{getTotalSolved()}</span>
                <span className="stat-label">Решено судоку</span> 
              </div>
              <div className="stat-item">
                <span className="stat-value">5</span>
                <span className="stat-label">Уровень</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{achievementsLoading ? "..." : achievements.length}</span>
                <span className="stat-label">Достижения</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="message-container">
        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>

      <div className="profile-divider"></div>

      <div className="profile-content">
        <div className="profile-section">
          <h2>Статистика по уровням</h2>
          <div className="stats-grid">
            {[
              "easy",
              "medium",
              "hard",
              "very_hard",
              "insane",
              "inhuman",
            ].map((difficulty) => {
              const stat = userStats.find((s) => s.difficulty === difficulty);
              return (
                <div key={difficulty} className="stat-card">
                  <h3>{difficulty.replace("_", " ").toUpperCase()}</h3>
                  <p><strong>Решено:</strong> {stat?.total_solved ?? 0}</p>
                  <p><strong>Лучшее время:</strong> {stat?.best_time_seconds ?? 0} сек</p>
                  <p><strong>Среднее:</strong> 
                    {" "}
                    {stat?.total_solved
                      ? Math.round(stat.total_time_seconds / stat.total_solved)
                      : 0} сек
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="profile-section">
          <h2>Достижения</h2>
          <AchievementsList achievements={achievements || []} />
        </div>
      </div>

    </div>
  );
};

export default ProfilePage;
