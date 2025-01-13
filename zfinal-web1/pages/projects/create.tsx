import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import apiClient from "@utils/apiClient";
import styles from "../../styles/CreateProject.module.css"; // Usamos el nuevo CSS

export default function CreateProject() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState({
    street: "",
    number: "",
    postal: "",
    city: "",
    province: "",
  });
  const [clientId, setClientId] = useState("");
  const [clients, setClients] = useState<any[]>([]); // Lista de clientes
  const [errorMessage, setErrorMessage] = useState("");
  const [projectCode, setProjectCode] = useState(""); // Inicializamos el estado para el código del proyecto
  const [status, setStatus] = useState("En estudio"); // Establecemos el estado inicial del proyecto
  const router = useRouter();

  useEffect(() => {
    const { id } = router.query;
    // Si estamos editando un proyecto
    if (id) {
      const fetchProjectData = async () => {
        try {
          const response = await apiClient.get(`/api/project/${id}`);
          const project = response.data;

          setName(project.name);
          setEmail(project.email);
          setAddress(project.address || { street: "", number: "", postal: "", city: "", province: "" });
          setClientId(project.clientId);
          setProjectCode(project.projectCode); // Suponiendo que el código del proyecto no cambia
          setStatus(project.notes || "En estudio"); // Guardamos el estado como 'notes'
        } catch (error) {
          console.error("Error al obtener los datos del proyecto:", error);
        }
      };
      fetchProjectData();
    } else {
      // Generar un código de proyecto único si estamos creando un nuevo proyecto
      const generateProjectCode = () => {
        const date = new Date();
        const code = `P-${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${Math.floor(
          Math.random() * 1000
        )}`;
        setProjectCode(code);
      };
      generateProjectCode();
    }

    // Obtener lista de clientes
    const fetchClients = async () => {
      try {
        const response = await apiClient.get("/api/client");
        setClients(response.data);
      } catch (error) {
        console.error("Error al obtener los clientes:", error);
      }
    };
    fetchClients();
  }, [router.query]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientId) {
      setErrorMessage("El cliente es obligatorio.");
      return;
    }

    try {
      if (router.query.id) {
        // Si existe ID, actualizamos el proyecto
        await apiClient.put(`/api/project/${router.query.id}`, {
          name,
          projectCode,
          email,
          address,
          clientId,
          status,
        });
      } else {
        // Si no hay ID, creamos un nuevo proyecto
        await apiClient.post("/api/project", {
          name,
          projectCode,
          email,
          address,
          clientId,
          status,
        });
      }
      router.push("/projects"); // Redirige al listado de proyectos
    } catch (error) {
      setErrorMessage("Error al crear o modificar el proyecto.");
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Crear Proyecto</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label>Nombre del Proyecto</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Código del Proyecto (Generado Automáticamente)</label>
          <input
            type="text"
            value={projectCode}
            readOnly
            disabled
          />
        </div>
        <div>
          <label>Correo Electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Dirección del Proyecto</label>
          <input
            type="text"
            placeholder="Calle"
            value={address.street}
            onChange={(e) => setAddress({ ...address, street: e.target.value })}
            required
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Número"
            value={address.number}
            onChange={(e) => setAddress({ ...address, number: e.target.value })}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Código Postal"
            value={address.postal}
            onChange={(e) => setAddress({ ...address, postal: e.target.value })}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Ciudad"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Provincia"
            value={address.province}
            onChange={(e) => setAddress({ ...address, province: e.target.value })}
            required
          />
        </div>

        <div>
          <label>Selecciona el Cliente</label>
          <select
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
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

        {errorMessage && <p className={styles.error}>{errorMessage}</p>}

        <button type="submit" className={styles.createButton}>
          Crear Proyecto
        </button>
      </form>

      <div className={styles.buttonContainer}>
        <button
          className={styles.cancelButton}
          onClick={() => router.push("/projects")}>
          Volver al listado
        </button>
      </div>
    </div>
  );
}