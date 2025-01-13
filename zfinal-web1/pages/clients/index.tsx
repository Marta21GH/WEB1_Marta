import { useEffect, useState } from "react";
import apiClient from "@utils/apiClient"; // Asegúrate de que esta ruta sea correcta
import styles from "../../styles/Clients.module.css"; // Estilo que crearemos más abajo
import Link from "next/link"; // Importa el componente Link

interface Client {
  _id: string; // El ID que se genera automáticamente para cada cliente
  name: string;
  address: {
    street: string;
    number: number;
    postal: number;
    city: string;
    province: string;
  };
  email: string;
  phone: string;
  createdAt: string; // Fecha de creación
  activeProjects: number; // Proyectos activos asociados
  pendingDeliveryNotes: number; // Albaranes pendientes asociados
}

export default function ClientList() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await apiClient.get("/api/client"); // Obtener lista de clientes
        console.log("Clientes recuperados:", response.data); // Verifica los datos en la consola
        setClients(response.data);
      } catch (error) {
        console.error("Error al obtener la lista de clientes:", error);
      }
    };

    fetchClients();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Listado de Clientes</h1>
      <div className={styles.list}>
        {clients.length > 0 ? (
          clients.map((client) => (
            <div key={client._id} className={styles.clientCard}>
              <h2>{client.name}</h2>
              <p><strong>ID:</strong> {client._id}</p>
              <p><strong>Dirección:</strong> {client.address.street}, {client.address.number}, {client.address.city}, {client.address.province} - {client.address.postal}</p>
              <p><strong>Fecha de Creación:</strong> {new Date(client.createdAt).toLocaleDateString()}</p>
              <p><strong>Proyectos Activos:</strong> {client.activeProjects}</p>
              <p><strong>Albaranes Pendientes:</strong> {client.pendingDeliveryNotes}</p>
              <div className={styles.detailsButtonContainer}>
                <Link href={`/clients/${client._id}`}>
                  <button className={styles.detailsButton}>Detalles</button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No hay clientes registrados.</p>
        )}
      </div>
      <div className={styles.buttonContainer}>
        <Link href="/dashboard">
          <button className={styles.button}>Volver al Menú</button>
        </Link>
      </div>
    </div>
  );
}
