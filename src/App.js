import React, { useState, useEffect } from "react";
import ParagraphDisplay from "./components/ParagraphDisplay";
import TypingArea from "./components/TypingArea";
import StatsDisplay from "./components/StatsDisplay";
import Timer from "./components/Timer";
import "./App.css";

const paragraphs = [
  "The quick brown fox jumps over the lazy dog. This sentence is a common pangram used to practice typing because it contains all the letters of the English alphabet. Typing it repeatedly can help improve both speed and accuracy.",
  "In the modern digital age, typing is an indispensable skill. Whether you're drafting an email, writing a report, or chatting with friends, the ability to type quickly and accurately saves time and enhances productivity.",
  "React is a powerful JavaScript library for building user interfaces. It allows developers to create reusable components, manage state efficiently, and build highly interactive and dynamic web applications with ease.",
  "JavaScript has evolved significantly since its inception, becoming one of the most widely used programming languages in the world. It powers everything from simple website features to complex server-side applications and mobile app development.",
  "Regular practice is the key to becoming a proficient typist. By challenging yourself with diverse texts and tracking your",
];

function App() {
  const [currentParagraph, setCurrentParagraph] = useState("");
  const [typedText, setTypedText] = useState("");
  const [mistakes, setMistakes] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [cpm, setCpm] = useState(0);

  useEffect(() => {
    setCurrentParagraph(
      paragraphs[Math.floor(Math.random() * paragraphs.length)]
    );
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else {
      setGameOver(true);
      calculateResults();
    }
  }, [timeLeft, gameOver]);

  const handleInputChange = (text) => {
    setTypedText(text);

    let errorCount = 0;
    for (let i = 0; i < text.length; i++) {
      if (text[i] !== currentParagraph[i]) errorCount++;
    }
    setMistakes(errorCount);
  };

  const calculateResults = () => {
    const wordsTyped = typedText.trim().split(" ").length;
    setWpm(Math.round((wordsTyped / (60 - timeLeft)) * 60));
    setCpm(typedText.length);
  };

  const resetGame = () => {
    setCurrentParagraph(
      paragraphs[Math.floor(Math.random() * paragraphs.length)]
    );
    setTypedText("");
    setMistakes(0);
    setTimeLeft(60);
    setGameOver(false);
    setWpm(0);
    setCpm(0);
  };

  return (
    <div className="App">
      <h1>Typing Speed Tester</h1>
      <ParagraphDisplay paragraph={currentParagraph} />
      <Timer timeLeft={timeLeft} />
      <TypingArea
        typedText={typedText}
        onInputChange={handleInputChange}
        disabled={gameOver}
      />
      <StatsDisplay wpm={wpm} cpm={cpm} mistakes={mistakes} />
      <button onClick={resetGame} className="reset-button">
        Reset
      </button>
    </div>
  );
}

export default App;
