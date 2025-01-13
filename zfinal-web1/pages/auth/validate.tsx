import { useForm } from "react-hook-form";
import apiClient from "@utils/apiClient";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Validate() {
  const { register, handleSubmit } = useForm();
  const [message, setMessage] = useState("");
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        setMessage("No se encontró un token. Por favor, inicia sesión.");
        return;
      }

      await apiClient.put("/api/user/validation", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Validación exitosa. Redirigiendo al inicio...");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error: any) {
      if (error.response?.status === 400) {
        if (error.response?.data?.message === "Correo no identificado") {
          setMessage("Correo no identificado.");
        } else if (error.response?.data?.message === "Código de validación incorrecto") {
          setMessage("Código de validación incorrecto.");
        } else {
          setMessage("Error al validar.");
        }
      } else {
        setMessage("Error desconocido. Intenta nuevamente.");
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h1 style={styles.title}>Validar Cuenta</h1>
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
          <input {...register("email")} placeholder="Correo Electrónico" style={styles.input} />
          <input {...register("code")} placeholder="Código de Validación" style={styles.input} />
          <p>{message}</p>
          <div style={styles.buttonContainer}>
            <Link href="/">
              <button style={{ ...styles.button, ...styles.redButton }}>Volver al Menú</button>
            </Link>
            <button type="submit" style={{ ...styles.button, ...styles.greenButton }}>
              Validar
            </button>
          </div>
        </form>
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
    padding: "10px", // Padding uniforme
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "1rem",
    width: "100%",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  button: {
    padding: "10px 15px",
    fontSize: "1rem",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
    fontWeight: "bold",
    flex: "1", // Asegura que los botones sean del mismo ancho
    margin: "0 5px", // Espaciado entre botones
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
