import React, { useState } from "react";
import apiClient from "../../utils/apiClient";
import Link from "next/link";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    postal: "",
    idNumber: "",
    phone: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    address: "",
    postal: "",
    idNumber: "",
    phone: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = { ...errors };

    // Validación de cada campo
    if (!formData.name) newErrors.name = "El nombre es obligatorio.";
    if (!formData.address) newErrors.address = "La dirección es obligatoria.";
    if (!formData.postal) newErrors.postal = "El código postal es obligatorio.";
    if (!formData.idNumber) newErrors.idNumber = "El CIF/NIF/DNI es obligatorio.";
    if (!formData.phone) newErrors.phone = "El teléfono es obligatorio.";
    if (!validateEmail(formData.email)) newErrors.email = "El correo es inválido.";
    if (!validatePassword(formData.password))
      newErrors.password = "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.";

    setErrors(newErrors);
    if (Object.values(newErrors).some((error) => error)) return;

    setLoading(true);
    setMessage("");

    try {
      const response = await apiClient.post("/api/user/register", formData);
      if (response.data.token) {
        setMessage("Registro exitoso. Revisa tu correo para validar la cuenta.");
        setFormData({
          name: "",
          address: "",
          postal: "",
          idNumber: "",
          phone: "",
          email: "",
          password: "",
        });
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
          <input type="text" name="name" placeholder="Nombre" value={formData.name} onChange={handleInputChange} style={styles.input} />
          {errors.name && <p style={styles.error}>{errors.name}</p>}
          <input type="text" name="address" placeholder="Dirección" value={formData.address} onChange={handleInputChange} style={styles.input} />
          {errors.address && <p style={styles.error}>{errors.address}</p>}
          <input type="text" name="postal" placeholder="Código Postal" value={formData.postal} onChange={handleInputChange} style={styles.input} />
          {errors.postal && <p style={styles.error}>{errors.postal}</p>}
          <input type="text" name="idNumber" placeholder="CIF/NIF/DNI" value={formData.idNumber} onChange={handleInputChange} style={styles.input} />
          {errors.idNumber && <p style={styles.error}>{errors.idNumber}</p>}
          <input type="text" name="phone" placeholder="Teléfono" value={formData.phone} onChange={handleInputChange} style={styles.input} />
          {errors.phone && <p style={styles.error}>{errors.phone}</p>}
          <input type="email" name="email" placeholder="Correo Electrónico" value={formData.email} onChange={handleInputChange} style={styles.input} />
          {errors.email && <p style={styles.error}>{errors.email}</p>}
          <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleInputChange} style={styles.input} />
          {errors.password && <p style={styles.error}>{errors.password}</p>}
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
