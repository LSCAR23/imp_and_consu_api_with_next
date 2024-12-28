"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser, verifyTwoFactorCode } from "@/lib/clientAPI_auth";
import TwoFactorForm from './TwoFactorForm';

export default function LoginForm() {
    const [formData, setFormData] = useState({ userName: '', password: '' });
    const [message, setMessage] = useState({ text: null, isError: false });
    const router = useRouter();
    const [show2FA, setShow2FA] = useState(false);
    const [user, setUser] = useState(null);
    const [code, setCode] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await loginUser(formData.userName, formData.password);

            if (data && data.message === 'Inicio de sesión exitoso') {
                setUser(formData);
                setShow2FA(true);
                setMessage({ text: null, isError: false }); // Limpia mensajes previos
            } else {
                setMessage({ text: 'Error al iniciar sesión. Verifica tus credenciales.', isError: true });
            }
        } catch (error) {
            setMessage({ text: error.message || 'Error al iniciar sesión.', isError: true });
        }
    };

    const handle2FASubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await verifyTwoFactorCode(user.userName, code);

            if (response && response.message === 'Verificación exitosa') {
                router.push('/posts');
                setMessage({ text: null, isError: false }); 
            } else {
                setMessage({ text: 'Código 2FA inválido.', isError: true });
            }
        } catch (error) {
            setMessage({ text: error.message || 'Error al verificar el código 2FA.', isError: true });
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-black rounded-lg border-violet-500 shadow-md shadow-violet-500 text-white">
            {!show2FA ? (
                <div>
                    <h1 className="text-3xl font-bold text-center mb-6">Iniciar Sesión</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="userName" className="block text-sm font-medium text-gray-300">
                                Nombre de Usuario
                            </label>
                            <input
                                id="userName"
                                name="userName"
                                type="text"
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
                                required
                                className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                                onChange={handleChange}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-violet-500 text-white py-2 rounded-md hover:bg-violet-600 transition duration-300"
                        >
                            Iniciar Sesión
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
                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-400">
                            ¿No tienes una cuenta?
                            <button
                                onClick={() => router.push('/register')}
                                className="text-violet-500 hover:underline ml-1"
                            >
                                Regístrate
                            </button>
                        </p>
                    </div>
                </div>
            ) : (
                <TwoFactorForm
                    user={user}
                    code={code}
                    setCode={setCode}
                    onSubmit={handle2FASubmit}
                    message={message}
                />
            )}
        </div>
    );
}
