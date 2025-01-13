import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import apiClient from "../../utils/apiClient";

interface Project {
  _id: string;
  name: string;
  projectCode: string;
  begin?: string;
  end?: string;
  notes?: string;
  clientId: string;
}

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
  createdAt: string;
  updatedAt: string;
}

const ClientDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [client, setClient] = useState<Client | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchClientData = async () => {
      try {
        // Obtener datos del cliente
        const clientResponse = await apiClient.get(`/api/client/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        setClient(clientResponse.data);

        // Obtener todos los proyectos y filtrar por clientId
        const projectsResponse = await apiClient.get(`/api/projects`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        const filteredProjects = projectsResponse.data.filter(
          (project: Project) => project.clientId === id
        );
        setProjects(filteredProjects);
      } catch (err: any) {
        console.error("Error al cargar datos:", err);
        setError("Error al cargar los datos del cliente.");
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  if (!client) return <p>Cliente no encontrado.</p>;

  return (
    <div style={styles.container}>
      <h1>Cliente: {client.name.replace("CLIENT_", "")}</h1>
      <p><strong>CIF:</strong> {client.cif}</p>
      <p><strong>Dirección:</strong> {`${client.address.street}, ${client.address.number}, ${client.address.postal}, ${client.address.city}, ${client.address.province}`}</p>
      <p><strong>Creado el:</strong> {new Date(client.createdAt).toLocaleString()}</p>
      <p><strong>Última Actualización:</strong> {new Date(client.updatedAt).toLocaleString()}</p>

      {/* Listado de Proyectos */}
      <h2>Proyectos</h2>
      <div style={styles.projectsContainer}>
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project._id} style={styles.projectBox}>
              <h3>{project.name}</h3>
              <p><strong>Código:</strong> {project.projectCode}</p>
              <p><strong>Notas:</strong> {project.notes || "Sin notas"}</p>
              <button
                style={styles.deleteButton}
                onClick={() => alert(`Eliminar proyecto ${project.name}`)}
              >
                Eliminar Proyecto
              </button>
            </div>
          ))
        ) : (
          <p>No hay proyectos asociados a este cliente.</p>
        )}
      </div>

      <button
        style={styles.createButton}
        onClick={() => router.push(`/projects/create?clientId=${id}`)}
      >
        Crear Proyecto
      </button>
      <button
        style={styles.backButton}
        onClick={() => router.push("/clients")}
      >
        Volver a la Lista de Clientes
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  },
  projectsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "10px",
    margin: "20px 0",
  },
  projectBox: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "15px",
    backgroundColor: "#f9f9f9",
  },
  createButton: {
    padding: "10px 20px",
    backgroundColor: "#0070f3",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
  },
  backButton: {
    marginTop: "20px",
    marginLeft: "10px",
    padding: "10px 20px",
    backgroundColor: "#555",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  deleteButton: {
    marginTop: "10px",
    padding: "8px 15px",
    backgroundColor: "#e63946",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ClientDetail;