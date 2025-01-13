import React, { useState } from "react";
import { useRouter } from "next/router";
import apiClient from "@/utils/apiClient";

const CreateBill = () => {
  const router = useRouter();
  const { id } = router.query; // ID del cliente pasado como parámetro

  const [formData, setFormData] = useState({
    description: "",
    status: "pendiente", // Estado inicial
  });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({
    description: "",
  });

  // Manejar cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validar datos del formulario
  const validateForm = () => {
    let valid = true;
    if (formData.description.trim() === "") {
      setErrors((prev) => ({ ...prev, description: "La descripción es obligatoria." }));
      valid = false;
    }
    return valid;
  };

  // Enviar datos al backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ description: "" }); // Limpiar errores previos
    setMessage("");

    if (!validateForm()) return; // Detener si la validación falla

    try {
      await apiClient.post(`/api/bills`, { ...formData, clientId: id }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      setMessage("Albarán creado con éxito.");
      setFormData({ description: "", status: "pendiente" }); // Limpiar formulario
    } catch (error: any) {
      console.error("Error al crear albarán:", error);
      setMessage("Error al crear el albarán. Inténtalo de nuevo.");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Crear Albarán</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="description"
          placeholder="Descripción del Albarán"
          value={formData.description}
          onChange={handleInputChange}
          style={styles.input}
        />
        {errors.description && <p style={styles.error}>{errors.description}</p>}
        <button type="submit" style={styles.button}>
          Crear Albarán
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
      <button style={styles.backButton} onClick={() => router.push(`/clients/${id}`)}>
        Volver al Cliente
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#fff",
    textAlign: "center" as const,
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#0070f3",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  backButton: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  error: {
    color: "red",
    fontSize: "14px",
    margin: "5px 0",
  },
  message: {
    marginTop: "10px",
    color: "green",
  },
};

export default CreateBill;
