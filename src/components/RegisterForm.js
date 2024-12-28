"use client";
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { registerUser } from '@/lib/clientAPI_auth';

export default function RegisterForm() {
    const [formData, setFormData] = useState({ email: '', userName: '', password: '' });
    const [qrCode, setQrCode] = useState(null);
    const [message, setMessage] = useState({ text: null, isError: false });
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const redirectToLogin = () => {
        router.push('./');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await registerUser(formData);
            if (data.qrCode) {
                setQrCode(data.qrCode);
                setMessage({ text: 'Registro exitoso. Escanea el código QR para habilitar 2FA.', isError: false });
                setFormData({ email: '', userName: '', password: '' });
            } else {
                setMessage({ text: 'Registro exitoso, pero no se recibió el código QR.', isError: false });
            }
        } catch (error) {
            setMessage({ text: error.message || 'Error al registrar.', isError: true });
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-black rounded-lg border-violet-500 shadow-md shadow-violet-500 text-white">
            <h1 className="text-3xl font-bold text-center mb-6">Registro</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                        Correo
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Correo"
                        required
                        className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="userName" className="block text-sm font-medium text-gray-300">
                        Nombre de usuario
                    </label>
                    <input
                        id="userName"
                        name="userName"
                        type="text"
                        placeholder="Nombre de usuario"
                        required
                        className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                        Contraseña
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Contraseña"
                        required
                        className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                        onChange={handleChange}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-violet-500 text-white py-2 rounded-md hover:bg-violet-600 transition duration-300"
                >
                    Registrarse
                </button>
            </form>
            {message.text && (
                <p
                    className={`text-sm text-center mt-4 ${
                        message.isError ? 'text-red-500' : 'text-gray-400'
                    }`}
                >
                    {message.text}
                </p>
            )}
            {qrCode && (
                <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-lg flex justify-center items-center z-50">
                    <div className="bg-gray-800 p-6 rounded-lg text-center shadow-lg shadow-violet-500 max-w-sm w-full">
                        <h2 className="text-xl font-semibold mb-4 text-white">Escanea el código QR</h2>
                        <img src={qrCode} alt="Código QR para 2FA" className="mx-auto mb-4" />
                        <button
                            onClick={redirectToLogin}
                            className="mt-4 bg-violet-500 text-white py-2 px-4 rounded-lg hover:bg-violet-600 transition duration-300"
                        >
                            Ir al Login
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
