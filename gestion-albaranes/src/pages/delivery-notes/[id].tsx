import React, { useState } from "react";
import apiClient from "@/utils/apiClient";
import Link from "next/link";

const Dashboard = () => {
  const [formDataClient, setFormDataClient] = useState({
    name: "",
    cif: "",
    address: {
      street: "",
      number: "",
      postal: "",
      city: "",
      province: "",
    },
  });

  const [formDataProvider, setFormDataProvider] = useState({
    name: "",
    cif: "",
    address: {
      street: "",
      number: "",
      postal: "",
      city: "",
      province: "",
    },
  });

  const [message, setMessage] = useState("");

  const handleInputChangeClient = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      setFormDataClient((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value },
      }));
    } else {
      setFormDataClient({ ...formDataClient, [name]: value });
    }
  };

  const handleInputChangeProvider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      setFormDataProvider((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value },
      }));
    } else {
      setFormDataProvider({ ...formDataProvider, [name]: value });
    }
  };

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
  
    const dataWithPrefix = {
      ...formDataClient,
      name: `CLIENT_${formDataClient.name}`, // Añadimos prefijo para clientes
    };
  
    try {
      await apiClient.post("/api/client", dataWithPrefix, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      setMessage("Cliente creado exitosamente.");
      setFormDataClient({
        name: "",
        cif: "",
        address: {
          street: "",
          number: "",
          postal: "",
          city: "",
          province: "",
        },
      });
    } catch (error) {
      setMessage("Error al crear el cliente.");
    }
  };
  
  const handleCreateProvider = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
  
    const dataWithPrefix = {
      ...formDataProvider,
      name: `PROVIDER_${formDataProvider.name}`, // Añadimos prefijo para proveedores
    };
  
    try {
      await apiClient.post("/api/client", dataWithPrefix, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      setMessage("Proveedor creado exitosamente.");
      setFormDataProvider({
        name: "",
        cif: "",
        address: {
          street: "",
          number: "",
          postal: "",
          city: "",
          province: "",
        },
      });
    } catch (error) {
      setMessage("Error al crear el proveedor.");
    }
  };
  
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Panel de Gestión</h1>
        <nav>
          <Link href="/clients">Listado de Clientes</Link> |{" "}
          <Link href="/providers">Listado de Proveedores</Link>
        </nav>
      </header>

      <div style={styles.formsContainer}>
        {/* Crear Cliente */}
        <div style={styles.formBox}>
          <h2>Crear Cliente</h2>
          <form onSubmit={handleCreateClient} style={styles.form}>
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              value={formDataClient.name}
              onChange={handleInputChangeClient}
              required
            />
            <input
              type="text"
              name="cif"
              placeholder="CIF"
              value={formDataClient.cif}
              onChange={handleInputChangeClient}
              required
            />
            <input
              type="text"
              name="address.street"
              placeholder="Calle"
              value={formDataClient.address.street}
              onChange={handleInputChangeClient}
            />
            <button type="submit">Crear Cliente</button>
          </form>
        </div>

        {/* Crear Proveedor */}
        <div style={styles.formBox}>
          <h2>Crear Proveedor</h2>
          <form onSubmit={handleCreateProvider} style={styles.form}>
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              value={formDataProvider.name}
              onChange={handleInputChangeProvider}
              required
            />
            <input
              type="text"
              name="cif"
              placeholder="NIF"
              value={formDataProvider.cif}
              onChange={handleInputChangeProvider}
              required
            />
            <input
              type="text"
              name="address.street"
              placeholder="Calle"
              value={formDataProvider.address.street}
              onChange={handleInputChangeProvider}
            />
            <button type="submit">Crear Proveedor</button>
          </form>
        </div>
      </div>

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center" as const,
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  header: {
    backgroundColor: "#0070f3",
    color: "white",
    padding: "10px",
    marginBottom: "20px",
  },
  formsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  formBox: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "20px",
    width: "300px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
  },
  message: {
    marginTop: "20px",
    color: "green",
  },
};

export default Dashboard;