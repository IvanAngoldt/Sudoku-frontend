import React, { useEffect, useState } from "react";
import "./AchievementItem.css";

function AchievementItem({ title, description, code }) {
  const [achievementIconBlobUrl, setAchievementIconBlobUrl] = useState(null);

  useEffect(() => {
    const fetchAchievementIcon = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch(`http://localhost:8080/game/achievements/${code}/icon`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to load icon");

        const blob = await res.blob();
        const blobUrl = URL.createObjectURL(blob);

        // освобождаем предыдущий blob
        setAchievementIconBlobUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return blobUrl;
        });
      } catch (err) {
        console.error("Error loading achievement icon:", err);
      }
    };

    fetchAchievementIcon();

    return () => {
      if (achievementIconBlobUrl) {
        URL.revokeObjectURL(achievementIconBlobUrl);
      }
    };
  }, [code]);

  return (
    <div className="achievement-item">
      <div className="achievement-icon">
        {achievementIconBlobUrl ? (
          <img src={achievementIconBlobUrl} alt="icon" className="achievement-icon-img" />
        ) : (
          "🏆"
        )}
      </div>
      <div className="achievement-text">
        <h4 className="achievement-title">{title}</h4>
        <p className="achievement-description">{description}</p>
      </div>
    </div>
  );
}

export default AchievementItem;
