import React, { useEffect, useState } from "react";
import apiClient from "../../utils/apiClient";
import Link from "next/link";

interface Provider {
  _id: string;
  name: string;
  cif: string;
  address: {
    street: string;
    number: number;
    postal: number;
    city: string;
    province: string;
  };
}

const ProviderList = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await apiClient.get("/api/client", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        const filteredProviders = response.data.filter((provider: any) =>
          provider.name.startsWith("PROVIDER_") // Filtra solo proveedores
        );
        setProviders(filteredProviders);
      } catch (error) {
        console.error("Error al obtener los proveedores:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProviders();
  }, []);  

  if (loading) return <p>Cargando proveedores...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={styles.container}>
      <h1>Lista de Proveedores</h1>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>CIF</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {providers.map((provider) => (
            <tr key={provider._id}>
              <td>
                <Link href={`/providers/${provider._id}`} style={styles.link}>
                  {provider.name}
                </Link>
              </td>
              <td>{provider.cif}</td>
              <td>
                {provider.address.street}, {provider.address.number},{" "}
                {provider.address.postal}, {provider.address.city},{" "}
                {provider.address.province}
              </td>
              <td>
                <Link
                  href={`/providers/${provider._id}`}
                  style={styles.actionButton}
                >
                  Ver Detalles
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={styles.menuButtonContainer}>
        <Link href="\dashboard" style={styles.menuButton}>
          Volver al Menú
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "900px",
    margin: "50px auto",
    textAlign: "center" as const,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    margin: "20px 0",
  },
  th: {
    backgroundColor: "#0070f3",
    color: "white",
    padding: "10px",
    textAlign: "left" as const,
  },
  td: {
    borderBottom: "1px solid #ddd",
    padding: "10px",
  },
  link: {
    color: "#0070f3",
    textDecoration: "underline",
  },
  createButton: {
    display: "inline-block",
    padding: "5px 10px",
    backgroundColor: "#28a745",
    color: "white",
    borderRadius: "5px",
    textDecoration: "none",
    fontSize: "14px",
  },
  menuButtonContainer: {
    marginTop: "20px",
    textAlign: "center" as const,
  },
  menuButton: {
    display: "inline-block",
    padding: "10px 20px",
    backgroundColor: "#0070f3",
    color: "white",
    borderRadius: "5px",
    textDecoration: "none",
    fontSize: "16px",
  },
  actionButton: {
    display: "inline-block",
    padding: "5px 10px",
    backgroundColor: "#28a745",
    color: "white",
    borderRadius: "5px",
    textDecoration: "none",
    fontSize: "14px",
  },
};

export default ProviderList;
