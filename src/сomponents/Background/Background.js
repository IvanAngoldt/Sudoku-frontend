import { useState, useEffect } from "react";
import "./Background.css";

const getNumbersCount = () => {
  const area = window.innerWidth * window.innerHeight;
  return Math.max(20, Math.floor(area / 50000)); // Подбираем коэффициент
};

const generateRandomNumbers = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    number: Math.floor(Math.random() * 9) + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    velocityX: (Math.random() - 0.5) * 0.1,
    velocityY: (Math.random() - 0.5) * 0.1,
    fontSize: 16 + Math.random() * 32,
    rotation: Math.random() * 60 - 30,
  }));
};

const SudokuBackground = () => {
  const [numbersCount, setNumbersCount] = useState(getNumbersCount);
  const [sudokuNumbers, setSudokuNumbers] = useState(generateRandomNumbers(numbersCount));
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });
  const [formBounds, setFormBounds] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      const newCount = getNumbersCount();
      setNumbersCount(newCount);
      setSudokuNumbers(generateRandomNumbers(newCount));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const updateFormBounds = () => {
      const formElement = document.querySelector(".login-box");
      if (formElement) {
        const rect = formElement.getBoundingClientRect();
        setFormBounds({
          left: (rect.left / window.innerWidth) * 100,
          right: (rect.right / window.innerWidth) * 100,
          top: (rect.top / window.innerHeight) * 100,
          bottom: (rect.bottom / window.innerHeight) * 100,
        });
      }
    };

    updateFormBounds();
    window.addEventListener("resize", updateFormBounds);
    return () => window.removeEventListener("resize", updateFormBounds);
  }, []);

  useEffect(() => {
    let animationFrame;

    const animateNumbers = () => {
      setSudokuNumbers((prevNumbers) =>
        prevNumbers.map((num) => {
          let newX = num.x + num.velocityX;
          let newY = num.y + num.velocityY;

          num.velocityX += (Math.random() - 0.5) * 0.02;
          num.velocityY += (Math.random() - 0.5) * 0.02;

          const dx = num.x - cursorPos.x;
          const dy = num.y - cursorPos.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 6) {
            const force = (6 - distance) / 6;
            num.velocityX += (dx / distance) * force * 0.1;
            num.velocityY += (dy / distance) * force * 0.1;
          }

          if (formBounds) {
            if (
              num.x > formBounds.left - 3 &&
              num.x < formBounds.right + 3 &&
              num.y > formBounds.top - 3 &&
              num.y < formBounds.bottom + 3
            ) {
              const pushX = num.x < formBounds.left ? -1 : num.x > formBounds.right ? 1 : 0;
              const pushY = num.y < formBounds.top ? -1 : num.y > formBounds.bottom ? 1 : 0;

              num.velocityX += pushX * 0.15;
              num.velocityY += pushY * 0.15;
            }
          }

          num.velocityX *= 0.99;
          num.velocityY *= 0.99;

          if (newX < 0 || newX > 100) num.velocityX *= -1;
          if (newY < 0 || newY > 100) num.velocityY *= -1;

          return {
            ...num,
            x: Math.max(0, Math.min(100, newX)),
            y: Math.max(0, Math.min(100, newY)),
          };
        })
      );

      animationFrame = requestAnimationFrame(animateNumbers);
    };

    animationFrame = requestAnimationFrame(animateNumbers);
    return () => cancelAnimationFrame(animationFrame);
  }, [cursorPos, formBounds]);

  return (
    <div className="sudoku-background">
      {sudokuNumbers.map((item) => (
        <span
          key={item.id}
          className="sudoku-number"
          style={{
            top: `${item.y}%`,
            left: `${item.x}%`,
            fontSize: `${item.fontSize}px`,
            transform: `rotate(${item.rotation}deg)`,
          }}
        >
          {item.number}
        </span>
      ))}
    </div>
  );
};

export default SudokuBackground;
