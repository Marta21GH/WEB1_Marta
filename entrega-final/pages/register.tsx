import React, { useState } from "react";
import apiClient from "../../utils/apiClient";
import Link from "next/link";

// Validación del formulario
const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (password: string) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

const validateForm = (formData: typeof initialFormData) => {
  const errors: typeof initialFormData = {
    name: "",
    address: "",
    postal: "",
    idNumber: "",
    phone: "",
    email: "",
    password: "",
  };

  if (!formData.name) errors.name = "El nombre es obligatorio.";
  if (!formData.address) errors.address = "La dirección es obligatoria.";
  if (!formData.postal) errors.postal = "El código postal es obligatorio.";
  if (!formData.idNumber) errors.idNumber = "El CIF/NIF/DNI es obligatorio.";
  if (!formData.phone) errors.phone = "El teléfono es obligatorio.";
  if (!validateEmail(formData.email)) errors.email = "El correo es inválido.";
  if (!validatePassword(formData.password))
    errors.password =
      "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.";

  return errors;
};

// Datos iniciales del formulario
const initialFormData = {
  name: "",
  address: "",
  postal: "",
  idNumber: "",
  phone: "",
  email: "",
  password: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialFormData);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Manejar cambios en los campos
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) return;

    setLoading(true);
    setMessage("");

    try {
      const response = await apiClient.post("/api/user/register", formData);
      if (response.data.token) {
        setMessage("Registro exitoso. Revisa tu correo para validar la cuenta.");
        setFormData(initialFormData); // Reiniciar formulario tras éxito
      }
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Error al registrar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.card}>
        <h1 style={styles.title}>Registro</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          {Object.keys(initialFormData).map((key) => (
            <InputField
              key={key}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              name={key}
              value={formData[key as keyof typeof formData]}
              placeholder={`Ingrese ${key}`}
              error={errors[key as keyof typeof errors]}
              onChange={handleInputChange}
            />
          ))}
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>
        {message && <p style={styles.message}>{message}</p>}
        <div style={styles.buttonContainer}>
          <Link href="/">
            <button style={styles.backButton}>Volver al Menú</button>
          </Link>
          <Link href="/auth/validate">
            <button style={styles.validateButton}>Validación</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Componente reutilizable para los campos del formulario
const InputField = ({
  label,
  name,
  value,
  placeholder,
  error,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  placeholder: string;
  error: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div style={styles.inputContainer}>
    <label style={styles.label}>{label}</label>
    <input
      type={name === "password" ? "password" : "text"}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      style={styles.input}
    />
    {error && <p style={styles.error}>{error}</p>}
  </div>
);

// Estilos
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
  inputContainer: {
    marginBottom: "10px",
  },
  label: {
    display: "block",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    width: "100%",
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
  error: {
    fontSize: "14px",
    color: "red",
  },
  message: {
    marginTop: "10px",
    fontSize: "16px",
    color: "green",
  },
  buttonContainer: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
  },
  backButton: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#ccc",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  validateButton: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#0070f3",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Register;
