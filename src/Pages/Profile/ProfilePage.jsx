import { useEffect, useState, useRef } from "react";
import { useAuthUser } from "../../hooks/useAuthUser";
import { useAvatarVersion } from "../../context/avatar-context";
import AsyncSelect from 'react-select/async';

import Avatar from "../../сomponents/Avatar/Avatar";
import AchievementsList from "../../сomponents/Achievements/AchievementsList";

import "./ProfilePage.css";

const DADATA_API_KEY = "febbba81f44d1b372f25417ccfd5971c56730859"; // Замените на ваш API ключ

const ProfilePage = () => {
  const { data, loading } = useAuthUser();

  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [userStats, setUserStats] = useState(null);

  const [achievements, setAchievements] = useState([]);
  const [achievementsLoading, setAchievementsLoading] = useState(true);

  const { bumpAvatarVersion } = useAvatarVersion();

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editedUserInfo, setEditedUserInfo] = useState({
    firstname: "",
    secondname: "",
    age: "",
    city: "",
  });

  const avatarRef = useRef();

  const loadCityOptions = async (inputValue) => {
    if (!inputValue) return [];

    try {
      const response = await fetch('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Token ${DADATA_API_KEY}`
        },
        body: JSON.stringify({
          query: inputValue,
          locations: [{ country: 'Россия' }],
          locations_boost: [{ country: 'Россия' }],
          from_bound: { value: 'city' },
          to_bound: { value: 'city' },
          restrict_value: true
        })
      });

      const data = await response.json();
      return data.suggestions.map(suggestion => ({
        value: suggestion.data.city,
        label: suggestion.data.city
      }));
    } catch (error) {
      console.error('Error fetching cities:', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchAchievements = async () => {
      const token = localStorage.getItem("token");
      if (!data || !token) return;

      // Загрузка достижений
      setAchievementsLoading(true);
      try {
        const res = await fetch(`http://localhost:8080/game/${data?.user?.id}/achievements`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const msg = await res.text();
          throw new Error(`Achievements load failed: ${msg}`);
        }

        const achievements = await res.json();
        
        setAchievements(Array.isArray(achievements) ? achievements : []);
        
      } catch (err) {
        console.error("Error loading achievements:", err);
      } finally {
        setAchievementsLoading(false);
      }

      setUser(data?.user);
      setUserInfo(data?.info);
      setUserStats(data?.statistics);
    };
  
    fetchAchievements();
  }, [data]);

  const handleEditClick = async () => {
    if (!isEditing) {
      setEditedUserInfo({
        firstname: userInfo?.firstname ?? "",
        secondname: userInfo?.secondname ?? "",
        age: userInfo?.age || "",
        city: userInfo?.city ?? "",
      });
      setIsEditing(true);
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const avatarFile = avatarRef.current?.getSelectedFile();
      if (avatarFile) {
        const formData = new FormData();
        formData.append("avatar", avatarFile);

        const res = await fetch("http://localhost:8080/users/me/avatar", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!res.ok) throw new Error("Не удалось загрузить аватарку");

        bumpAvatarVersion();
      }

      // Преобразуем age в число перед отправкой
      const dataToSend = {
        ...editedUserInfo,
        age: editedUserInfo.age ? parseInt(editedUserInfo.age, 10) : 0
      };

      // Сохраняем информацию о пользователе
      const res = await fetch("http://localhost:8080/users/me/info", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'age') {
      if (value === '' || /^\d+$/.test(value)) {
        const cleanValue = value.replace(/^0+/, '') || '';
        setEditedUserInfo(prev => ({
          ...prev,
          [name]: cleanValue
        }));
      }
    } else {
      setEditedUserInfo(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleCityChange = (selectedOption) => {
    setEditedUserInfo(prev => ({
      ...prev,
      city: selectedOption ? selectedOption.value : ''
    }));
  };

  const getTotalSolved = () =>
    userStats?.reduce((acc, stat) => acc + stat.total_solved, 0);

  if (loading) return <p>Загрузка профиля...</p>;

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
            {user?.id && <Avatar isEditing={isEditing} ref={avatarRef} userID={user.id} />}
          </div>

          <div className="profile-info">
            <div className={`profile-fields ${isEditing ? 'profile-fields-editing' : ''}`}>
              {isEditing ? (
                <>
                  <div className="profile-field">
                    <label>Имя:</label>
                    <input
                      type="text"
                      name="firstname"
                      value={editedUserInfo.firstname}
                      onChange={handleInputChange}
                      className="profile-input"
                    />
                  </div>
                  <div className="profile-field">
                    <label>Фамилия:</label>
                    <input
                      type="text"
                      name="secondname"
                      value={editedUserInfo.secondname}
                      onChange={handleInputChange}
                      className="profile-input"
                    />
                  </div>
                  <div className="profile-field">
                    <label>Возраст:</label>
                    <input
                      type="number"
                      name="age"
                      value={editedUserInfo.age}
                      onChange={handleInputChange}
                      className="profile-input"
                    />
                  </div>
                  <div className="profile-field">
                    <label>Город:</label>
                    <AsyncSelect
                      cacheOptions
                      defaultOptions
                      value={editedUserInfo.city ? { value: editedUserInfo.city, label: editedUserInfo.city } : null}
                      loadOptions={loadCityOptions}
                      onChange={handleCityChange}
                      placeholder="Введите название города"
                      className="city-select"
                      classNamePrefix="city-select"
                      noOptionsMessage={() => "Город не найден"}
                      loadingMessage={() => "Поиск..."}
                      onFocus={(e) => {
                        if (e.target) {
                          const length = e.target.value.length;
                          e.target.setSelectionRange(length, length);
                        }
                      }}
                      isClearable={true}
                      isSearchable={true}
                    />
                  </div>
                </>
              ) : (
                <>
                  <h2>{userInfo?.firstname} {userInfo?.secondname}</h2>
                  <p>Возраст: {userInfo?.age || "Не указан"}</p>
                  <p>Город: {userInfo?.city || "Не указан"}</p>
                </>
              )}
            </div>
            <p className="profile-username">@{user?.username}</p>
            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-value">{getTotalSolved()}</span>
                <span className="stat-label">Решено судоку</span> 
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
              const stat = userStats?.find((s) => s.difficulty === difficulty);
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
