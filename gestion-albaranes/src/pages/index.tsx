import React from "react";
import Link from "next/link";

const Home = () => {
  return (
    <>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.title}>Gestión de Albaranes</h1>
        <nav style={styles.nav}>
          <Link href="/auth/register" style={styles.link}>
            Registro
          </Link>
          <Link href="/auth/login" style={styles.link}>
            Login
          </Link>
        </nav>
      </header>

      {/* Contenido principal */}
      <div style={styles.container}>
        <h2>Bienvenido a la Aplicación</h2>
        <p>Inicia sesión o regístrate para gestionar tus albaranes.</p>
      </div>
    </>
  );
};

const styles = {
  header: {
    backgroundColor: "#0070f3",
    padding: "20px",
    textAlign: "center" as const,
    color: "white",
  },
  title: {
    margin: "0",
    fontSize: "24px",
  },
  nav: {
    marginTop: "10px",
  },
  link: {
    margin: "0 15px",
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
  },
  container: {
    textAlign: "center" as const,
    marginTop: "50px",
    fontFamily: "Arial, sans-serif",
  },
};

export default Home;
