import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});


api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.log('Sesión expirada. Redirigiendo al login...');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
