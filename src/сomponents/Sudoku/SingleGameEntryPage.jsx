import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Game from "./sudokuLogic/Game";
import { useAuthUser } from "../../hooks/useAuthUser";

const SingleGameEntryPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [gameData, setGameData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data: authUser } = useAuthUser();

  useEffect(() => {
    const loadGame = async () => {
      const token = localStorage.getItem("token");
  
      // 📌 определим url заранее
      const url = id
        ? `http://localhost:8080/game/sudoku/${id}`
        : `http://localhost:8080/game/sudoku?difficulty=easy`;
  
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        if (!response.ok) {
          throw new Error("Ошибка при загрузке судоку");
        }
  
        const data = await response.json();
        setGameData(data);
        setLoading(false);
  
        // 🔄 если новая игра, и ID ещё не в URL — редиректим
        if (!id) {
          navigate(`/game/${data.id}`);
        }
      } catch (err) {
        console.error("Ошибка загрузки судоку:", err);
        setError(err.message);
        setLoading(false);
      }
    };
  
    loadGame();
  }, [id, navigate]);

  const handleDifficultyChange = async (newDifficulty) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/game/sudoku?difficulty=${newDifficulty}`,
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error("Ошибка при загрузке судоку");
      }

      const data = await response.json();
      setGameData(data);
      navigate(`/game/${data.id}`);
    } catch (error) {
      console.error("Ошибка при смене сложности:", error);
      setError(error.message);
    }
  };

  const handleGameComplete = async (solveTimeMs) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8080/game/sudoku/${gameData.id}/solved`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          user_id: authUser.user.id,
          solve_time_ms: solveTimeMs
        })
      });

      if (!response.ok) {
        throw new Error("Ошибка при отправке результата");
      }

      const result = await response.json();
      return result;
    } catch (err) {
      console.error("Ошибка при отправке результата:", err);
      throw err;
    }
  };

  if (loading) {
    return <div>Загрузка новой игры...</div>;
  }

  if (error) {
    return (
      <div>
        <h2>Ошибка</h2>
        <p>{error}</p>
        <button onClick={() => window.location.href = "/game"}>Новая игра</button>
      </div>
    );
  }

  if (!gameData) {
    return null;
  }

  const gameStats = {
    complexity: gameData.complexity,
    avgTimeMs: gameData.avg_solve_time_ms,
    attempts: gameData.solve_attempts,
    successRate: gameData.success_rate
  };

  return (
    <Game
      initialField={gameData.initial_field}
      solution={gameData.solution}
      complexity={gameData.complexity}
      stats={gameStats}
      onGameComplete={handleGameComplete}
      onDifficultyChange={handleDifficultyChange}
    />
  );
};

export default SingleGameEntryPage;
