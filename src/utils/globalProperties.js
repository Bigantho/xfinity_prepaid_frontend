
// export function registerGlobalProperties(app) {
//     console.log("apppp", app);

//     app.config.globalProperties.canNext = async function (to, from, next) {
//         const permit = [
//             'dashboard'
//         ]

//         // if (!ruta.name) return false;

//         // Verifica si la ruta esta definida en las rutas permitidas local
//         if (permit.some((row) => row.toLocaleLowerCase() === ruta.name.toLowerCase())) return true
//     }
// }
import { jwtDecode } from "jwt-decode";
export default {
    canNext(ruta) {
        const permit = [
            'login',
            'message',
            'forbidden',
            'dashboard',
            'messageSent', 
            'restrictedNumbers',
            'logQueries'
        ]

        if (!ruta.name) return false;

        // Verifica si la ruta esta definida en las rutas permitidas local
        if (permit.some((row) => row.toLocaleLowerCase() === ruta.name.toLowerCase())) return true
    },

    isTokenExpired(token) {        
        if (!token) return true;
        try {
            const { exp } = jwtDecode(token); // Decodificar el token y obtener el tiempo de expiración
            const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
            return exp < currentTime; // Retorna true si el token ha expirado
        } catch (error) {
            console.error('Error decoding token:', error);
            return true;
        }
    }

}