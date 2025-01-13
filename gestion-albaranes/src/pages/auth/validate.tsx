import React, { useState } from "react";
import apiClient from "../../utils/apiClient";
import Link from "next/link";

const Validate = () => {
  const [formData, setFormData] = useState({ email: "", code: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await apiClient.put("/api/user/validation", formData);
      setMessage("Validación exitosa. Ahora puedes iniciar sesión.");
      setFormData({ email: "", code: "" });
      setTimeout(() => {
        window.location.href = "/";
      }, 2000); // Redirige al menú después de 2 segundos
    } catch (error: any) {
      setMessage(
        error.response?.data?.message || "Error durante la validación. Verifica los datos."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.card}>
        <h1 style={styles.title}>Validación</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            name="email"
            placeholder="Correo Electrónico"
            value={formData.email}
            onChange={handleInputChange}
            style={styles.input}
            required
          />
          <input
            type="text"
            name="code"
            placeholder="Código de Validación"
            value={formData.code}
            onChange={handleInputChange}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Validando..." : "Validar"}
          </button>
        </form>
        {message && <p style={styles.message}>{message}</p>}
        <div style={styles.buttonContainer}>
          <Link href="/">
            <button style={styles.backButton}>Volver al Menú</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f9f9f9",
  },
  card: {
    maxWidth: "400px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center" as const,
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "15px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#0070f3",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  message: {
    marginTop: "10px",
    fontSize: "16px",
    color: "green",
  },
  buttonContainer: {
    marginTop: "20px",
    textAlign: "center" as const,
  },
  backButton: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#ccc",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Validate;
