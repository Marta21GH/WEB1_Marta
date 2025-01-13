import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import apiClient from "@utils/apiClient";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// Esquema de validación con YUP
const schema = yup.object().shape({
  name: yup.string().required("El nombre es obligatorio."),
  email: yup
    .string()
    .email("Correo electrónico inválido.")
    .required("El correo es obligatorio."),
  password: yup
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres.")
    .matches(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula.")
    .matches(/[0-9]/, "La contraseña debe contener al menos un número.")
    .matches(/[@$!%*?&]/, "La contraseña debe contener al menos un carácter especial.")
    .required("La contraseña es obligatoria."),
});

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [message, setMessage] = useState("");
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const response = await apiClient.post("/api/user/register", data);
      const token = response.data.token;
      if (token) {
        localStorage.setItem("jwt", token);
        setMessage("Registro exitoso. Por favor, valida tu cuenta.");
      } else {
        setMessage("Registro exitoso, pero no se recibió token.");
      }
    } catch (error: any) {
      if (error.response?.status === 400) {
        if (error.response?.data?.message === "Correo ya registrado") {
          setMessage("Este correo ya está registrado.");
        } else if (error.response?.data?.message === "Contraseña demasiado corta") {
          setMessage("La contraseña debe tener al menos 8 caracteres.");
        } else {
          setMessage("Por favor, complete todos los campos requeridos.");
        }
      } else {
        setMessage(error.response?.data?.message || "Error al registrar.");
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h1 style={styles.title}>Registro</h1>
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
          <input {...register("name")} placeholder="Nombre" style={styles.input} />
          {errors.name?.message && <p style={styles.error}>{errors.name.message}</p>}
          <input {...register("email")} placeholder="Correo Electrónico" style={styles.input} />
          {errors.email?.message && <p style={styles.error}>{errors.email.message}</p>}
          <input
            type="password"
            {...register("password")}
            placeholder="Contraseña"
            style={styles.input}
          />
          {errors.password?.message && <p style={styles.error}>{errors.password.message}</p>}
          <p>{message}</p>
          <div style={styles.buttonContainer}>
            <Link href="/">
              <button style={{ ...styles.button, ...styles.redButton }}>Volver al Menú</button>
            </Link>
            <button type="submit" style={{ ...styles.button, ...styles.greenButton }}>
              Registrarse
            </button>
            <Link href="/auth/validate">
              <button style={{ ...styles.button, ...styles.blueButton }}>Validar Cuenta</button>
            </Link>
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
    padding: "10px", // Añade padding para separar los inputs de los bordes
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "1rem",
    width: "100%",
    boxSizing: "border-box" as const, // Asegura que el padding no afecte el tamaño
  },
  error: {
    color: "red",
    fontSize: "0.9rem",
    marginTop: "-10px", // Reduce el espacio entre el error y el input
    marginBottom: "5px",
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
    margin: "0 5px", // Espacio entre los botones
  },
  redButton: {
    backgroundColor: "#e63946",
    color: "white",
  },
  greenButton: {
    backgroundColor: "#28a745",
    color: "white",
  },
  blueButton: {
    backgroundColor: "#0070f3",
    color: "white",
  },
};
