
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
    },

    convertToUTC6(utcDate, keepTime) {
        try {
            if (keepTime == true) {
                
                const dateConvert = new Date(utcDate); // Parse the UTC date string
                const utcMinus6Date = new Date(dateConvert.getTime() - 6 * 60 * 60 * 1000); // Subtract 6 hours
    
                return utcMinus6Date.toISOString(); // Return ISO string or format as needed
            }else{
                const dateConvert = new Date(utcDate); // Parse the UTC date string
                const utcMinus6Date = new Date(dateConvert.getTime() - 6 * 60 * 60 * 1000); // Subtract 6 hours
                const year = utcMinus6Date.getFullYear();
                const month = String(utcMinus6Date.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
                const day = String(utcMinus6Date.getDate()).padStart(2, '0');

                return `${year}-${month}-${day}`;
            }
            // return exp < currentTime; // Retorna true si el token ha expirado
        } catch (error) {
            console.error('Error converting date:', error);
            return true;
        }
    }

}