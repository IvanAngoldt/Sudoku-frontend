import React from "react";
import AchievementItem from "./AchievementItem";
import "./AchievementsList.css";

function AchievementsList({ achievements }) {
  if (!achievements || achievements.length === 0) {
    return <p className="no-achievements">Достижений пока нет.</p>;
  }

  return (
    <div className="achievements-list">
      <div className="achievements-grid">
        {achievements.map((ach) => (
          <AchievementItem
            key={ach.code}
            title={ach.title}
            description={ach.description}
            code={ach.code}
          />
        ))}
      </div>
    </div>
  );
}

export default AchievementsList;
