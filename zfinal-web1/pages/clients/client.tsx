import { useEffect, useState } from "react";
import Link from "next/link";
import apiClient from "@utils/apiClient"; // Asegúrate de que esta ruta sea correcta
import { AxiosError } from "axios"; // Importamos AxiosError para manejar el tipo de error
import styles from "../styles/Client.module.css"; // Asegúrate de que este archivo exista

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
}

export default function ClientList() {
  const [clients, setClients] = useState<Client[]>([]);

  // Función para obtener la lista de clientes desde la API
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await apiClient.get("/api/client"); // Ajusta la URL si es necesario
        setClients(response.data);
      } catch (error: unknown) {
        if (error instanceof AxiosError) {  // Comprobamos si el error es de tipo AxiosError
          console.error("Error al obtener los clientes:", error.response?.data || error.message);
        } else {
          console.error("Error desconocido:", error);
        }
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
              <p>CIF: {client.cif}</p>
              <p>Dirección: {client.address.street}, {client.address.number}, {client.address.city}, {client.address.province}</p>
              <p>Postal: {client.address.postal}</p>
              <Link href={`/client/${client._id}`}>
                <a className={styles.link}>Ver Detalles</a>
              </Link>
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