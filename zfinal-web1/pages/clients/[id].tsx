import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import apiClient from "@utils/apiClient"; // Asegúrate de que esta ruta sea correcta
import { AxiosError } from "axios"; // Importamos AxiosError para manejar el tipo de error
import styles from "../../styles/Client.module.css"; // Asegúrate de que esta ruta sea correcta

export default function ClientDetails() {
  const router = useRouter();
  const { id } = router.query; // Obtener el ID desde la URL
  const [client, setClient] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]); // Lista de proyectos asociados
  const [isEditing, setIsEditing] = useState(false); // Estado para habilitar la edición
  const [showDeletePopup, setShowDeletePopup] = useState(false); // Estado para manejar el pop-up de eliminación

  useEffect(() => {
    if (id) {
      const fetchClient = async () => {
        try {
          const response = await apiClient.get(`/api/client/${id}`);
          setClient(response.data);

          // Obtener proyectos asociados a este cliente
          const projectsResponse = await apiClient.get(`/api/project/${id}`);
          setProjects(projectsResponse.data);
        } catch (error) {
          console.error("Error al obtener los detalles del cliente:", error);
        }
      };
      fetchClient();
    }
  }, [id]);

  if (!client) {
    return <p>Cargando...</p>;
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      // Realizar la actualización del cliente
      const response = await apiClient.put(`/api/client/${id}`, client);
      setClient(response.data); // Actualizamos el cliente con los datos guardados
      setIsEditing(false); // Desactivamos el modo de edición
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await apiClient.delete(`/api/client/${id}`);
      router.push("/clients"); // Redirigir al listado de clientes después de eliminar
    } catch (error) {
      console.error("Error al eliminar el cliente:", error);
    }
  };

  const openDeletePopup = () => {
    setShowDeletePopup(true); // Mostrar el pop-up
  };

  const closeDeletePopup = () => {
    setShowDeletePopup(false); // Cerrar el pop-up
  };

  const handleCreateProject = () => {
    router.push(`/projects/create?clientId=${id}`); // Redirigir al formulario de creación de proyecto
  };

  // Contar proyectos activos y pendientes
  const activeProjectsCount = projects.filter((project) => project.status === "Activo").length;
  const pendingDeliveryNotesCount = projects.filter((project) => project.status === "Pendiente").length;

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <h1 className={styles.title}>Detalles del Cliente</h1>
        <div className={styles.details}>
          <p><strong>Nombre:</strong> 
            {isEditing ? 
              <input 
                type="text" 
                value={client.name} 
                onChange={(e) => setClient({ ...client, name: e.target.value })} 
              /> 
              : client.name
            }
          </p>
          <p><strong>ID:</strong> {client._id}</p> {/* ID no editable */}
          <p><strong>Dirección:</strong> 
            {isEditing ? 
              <input 
                type="text" 
                value={client.address.street} 
                onChange={(e) => setClient({ ...client, address: { ...client.address, street: e.target.value } })} 
              /> 
              : client.address.street
            }, 
            {isEditing ? 
              <input 
                type="text" 
                value={client.address.city} 
                onChange={(e) => setClient({ ...client, address: { ...client.address, city: e.target.value } })} 
              /> 
              : client.address.city
            }, 
            {isEditing ? 
              <input 
                type="text" 
                value={client.address.province} 
                onChange={(e) => setClient({ ...client, address: { ...client.address, province: e.target.value } })} 
              /> 
              : client.address.province
            }
          </p>
          <p><strong>Fecha de Creación:</strong> {new Date(client.createdAt).toLocaleDateString()}</p> {/* Fecha de Creación */}
        </div>

        <div className={styles.buttons}>
          <button
            className={`${styles.button} ${styles.modifyButton}`}
            onClick={handleEdit}
            disabled={isEditing}
          >
            Modificar
          </button>
          {isEditing && (
            <button className={`${styles.button} ${styles.saveButton}`} onClick={handleSave}>
              Guardar cambios
            </button>
          )}
          <div className={styles["bottom-buttons"]}>
            <button className={`${styles.button} ${styles.cancelButton}`} onClick={() => router.push("/clients")}>
              Volver al listado
            </button>
            <button className={`${styles.button} ${styles.deleteButton}`} onClick={openDeletePopup}>
              Eliminar
            </button>
          </div>
        </div>

        {/* Listado de proyectos */}
        <div className={styles.projectsSection}>
          <h2>Listado de Proyectos de este Cliente</h2>
          <div className={styles.projectsList}>
            {projects.length > 0 ? (
              projects.map((project) => (
                <div key={project._id} className={styles.projectCard}>
                  <h3>{project.name}</h3>
                  <p><strong>Código:</strong> {project.projectCode}</p>
                  <p><strong>Estado:</strong> {project.status}</p>
                  <p><strong>Correo:</strong> {project.email}</p>
                </div>
              ))
            ) : (
              <p>No hay proyectos asociados a este cliente.</p>
            )}
          </div>
          <button className={styles.createButton} onClick={handleCreateProject}>
            Crear nuevo proyecto
          </button>
        </div>
      </div>

      {/* Pop-up de Confirmación para Eliminar */}
      {showDeletePopup && (
        <div className={styles.deletePopup}>
          <div>
            <h3>¿Estás seguro de que deseas eliminar este cliente?</h3>
            <button className={`${styles.button} ${styles.deleteButton}`} onClick={handleDelete}>Sí, Eliminar</button>
            <button className={`${styles.button} ${styles.cancelButton}`} onClick={closeDeletePopup}>No, Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}
