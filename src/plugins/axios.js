import axios from 'axios';
// import { jwtDecode } from 'jwt-decode'
import app from '../main.js'
const axiosInstance = axios.create({
  // baseURL: 'https://contact-center-api.red5g.com',
  baseURL: import.meta.env.VITE_BACK_URL
  // Aquí puedes añadir más configuraciones como headers por defecto
});

// // Función para verificar si el token ha expirado
// function isTokenExpired(token) {

// }

// Interceptor de las peticiones, para validacion de permisos de acceso
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('authToken')
    if (config.url == '/auth/login') return config;
    if (app.config.globalProperties.$globalMethods.isTokenExpired(token)) {
      window.location.href = '/'
      return Promise.reject("The token expired.")
    }

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor de respuestas (opcional, manejo de errores 401)
// axiosInstance.interceptors.response.use(
//   (response) => response, // Respuestas exitosas
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       // Opcional: Redirigir al usuario
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );
export default axiosInstance;