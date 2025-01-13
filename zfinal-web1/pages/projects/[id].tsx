import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import apiClient from "@utils/apiClient";
import styles from "../../styles/Client.module.css";

export default function ProjectDetails() {
  const { id } = useRouter().query;
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    if (id) {
      const fetchProject = async () => {
        try {
          const response = await apiClient.get(`/api/project/${id}`);
          setProject(response.data);
        } catch (error) {
          console.error("Error al obtener los detalles del proyecto:", error);
        }
      };
      fetchProject();
    }
  }, [id]);

  if (!project) return <p>Cargando...</p>;

  return (
    <div className={styles.container}>
      <h1>Detalles del Proyecto</h1>
      <p>Nombre: {project.name}</p>
      <p>Descripción: {project.description}</p>
      <p>Cliente: {project.clientId}</p>
      {/* Más detalles y botones para modificar, eliminar, etc. */}
    </div>
  );
}
