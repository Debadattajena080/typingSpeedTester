import React, { useState, useEffect } from "react";
import ParagraphDisplay from "./components/ParagraphDisplay";
import TypingArea from "./components/TypingArea";
import StatsDisplay from "./components/StatsDisplay";
import Timer from "./components/Timer";
import "./App.css";

const paragraphs = [
  "The quick brown fox jumps over the lazy dog. This sentence is a common pangram used to practice typing because it contains all the letters of the English alphabet. Typing it repeatedly can help improve both speed and accuracy. Many typing programs use this sentence for practice. It’s an effective way to practice typing and improve your skills. Typing quickly and accurately is a valuable skill.",
  "In the digital age, typing is an essential skill. Whether drafting emails, writing reports, or chatting online, fast typing saves time and enhances productivity. With remote work and online communication growing, typing skills are more important than ever. Being able to type quickly and accurately helps you complete tasks more efficiently. Many professionals, from data entry clerks to software developers, rely on their typing skills.",
  "React is a powerful JavaScript library for building user interfaces. It allows developers to create reusable components and manage state efficiently. React’s virtual DOM optimizes rendering, improving performance. The component-based architecture makes it easier to maintain and scale applications. React has a strong community and a wide range of tools and libraries to enhance development. React’s flexibility and performance make it a top choice for building dynamic web applications.",
  "JavaScript is one of the most widely used programming languages today. It’s essential for building interactive websites and applications. JavaScript powers both client-side and server-side development, making it a full-stack language. Its asynchronous nature allows for faster, more responsive applications. JavaScript’s extensive ecosystem includes libraries like React, Angular, and Vue, which help developers build complex applications efficiently. Continuous development of JavaScript ensures it remains relevant and adaptable to the ever-changing needs of modern web development.",
  "Regular practice is essential for improving typing skills. Typing tests and exercises help increase speed and accuracy. By practicing different texts, you can familiarize yourself with various word patterns and improve muscle memory. Timed typing challenges are an excellent way to track progress and set goals. With consistent practice, you’ll notice improvements in both speed and accuracy, making it easier to complete tasks quickly and with fewer errors. Typing is a skill that improves with dedication.",
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
      <div className="header">
        <h1>Typing Speed Tester</h1>
        <Timer timeLeft={timeLeft} />
      </div>

      <ParagraphDisplay paragraph={currentParagraph} />

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
