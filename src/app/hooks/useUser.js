"use client";

import { useState, useEffect } from 'react';

export default function useUser() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('/api/auth/me', {
                    method: 'GET',
                    credentials: 'include', // Incluye las cookies en la solicitud
                });

                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                }
            } catch (error) {
                console.error('Error al obtener los datos del usuario:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { user, loading };
}
