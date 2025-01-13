import { useEffect, useState } from "react";
import apiClient from "@utils/apiClient"; // Asegúrate de que esta ruta sea correcta
import styles from "../../styles/Clients.module.css"; // Usamos el mismo estilo que para clientes
import Link from "next/link"; // Importa el componente Link

interface Project {
  _id: string;
  name: string;
  projectCode: string;
  clientId: string; // El ID del cliente asociado
  email: string;   // Correo del cliente
  address?: {      // Hacemos que address sea opcional
    street: string;
    city: string;
    province: string;
  };
}

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false); // Estado para mostrar el pop-up
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null); // Proyecto a eliminar
  const [isEditing, setIsEditing] = useState<string | null>(null); // Estado para habilitar la edición de un proyecto

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await apiClient.get("/api/project"); // Obtener lista de proyectos
        console.log("Proyectos recuperados:", response.data); // Verifica los datos en la consola
        setProjects(response.data);
      } catch (error) {
        console.error("Error al obtener los proyectos:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async () => {
    if (projectToDelete) {
      try {
        await apiClient.delete(`/api/project/${projectToDelete}`);
        setProjects(projects.filter((project) => project._id !== projectToDelete)); // Elimina el proyecto de la lista
        setShowDeletePopup(false); // Cerrar el pop-up después de eliminar
      } catch (error) {
        console.error("Error al eliminar el proyecto:", error);
      }
    }
  };

  const handleModify = (id: string) => {
    setIsEditing(id); // Activa el modo de edición para el proyecto seleccionado
  };

  const handleSave = async (project: Project) => {
    try {
      const response = await apiClient.put(`/api/project/${project._id}`, project);
      const updatedProjects = projects.map((p) =>
        p._id === project._id ? response.data : p
      );
      setProjects(updatedProjects); // Actualiza el proyecto en la lista
      setIsEditing(null); // Desactiva el modo de edición
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  };

  const handleCreateBill = (id: string) => {
    // Lógica para crear albarán
    console.log(`Crear albarán para el proyecto con ID: ${id}`);
  };

  const openDeletePopup = (id: string) => {
    setProjectToDelete(id);
    setShowDeletePopup(true); // Mostrar el pop-up de eliminación
  };

  const closeDeletePopup = () => {
    setShowDeletePopup(false); // Cerrar el pop-up
    setProjectToDelete(null); // Resetear el proyecto a eliminar
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Listado de Proyectos</h1>
      <div className={styles.list}>
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project._id} className={styles.clientCard}>
              {isEditing === project._id ? (
                // Mostrar formulario para editar el proyecto
                <>
                  <input
                    type="text"
                    value={project.name}
                    onChange={(e) => {
                      project.name = e.target.value;
                      setProjects([...projects]);
                    }}
                  />
                  <input
                    type="email"
                    value={project.email}
                    onChange={(e) => {
                      project.email = e.target.value;
                      setProjects([...projects]);
                    }}
                  />
                  <input
                    type="text"
                    value={project.address?.street}
                    onChange={(e) => {
                      project.address!.street = e.target.value;
                      setProjects([...projects]);
                    }}
                  />
                  <input
                    type="text"
                    value={project.address?.city}
                    onChange={(e) => {
                      project.address!.city = e.target.value;
                      setProjects([...projects]);
                    }}
                  />
                  <input
                    type="text"
                    value={project.address?.province}
                    onChange={(e) => {
                      project.address!.province = e.target.value;
                      setProjects([...projects]);
                    }}
                  />
                  <button onClick={() => handleSave(project)}>Guardar cambios</button>
                </>
              ) : (
                // Mostrar los detalles del proyecto
                <>
                  <h2>{project.name}</h2>
                  <p><strong>Código del Proyecto:</strong> {project.projectCode}</p>
                  <p><strong>Cliente:</strong> {project.clientId}</p>
                  <p><strong>Correo:</strong> {project.email}</p>
                  <p><strong>Dirección:</strong> {project.address?.street}, {project.address?.city}, {project.address?.province}</p>
                  <div className={styles.detailsButtonContainer}>
                    <button className={styles.modifyButton} onClick={() => handleModify(project._id)}>Modificar</button>
                    <Link href={`/deliverynotes/create?from=projects`}>
                      <button className={styles.button}>Crear albarán</button>
                    </Link>
                    <button className={styles.deleteButton} onClick={() => openDeletePopup(project._id)}>Eliminar</button>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <p>No hay proyectos registrados.</p>
        )}
      </div>

      <div className={styles.buttonContainer}>
        <Link href="/dashboard">
          <button className={styles.navButton}>Volver al Menú</button>
        </Link>
        <Link href="/projects/create">
          <button className={styles.button}>Crear Nuevo Proyecto</button>
        </Link>
      </div>

      {/* Pop-up de Confirmación para Eliminar (Ventana emergente) */}
      {showDeletePopup && (
        <div className={styles.deletePopup}>
          <div className={styles.popupContent}>
            <h3>¿Estás seguro de que deseas eliminar este proyecto?</h3>
            <button className={`${styles.button} ${styles.deleteButton}`} onClick={handleDelete}>Sí, Eliminar</button>
            <button className={`${styles.button} ${styles.cancelButton}`} onClick={closeDeletePopup}>No, Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}
