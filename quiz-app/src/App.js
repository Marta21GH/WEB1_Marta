import React, { useState } from "react";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import questionsData from "./data/questions.json";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(score + 1);
    if (currentQuestion < questionsData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Quiz de React</h1>
      {showResult ? (
        <Result score={score} total={questionsData.length} />
      ) : (
        <Quiz
          question={questionsData[currentQuestion]}
          onAnswer={handleAnswer}
        />
      )}
    </div>
  );
}

export default App;