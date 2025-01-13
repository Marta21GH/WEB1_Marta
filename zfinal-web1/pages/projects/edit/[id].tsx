import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import apiClient from "@utils/apiClient";
import styles from "../../../styles/CreateProject.module.css"; // Asegúrate de que la ruta del CSS es correcta

export default function EditProject() {
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
  const [projectCode, setProjectCode] = useState("");
  const [status, setStatus] = useState("En estudio");
  const [errorMessage, setErrorMessage] = useState("");
  const [project, setProject] = useState<any>(null); // Estado para almacenar el proyecto
  const router = useRouter();
  const { id } = router.query; // Obtener el ID del proyecto desde la URL

  useEffect(() => {
    if (id) {
      const fetchProjectData = async () => {
        try {
          const response = await apiClient.get(`/api/project/${id}`);
          const project = response.data;

          // Verificamos que la respuesta contiene los datos y asignamos a los estados
          console.log("Datos del proyecto:", project);
          
          if (project) {
            setProject(project); // Guardamos todo el proyecto para verificar si la data llega bien
            setName(project.name || ""); 
            setEmail(project.email || "");
            setAddress(project.address || { street: "", number: "", postal: "", city: "", province: "" });
            setClientId(project.clientId || "");
            setProjectCode(project.projectCode || "");
            setStatus(project.status || "En estudio");
          }
        } catch (error) {
          console.error("Error al obtener los datos del proyecto:", error);
        }
      };

      fetchProjectData();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientId) {
      setErrorMessage("El cliente es obligatorio.");
      return;
    }

    try {
      await apiClient.put(`/api/project/${id}`, {
        name,
        projectCode,
        email,
        address,
        clientId,
        status,
      });
      router.push("/projects");
    } catch (error) {
      setErrorMessage("Error al modificar el proyecto.");
      console.error(error);
    }
  };

  // Asegurándonos de que el proyecto se ha cargado correctamente antes de renderizar el formulario
  if (!project) {
    return <div>Cargando proyecto...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Modificar Proyecto</h1>
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
          <label>Código del Proyecto</label>
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
            {/* Asegúrate de que esta lista de clientes se carga correctamente */}
            {/* clients.map((client) => ( */}
            {/*   <option key={client._id} value={client._id}> */}
            {/*     {client.name} - {client._id} */}
            {/*   </option> */}
            {/* ))} */}
          </select>
        </div>

        {errorMessage && <p className={styles.error}>{errorMessage}</p>}

        <button type="submit" className={styles.createButton}>
          Modificar Proyecto
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
