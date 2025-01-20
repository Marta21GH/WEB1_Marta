import React from "react";

function Result({ score, total }) {
  return (
    <div>
      <h2>Resultados</h2>
      <p>
        Respondiste correctamente {score} de {total} preguntas.
      </p>
      <button
        onClick={() => window.location.reload()}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Reiniciar Quiz
      </button>
    </div>
  );
}

export default Result;