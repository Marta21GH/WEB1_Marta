import { useState, useEffect } from "react";
import apiClient from "@utils/apiClient"; // Asegúrate de que esta ruta sea correcta
import styles from "../../styles/Clients.module.css"; // Usamos el mismo estilo que para clientes

import Link from "next/link"; // Importa el componente Link

interface DeliveryNote {
  _id: string;
  clientId: {
    name: string; // Asegúrate de que la propiedad 'name' existe en 'clientId'
  };
  projectId: string;
  description: string;
  hours: number;
  workdate: string;
}

export default function DeliveryNoteList() {
  const [deliveryNotes, setDeliveryNotes] = useState<DeliveryNote[]>([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false); // Estado para el pop-up de confirmación
  const [deleteId, setDeleteId] = useState<string | null>(null); // ID del albarán a eliminar

  useEffect(() => {
    const fetchDeliveryNotes = async () => {
      try {
        const response = await apiClient.get("/api/deliverynote");
        console.log("Albaranes recuperados:", response.data);
        setDeliveryNotes(response.data);
      } catch (error) {
        console.error("Error al obtener los albaranes:", error);
      }
    };

    fetchDeliveryNotes();
  }, []);

  const handleDeleteClick = (id: string) => {
    setDeleteId(id); // Guardamos el ID del albarán a eliminar
    setShowDeletePopup(true); // Mostramos el pop-up de confirmación
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await apiClient.delete(`/api/deliverynote/${deleteId}`);
        setDeliveryNotes(deliveryNotes.filter((note) => note._id !== deleteId)); // Eliminar del estado local
        setShowDeletePopup(false); // Cerrar el pop-up después de la eliminación
      } catch (error) {
        console.error("Error al eliminar el albarán:", error);
      }
    }
  };

  const closeDeletePopup = () => {
    setShowDeletePopup(false);
    setDeleteId(null); // Limpiamos el ID
  };

  const handleCreatePDF = async (id: string) => {
    try {
      const response = await apiClient.get(`/api/deliverynote/pdf/${id}`, {
        responseType: "blob", // Asegura que la respuesta sea un archivo
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `albaran_${id}.pdf`); // Nombre del archivo
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error al crear el PDF:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Listado de Albaranes</h1>
      <div className={styles.list}>
        {deliveryNotes.length > 0 ? (
          deliveryNotes.map((note) => (
            <div key={note._id} className={styles.clientCard}>
              <h2>Albarán para: {note.clientId.name}</h2>
              <p><strong>Descripción:</strong> {note.description}</p>
              <p><strong>Horas:</strong> {note.hours}</p>
              <p><strong>Fecha de trabajo:</strong> {note.workdate}</p>
              <div className={styles.detailsButtonContainer}>
                <Link href={`/deliverynotes/edit/${note._id}`}>
                  <button className={styles.modifyButton}>Modificar</button>
                </Link>
                <button
                  className={styles.createBillButton}
                  onClick={() => handleCreatePDF(note._id)}
                >
                  Crear PDF
                </button>
                <button className={styles.deleteButton} onClick={() => handleDeleteClick(note._id)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay albaranes registrados.</p>
        )}
      </div>

      <div className={styles.buttonContainer}>
        <Link href="/dashboard">
          <button className={styles.navButton}>Volver al Menú</button>
        </Link>
        <Link href="/deliverynotes/create">
          <button className={styles.button}>Crear Nuevo Albarán</button>
        </Link>
      </div>

      {/* Pop-up de confirmación para Eliminar */}
      {showDeletePopup && (
        <div className={styles.deletePopup}>
          <div className={styles.popupContent}>
            <h3>¿Estás seguro de que deseas eliminar este albarán?</h3>
            <button className={`${styles.button} ${styles.deleteButton}`} onClick={handleDelete}>
              Sí, Eliminar
            </button>
            <button className={`${styles.button} ${styles.cancelButton}`} onClick={closeDeletePopup}>
              No, Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
