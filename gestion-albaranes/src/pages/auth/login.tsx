import React, { useState } from "react";
import { useRouter } from "next/router";
import apiClient from "@/utils/apiClient";

const Login = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
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
      const response = await apiClient.post("/api/user/login", formData);
      const token = response.data.token;

      if (token) {
        localStorage.setItem("jwt", token);
        setMessage("Inicio de sesión exitoso. Redirigiendo...");
        setTimeout(() => {
          router.push("/dashboard"); // Redirigir al dashboard
        }, 1500);
      }
    } catch (error: any) {
      setMessage(
        error.response?.data?.message || "Error al iniciar sesión. Verifica tus credenciales."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleInputChange}
          style={styles.input}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleInputChange}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Cargando..." : "Iniciar Sesión"}
        </button>
        <button
          type="button"
          style={styles.secondaryButton}
          onClick={() => router.push("/")}
        >
          Volver al Menú
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    textAlign: "center" as const,
    fontFamily: "Arial, sans-serif",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
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
  secondaryButton: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#f0f0f0",
    color: "#333",
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "pointer",
  },
  message: {
    marginTop: "10px",
    color: "green",
  },
};

export default Login;