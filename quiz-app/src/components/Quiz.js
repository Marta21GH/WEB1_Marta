import React from "react";

function Quiz({ question, onAnswer }) {
  const handleClick = (index) => {
    const isCorrect = index === question.correctAnswer;
    onAnswer(isCorrect);
  };

  return (
    <div style={{ margin: "20px auto", maxWidth: "600px" }}>
      <h2>{question.question}</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {question.options.map((option, index) => (
          <li
            key={index}
            onClick={() => handleClick(index)}
            style={{
              margin: "10px 0",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              cursor: "pointer",
              background: "#f9f9f9",
            }}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Quiz;