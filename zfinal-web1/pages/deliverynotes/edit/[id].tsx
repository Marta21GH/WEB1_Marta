import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import apiClient from "@utils/apiClient";
import styles from "../../../styles/CreateProject.module.css"; 

export default function EditDeliveryNote() {
  const [selectedClientId, setSelectedClientId] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [hours, setHours] = useState(0);
  const [material, setMaterial] = useState("");
  const [description, setDescription] = useState("");
  const [workDate, setWorkDate] = useState("");
  const [format, setFormat] = useState("hours"); // El formato será "hours" o "material"
  const [clients, setClients] = useState<any[]>([]); // Lista de clientes
  const [projects, setProjects] = useState<any[]>([]); // Lista de proyectos
  const [errorMessage, setErrorMessage] = useState("");
  const [existingNote, setExistingNote] = useState<any>(null); // Estado para almacenar los datos del albarán
  const router = useRouter();
  const { id } = router.query; // Obtener el ID del albarán desde la URL

  useEffect(() => {
    // Obtener los clientes y proyectos desde la API
    const fetchClientsAndProjects = async () => {
      try {
        const [clientsResponse, projectsResponse] = await Promise.all([
          apiClient.get("/api/client"),
          apiClient.get("/api/project"),
        ]);
        setClients(clientsResponse.data);
        setProjects(projectsResponse.data);
      } catch (error) {
        console.error("Error al obtener los clientes o proyectos:", error);
      }
    };

    // Obtener los datos del albarán para la edición
    const fetchDeliveryNote = async () => {
      if (id) {
        try {
          const response = await apiClient.get(`/api/deliverynote/${id}`);
          setExistingNote(response.data);
          setSelectedClientId(response.data.clientId);
          setSelectedProjectId(response.data.projectId);
          setHours(response.data.hours);
          setMaterial(response.data.material || "");
          setDescription(response.data.description);
          setWorkDate(response.data.workdate);
          setFormat(response.data.format); // Asegúrate de que el formato esté presente
        } catch (error) {
          console.error("Error al obtener el albarán:", error);
        }
      }
    };

    fetchClientsAndProjects();
    fetchDeliveryNote();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedClientId || !selectedProjectId || !hours || !description || !workDate) {
      setErrorMessage("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await apiClient.put(`/api/deliverynote/${id}`, {
        clientId: selectedClientId,
        projectId: selectedProjectId,
        format,
        material,
        hours,
        description,
        workdate: workDate,
      });

      router.push("/deliverynotes"); // Redirigir al listado de albaranes
      console.log("Albarán modificado:", response.data);
    } catch (error) {
      setErrorMessage("Error al modificar el albarán.");
      console.error("Error:", error);
    }
  };

  if (!existingNote) {
    return <p>Cargando...</p>; // Espera hasta que los datos del albarán estén disponibles
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Modificar Albarán</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label>Selecciona el Cliente</label>
          <select
            value={selectedClientId}
            onChange={(e) => setSelectedClientId(e.target.value)}
            required
          >
            <option value="">Selecciona un cliente</option>
            {clients.map((client) => (
              <option key={client._id} value={client._id}>
                {client.name} - {client._id}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Selecciona el Proyecto</label>
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            required
          >
            <option value="">Selecciona un proyecto</option>
            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.name} - {project._id}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Formato</label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            required
          >
            <option value="hours">Horas</option>
            <option value="material">Material</option>
          </select>
        </div>

        {format === "hours" ? (
          <div>
            <label>Horas</label>
            <input
              type="number"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              required
            />
          </div>
        ) : (
          <div>
            <label>Material</label>
            <input
              type="text"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              required
            />
          </div>
        )}

        <div>
          <label>Descripción</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Fecha de trabajo</label>
          <input
            type="date"
            value={workDate}
            onChange={(e) => setWorkDate(e.target.value)}
            required
          />
        </div>

        {errorMessage && <p className={styles.error}>{errorMessage}</p>}

        <button type="submit" className={styles.createButton}>
          Modificar Albarán
        </button>
      </form>

      <div className={styles.buttonContainer}>
        <button
          className={styles.cancelButton}
          onClick={() => router.push("/deliverynotes")}
        >
          Volver al listado
        </button>
      </div>
    </div>
  );
}
