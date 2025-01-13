import Link from "next/link";

export default function Home() {
  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.title}>GestionEasy</h1> {/* Cambia por el nombre que prefieras */}
        <nav style={styles.nav}>
          <Link href="/auth/register">
            <button style={styles.navButton}>Registrarse</button>
          </Link>
          <Link href="/auth/login">
            <button style={styles.navButton}>Iniciar Sesión</button>
          </Link>
        </nav>
      </header>

      {/* Descripción */}
      <div style={styles.description}>
        <p>Una aplicación para gestionar clientes, proveedores, proyectos y albaranes.</p>
      </div>
    </div>
  );
}

// Estilos en línea
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
    padding: "0 20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0070f3",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  nav: {
    display: "flex",
    gap: "10px",
  },
  navButton: {
    backgroundColor: "white",
    color: "#0070f3",
    border: "1px solid #0070f3",
    borderRadius: "5px",
    padding: "5px 10px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  description: {
    marginTop: "20px",
    textAlign: "center" as const,
    fontSize: "1.2rem",
    color: "#333",
  },
};

