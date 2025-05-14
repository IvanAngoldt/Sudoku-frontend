import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Game from "./sudokuLogic/Game";
import { useAuthUser } from "../../hooks/useAuthUser";

const TournamentGameEntryPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [gameData, setGameData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tournamentId, setTournamentId] = useState(null);
  const { data: authUser, loading: userLoading } = useAuthUser();

  // 1. Загружаем текущий турнир
  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:8080/tournaments/current", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Не удалось загрузить текущий турнир");

        const tournament = await res.json();
        setTournamentId(tournament.id);
      } catch (err) {
        console.error("Ошибка загрузки турнира:", err);
        setError(err.message);
      }
    };

    fetchTournament();
  }, []);

  // 2. Загружаем игру, когда есть и user, и tournamentId
  useEffect(() => {
    if (userLoading || !authUser || !tournamentId) return;

    const loadGame = async () => {
      const token = localStorage.getItem("token");

      const url = id
        ? `http://localhost:8080/tournaments/sudoku/${id}`
        : `http://localhost:8080/tournaments/sudoku?difficulty=easy`;

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            user_id: authUser.user.id,
            tournament_id: tournamentId,
          }),
        });

        if (!response.ok) {
          throw new Error("Ошибка при загрузке судоку");
        }

        const data = await response.json();
        setGameData(data);
        setLoading(false);

        if (!id) {
          navigate(`/tournament/${data.id}`);
        }
      } catch (err) {
        console.error("Ошибка загрузки судоку:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    loadGame();
  }, [id, navigate, authUser, tournamentId, userLoading]);

  // 3. Обработчики
  const handleDifficultyChange = async (newDifficulty) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/tournaments/sudoku?difficulty=${newDifficulty}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            user_id: authUser.user.id,
            tournament_id: tournamentId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Ошибка при загрузке судоку");
      }

      const data = await response.json();
      setGameData(data);
      navigate(`/tournament/${data.id}`);
    } catch (error) {
      console.error("Ошибка при смене сложности:", error);
      setError(error.message);
    }
  };

  const handleGameComplete = async (solveTimeMs) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/tournaments/sudoku/${gameData.id}/solved`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            user_id: authUser.user.id,
            tournament_id: tournamentId,
            difficulty: gameData.complexity,
            solve_time_ms: solveTimeMs,
          }),
        }
      );

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

  // 4. Состояния
  if (userLoading || loading) {
    return <div>Загрузка новой игры...</div>;
  }

  if (error) {
    return (
      <div>
        <h2>Ошибка</h2>
        <p>{error}</p>
        <button onClick={() => window.location.href = "/tournaments"}>
          Вернуться к турниру
        </button>
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
    successRate: gameData.success_rate,
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

export default TournamentGameEntryPage;
