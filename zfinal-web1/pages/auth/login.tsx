import { useForm } from "react-hook-form";
import apiClient from "@utils/apiClient";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const [message, setMessage] = useState("");
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const response = await apiClient.post("/api/user/login", data);

      // Guarda el token y el nombre del usuario en localStorage
      localStorage.setItem("jwt", response.data.token);
      localStorage.setItem("userName", response.data.name); // Asegúrate de que la API devuelve el nombre del usuario

      setMessage("Inicio de sesión exitoso.");

      // Redirige al dashboard
      router.push("/dashboard");
    } catch (error: any) {
      if (error.response?.data?.message === "Correo no identificado") {
        setMessage("Correo no identificado.");
      } else if (error.response?.data?.message === "Contraseña errónea") {
        setMessage("Contraseña errónea.");
      } else {
        setMessage("Error al iniciar sesión.");
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h1 style={styles.title}>Iniciar Sesión</h1>
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
          <input {...register("email")} placeholder="Correo Electrónico" style={styles.input} />
          <input
            type="password"
            {...register("password")}
            placeholder="Contraseña"
            style={styles.input}
          />
          <button type="submit" style={{ ...styles.button, ...styles.greenButton }}>
            Iniciar Sesión
          </button>
        </form>
        <p>{message}</p>
        <div style={styles.buttonContainer}>
          <Link href="/">
            <button style={{ ...styles.button, ...styles.redButton }}>Volver al Menú</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f9f9f9",
    fontFamily: "Arial, sans-serif",
  },
  formBox: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "350px",
    textAlign: "center" as const,
  },
  title: {
    fontSize: "1.5rem",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "15px",
    padding: "10px",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "1rem",
    width: "100%",
  },
  buttonContainer: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
  },
  button: {
    padding: "10px 15px",
    fontSize: "1rem",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
    fontWeight: "bold",
    margin: "0 5px",
  },
  redButton: {
    backgroundColor: "#e63946",
    color: "white",
  },
  greenButton: {
    backgroundColor: "#28a745",
    color: "white",
  },
};
