import React from 'react';

const TwoFactorForm = ({ user, code, setCode, onSubmit,message }) => {
    return (
        <div className="max-w-md mx-auto p-6 bg-black rounded-lg text-white">
            <h3 className="text-2xl font-bold text-center mb-6">Verificación en dos pasos</h3>
            <form onSubmit={onSubmit} className="space-y-4">
                <div className="mb-4">
                    <label htmlFor="code" className="block text-sm font-medium text-gray-300">
                        Código 2FA
                    </label>
                    <input
                        type="text"
                        id="code"
                        value={code}
                        className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                        onChange={(e) => setCode(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-violet-500 text-white py-2 rounded-md hover:bg-violet-600 transition duration-300"
                >
                    Verificar
                </button>
            </form>
            {message?.text && (
                <p
                    className={`text-sm text-center mt-4 ${
                        message.isError ? "text-red-500" : "text-gray-400"
                    }`}
                >
                    {message.text}
                </p>
            )}
        </div>
    );
};

export default TwoFactorForm;
