import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import apiClient from "@/utils/apiClient";

interface Provider {
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
  createdAt: string;
  updatedAt: string;
}

const ProviderDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchProvider = async () => {
      try {
        const response = await apiClient.get(`/api/client/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });

        // Filtrar para asegurarse de que es un proveedor
        const fetchedProvider = response.data;
        if (fetchedProvider.name.startsWith("PROVIDER_")) {
          setProvider(fetchedProvider);
        } else {
          setMessage("No se encontró un proveedor con este ID.");
        }
      } catch (error) {
        console.error("Error al obtener proveedor:", error);
        setMessage("Error al obtener proveedor.");
      } finally {
        setLoading(false);
      }
    };

    fetchProvider();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("¿Estás seguro de eliminar este proveedor?")) return;

    try {
      await apiClient.delete(`/api/client/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      alert("Proveedor eliminado exitosamente.");
      router.push("/providers");
    } catch (error) {
      console.error("Error al eliminar proveedor:", error);
      setMessage("Error al eliminar proveedor.");
    }
  };

  if (loading) return <p>Cargando proveedor...</p>;
  if (!provider) return <p>{message || "Proveedor no encontrado."}</p>;

  return (
    <div style={styles.container}>
      <h1>Proveedor: {provider.name.replace("PROVIDER_", "")}</h1>
      <p>CIF: {provider.cif}</p>
      <p>
        Dirección: {provider.address.street}, {provider.address.number},{" "}
        {provider.address.postal}, {provider.address.city},{" "}
        {provider.address.province}
      </p>
      <p>Creado el: {new Date(provider.createdAt).toLocaleString()}</p>
      <p>Última actualización: {new Date(provider.updatedAt).toLocaleString()}</p>
      <button style={styles.deleteButton} onClick={handleDelete}>Eliminar Proveedor</button>
      <button style={styles.backButton} onClick={() => router.push("/providers")}>Volver a la Lista</button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    fontFamily: "Arial, sans-serif",
  },
  deleteButton: {
    backgroundColor: "#e63946",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  backButton: {
    backgroundColor: "#0070f3",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
    marginLeft: "10px",
  },
};

export default ProviderDetail;
