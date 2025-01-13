import React, { useEffect, useState } from "react";
import apiClient from "../../utils/apiClient";
import Link from "next/link";

interface Client {
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
  activeProjects: number;
  pendingDeliveryNotes: number;
}

const ClientList = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await apiClient.get("/api/client", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        const filteredClients = response.data.filter((client: any) =>
          client.name.startsWith("CLIENT_") // Filtra solo clientes
        );
        setClients(filteredClients);
      } catch (error) {
        console.error("Error al obtener los clientes:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchClients();
  }, []);   

  if (loading) return <p>Cargando clientes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={styles.container}>
      <h1>Lista de Clientes</h1>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>CIF</th>
            <th>Dirección</th>
            <th>Proyectos Activos</th>
            <th>Albaranes Pendientes</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client._id}>
              <td>
                <Link href={`/clients/${client._id}`} style={styles.link}>
                  {client.name}
                </Link>
              </td>
              <td>{client.cif}</td>
              <td>
                {client.address.street}, {client.address.number},{" "}
                {client.address.postal}, {client.address.city},{" "}
                {client.address.province}
              </td>
              <td>{client.activeProjects || 0}</td>
              <td>{client.pendingDeliveryNotes || 0}</td>
              <td>
                <Link href={`/clients/create-bill?id=${client._id}`} style={styles.createButton}>
                  Crear Albarán
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
};

export default ClientList;
