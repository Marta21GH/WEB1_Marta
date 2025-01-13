import Link from "next/link";

export default function Custom404() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Página no encontrada</h1>
      <p style={styles.description}>
        Lo sentimos, la página que buscas no existe o ha sido movida.
      </p>
      <Link href="/">
        <button style={styles.button}>Volver al Inicio</button>
      </Link>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
    textAlign: "center" as const,
  },
  heading: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
  },
  description: {
    fontSize: "1.2rem",
    color: "#555",
    marginBottom: "30px",
  },
  button: {
    backgroundColor: "#0070f3",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    fontSize: "1rem",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#005bb5",
  },
};
