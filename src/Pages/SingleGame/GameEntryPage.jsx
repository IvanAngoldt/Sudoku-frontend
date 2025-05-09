import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GameEntryPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8080/game/get-random-sudoku/easy", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Ошибка при загрузке судоку");
        }
        return res.json();
      })
      .then((data) => {
        const id = data.id;
        navigate(`/game/${id}`, { replace: true });
      })
      .catch((err) => {
        console.error("Ошибка загрузки судоку:", err);
      });
  }, [navigate]);

  return <div>Загрузка новой игры...</div>;
};

export default GameEntryPage;
