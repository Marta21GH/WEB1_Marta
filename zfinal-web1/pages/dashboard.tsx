import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import apiClient from "@utils/apiClient"; // Asegúrate de que esta ruta sea correcta
import { AxiosError } from "axios"; // Importamos AxiosError para manejar el tipo de error
import styles from "../styles/Dashboard.module.css"; // Asegúrate de que el archivo CSS exista

export default function Dashboard() {
  const [userName, setUserName] = useState(""); // Estado para el nombre del usuario
  const router = useRouter();

  // Estado para el formulario de cliente
  const [client, setClient] = useState({
    name: "",
    cif: "",
    address: {
      street: "",
      number: 0,
      postal: 0,
      city: "",
      province: "",
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    const storedName = localStorage.getItem("userName");

    if (!token) {
      router.push("/auth/login");
    } else {
      setUserName(storedName || "Usuario");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userName");
    router.push("/auth/login");
  };

  // Función para manejar los cambios en el formulario de cliente
  const handleClientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "street" || name === "number" || name === "postal" || name === "city" || name === "province") {
      setClient((prevClient) => ({
        ...prevClient,
        address: {
          ...prevClient.address,
          [name]: value,
        },
      }));
    } else {
      setClient((prevClient) => ({
        ...prevClient,
        [name]: value,
      }));
    }
  };

  // Función para crear un nuevo cliente
  const createClient = async () => {
    try {
      const response = await apiClient.post("/api/client", client); // Cambié /api/clients por /api/client
      alert(`Cliente creado con ID: ${response.data._id}`);

      // Limpiar los campos del formulario
      setClient({
        name: "",
        cif: "",
        address: {
          street: "",
          number: 0,
          postal: 0,
          city: "",
          province: "",
        },
      });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error("Error al crear el cliente:", error.response?.data || error.message);
        alert("Error al crear el cliente. Por favor, revisa los datos.");
      } else {
        console.error("Error desconocido:", error);
        alert("Ha ocurrido un error inesperado.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.welcome}>Bienvenido!</h1>
        <nav className={styles.nav}>
          <Link href="/clients">
            <button className={styles.navButton}>Listado de Clientes</button>
          </Link>
          <Link href="/projects">
            <button className={styles.navButton}>Proyectos</button>
          </Link>
          <Link href="/deliverynotes">
            <button className={styles.navButton}>Albaranes</button>
          </Link>
        </nav>
      </header>

      <div className={styles.body}>
        {/* Formulario para crear cliente */}
        <div className={styles.box}>
          <h2>Crear Cliente</h2>
          <form>
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              value={client.name}
              onChange={handleClientChange}
            />
            <input
              type="text"
              name="cif"
              placeholder="CIF"
              value={client.cif}
              onChange={handleClientChange}
            />
            <input
              type="text"
              name="street"
              placeholder="Calle"
              value={client.address.street}
              onChange={handleClientChange}
            />
            <input
              type="number"
              name="number"
              placeholder="Número"
              value={client.address.number}
              onChange={handleClientChange}
            />
            <input
              type="text"
              name="postal"
              placeholder="Código Postal"
              value={client.address.postal}
              onChange={handleClientChange}
            />
            <input
              type="text"
              name="city"
              placeholder="Ciudad"
              value={client.address.city}
              onChange={handleClientChange}
            />
            <input
              type="text"
              name="province"
              placeholder="Provincia"
              value={client.address.province}
              onChange={handleClientChange}
            />
            <button type="button" className={styles.greenButton} onClick={createClient}>
              Crear Cliente
            </button>
          </form>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
