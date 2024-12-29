import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const registerUser = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            const { data, status } = error.response;
            throw {
                message: data.error || 'Error desconocido',
                status,
            };
        }
        
        throw new Error('Error de conexión al servidor');
    }
};

export const logoutUser = async () => {
    try {
        const response = await axios.post(`${API_URL}/auth/logout`, {}, {
            withCredentials: true, // Asegura el envío de cookies
        });

        console.log('Sesión cerrada exitosamente:', response.data.message);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error al cerrar la sesión:', error.response.data.message);
            throw new Error(error.response.data.message || 'Error desconocido');
        } else if (error.request) {
            console.error('No se pudo contactar con el servidor');
            throw new Error('Error de conexión con el servidor');
        } else {
            console.error('Error al configurar la solicitud:', error.message);
            throw new Error('Error desconocido al cerrar la sesión');
        }
    }
};

export async function loginUser(userName, password) {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, {
            userName,
            password
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true 
        });

        console.log('Inicio de sesión exitoso:', response.data.message);
        
        return response.data;

    } catch (error) {
        if (error.response) {
            console.log('Error de servidor:', error.response.data.error);
        } else if (error.request) {
            console.log('No se pudo contactar con el servidor');
        } else {
            console.log('Error al configurar la solicitud');
        }
    }
}

export async function verifyTwoFactorCode(userName, code) {
    try {
        const response = await axios.post(`${API_URL}/auth/verify-2fa`, {
            userName,
            code
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true 
        });

        
        return response.data;

    } catch (error) {
        if (error.response) {
            console.log('Error al verificar el código 2FA:', error.response.data.error);
            return { message: 'Código 2FA inválido' };
        } else if (error.request) {
            console.log('No se pudo contactar con el servidor');
            return { message: 'Error de conexión con el servidor' };
        } else {
            console.log('Error al configurar la solicitud 2FA:', error.message);
            return { message: 'Error desconocido al verificar 2FA' };
        }
    }
}
