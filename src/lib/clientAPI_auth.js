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
        throw error.response ? error.response.data : new Error('Error al registrar el usuario');
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
            console.error('Error de servidor:', error.response.data.error);
            alert(error.response.data.error);
        } else if (error.request) {
            console.error('No se pudo contactar con el servidor');
            alert('No se pudo contactar con el servidor');
        } else {
            console.error('Error al configurar la solicitud:', error.message);
            alert('Error al configurar la solicitud');
        }
    }
}

export async function verifyTwoFactorCode(userName, code) {
    try {
        const response = await axios.post('/api/auth/verify-2fa', {
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
            console.error('Error al verificar el código 2FA:', error.response.data.error);
            return { message: 'Código 2FA inválido' };
        } else if (error.request) {
            console.error('No se pudo contactar con el servidor');
            return { message: 'Error de conexión con el servidor' };
        } else {
            console.error('Error al configurar la solicitud 2FA:', error.message);
            return { message: 'Error desconocido al verificar 2FA' };
        }
    }
}
