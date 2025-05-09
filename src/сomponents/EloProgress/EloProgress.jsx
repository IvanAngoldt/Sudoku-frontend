import React from "react";
import "./EloProgress.css";

const ELO_LEVELS = [
  { level: 1, eloMin: 1, eloMax: 500, color: '#444' },
  { level: 2, eloMin: 501, eloMax: 750, color: '#1ed760' },
  { level: 3, eloMin: 751, eloMax: 900, color: '#21c943' },
  { level: 4, eloMin: 901, eloMax: 1050, color: '#e6b800' },
  { level: 5, eloMin: 1051, eloMax: 1200, color: '#e6b800' },
  { level: 6, eloMin: 1201, eloMax: 1350, color: '#e6b800' },
  { level: 7, eloMin: 1351, eloMax: 1530, color: '#e6b800' },
  { level: 8, eloMin: 1531, eloMax: 1750, color: '#e67e22' },
  { level: 9, eloMin: 1751, eloMax: 2000, color: '#e67e22' },
  { level: 10, eloMin: 2001, eloMax: Infinity, color: '#e74c3c' },
];

const getCurrentLevelIdx = (elo) => {
  for (let i = 0; i < ELO_LEVELS.length; i++) {
    if (elo >= ELO_LEVELS[i].eloMin && elo <= ELO_LEVELS[i].eloMax) {
      return i;
    }
  }
  return ELO_LEVELS.length - 1;
};

const EloProgress = ({ currentElo }) => {
  const currentLevelIdx = getCurrentLevelIdx(currentElo);
  const currentLevel = ELO_LEVELS[currentLevelIdx];
  const prevElo = currentLevel.eloMin;
  const nextElo = currentLevel.eloMax === Infinity ? currentElo : currentLevel.eloMax;
  const levelRange = nextElo - prevElo;
  const progressInLevel = currentElo - prevElo;
  const isMaxLevel = currentLevel.level === 10;

  // Для расчёта ширины и смещения
  const minElo = ELO_LEVELS[0].eloMin;
  const maxElo = ELO_LEVELS[ELO_LEVELS.length - 1].eloMax === Infinity
    ? ELO_LEVELS[ELO_LEVELS.length - 2].eloMax
    : ELO_LEVELS[ELO_LEVELS.length - 1].eloMax;
  const totalRange = maxElo - minElo + 1;

  // Считаем ширину каждого уровня
  const levelsWidths = ELO_LEVELS.map(lvl => {
    const lvlMax = lvl.eloMax === Infinity ? maxElo : lvl.eloMax;
    return ((lvlMax - lvl.eloMin + 1) / totalRange) * 100;
  });

  // Считаем left для текущего уровня
  const left = levelsWidths.slice(0, currentLevelIdx).reduce((a, b) => a + b, 0);
  // Ширина текущего уровня
  const currentLevelWidth = levelsWidths[currentLevelIdx];
  // Прогресс внутри уровня
  const progressPercent = (progressInLevel / levelRange);
  // Итоговая ширина прогресс-бара
  const progressBarWidth = currentLevelWidth * progressPercent;

  return (
    <div className="elo-bar-faceit">
      <div className="elo-bar-title">LEVEL PROGRESS</div>
      <div className="elo-bar-info-faceit">
        <div className="elo-bar-info-block-faceit">
          <div className="elo-bar-info-label-faceit">LEVEL</div>
          <div className="elo-bar-info-value-faceit">{currentLevel.level}</div>
        </div>
        <div className="elo-bar-info-divider" />
        <div className="elo-bar-info-block-faceit">
          <div className="elo-bar-info-label-faceit">ELO</div>
          <div className="elo-bar-info-value-faceit">{currentElo}</div>
        </div>
        <div className="elo-bar-info-divider" />
        <div className="elo-bar-info-block-faceit">
          {isMaxLevel ? (
            <>
              <div className="elo-bar-info-fire" role="img" aria-label="fire">🔥</div>
              <div className="elo-bar-info-value-faceit max">MAXIMUM LEVEL REACHED</div>
            </>
          ) : (
            <>
              <div className="elo-bar-info-label-faceit">TO NEXT LEVEL</div>
              <div className="elo-bar-info-value-faceit">{nextElo - currentElo} ELO</div>
            </>
          )}
        </div>
      </div>
      <div className="elo-bar">
        <div className="elo-bar-line" style={{position: 'relative'}}>
          <div
            className="elo-bar-progress"
            style={{
              position: 'absolute',
              left: `${left}%`,
              width: `${progressBarWidth}%`,
              height: '100%',
              background: '#ff6600',
              borderRadius: '4px',
              transition: 'left 0.3s, width 0.3s',
            }}
          ></div>
        </div>
        <div className="elo-bar-levels">
          {ELO_LEVELS.map((lvl, idx) => (
            <div key={lvl.level} className={`elo-bar-level${idx === currentLevelIdx ? ' active' : ''}`}> 
              <div className="elo-bar-circle-faceit" style={{borderColor: idx === currentLevelIdx ? '#ff6600' : '#444', color: idx === currentLevelIdx ? '#ff6600' : '#888'}}>
                {lvl.level}
              </div>
              <div className="elo-bar-range-faceit">
                {lvl.eloMin} – {lvl.eloMax === Infinity ? '∞' : lvl.eloMax}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EloProgress; 