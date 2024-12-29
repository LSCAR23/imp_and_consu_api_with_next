"use client";

import { useState, useEffect } from "react";

export default function useUser() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchUser = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await fetch("/api/auth/me", {
                    method: "GET",
                    credentials: "include", // Incluye las cookies en la solicitud.
                });

                if (res.ok) {
                    const data = await res.json();
                    if (isMounted) setUser(data);
                } else {
                    const errorData = await res.json();
                    if (isMounted) setError(errorData.error || "Error al obtener el usuario");
                }
            } catch (error) {
                if (isMounted) setError("Error de red o del servidor");
                console.error("Error al obtener los datos del usuario:", error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchUser();

        return () => {
            isMounted = false;
        };
    }, []);

    return { user, loading, error };
}
