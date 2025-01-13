import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import apiClient from "@utils/apiClient";
import styles from "../../styles/CreateProject.module.css"; // Usamos el nuevo CSS

export default function CreateDeliveryNote() {
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
  const router = useRouter();
  const { from } = router.query; // Capturamos el parámetro de la URL

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
    fetchClientsAndProjects();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar que todos los campos necesarios estén completos
    if (!selectedClientId || !selectedProjectId || !hours || !description || !workDate) {
      setErrorMessage("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await apiClient.post("/api/deliverynote", {
        clientId: selectedClientId,
        projectId: selectedProjectId,
        format,
        material,
        hours,
        description,
        workdate: workDate,
      });

      // Redirigir al listado de albaranes después de crear el albarán
      if (from === "projects") {
        router.push("/projects"); // Si venimos desde proyectos, redirigimos a proyectos
      } else {
        router.push("/deliverynotes"); // Si venimos desde albaranes, redirigimos a albaranes
      }

      console.log("Albarán creado:", response.data);
    } catch (error) {
      setErrorMessage("Error al crear el albarán.");
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Crear Albarán</h1>
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
          Crear Albarán
        </button>
      </form>

      <div className={styles.buttonContainer}>
        <button
          className={styles.cancelButton}
          onClick={() => {
            if (from === "projects") {
              router.push("/projects"); // Volver a proyectos
            } else {
              router.push("/deliverynotes"); // Volver a albaranes
            }
          }}
        >
          Volver al listado
        </button>
      </div>
    </div>
  );
}
