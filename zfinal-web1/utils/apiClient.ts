import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://bildy-rpmaya.koyeb.app',  // Usa tu URL base de la API
  headers: {
    'Content-Type': 'application/json',
  },
});

// Añadir el token en los headers si está disponible
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt'); // Recupera el token JWT almacenado
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // Agrega el token a los headers
  }
  return config;
});

export default apiClient;
