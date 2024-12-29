'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { logoutUser } from '@/lib/clientAPI_auth';

export default function PostLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logoutUser();
            console.log('Sesión cerrada exitosamente');
            router.push('/');
        } catch (error) {
            console.error('Error al cerrar sesión:', error.message);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="bg-black py-4 px-6 flex justify-center shadow-sm shadow-violet-500">
                <div className="flex flex-grow justify-around">
                    <Link href="/posts" legacyBehavior>
                        <a className={`text-xl font-bold transition duration-300 ${pathname === '/posts' ? 'text-violet-500' : 'hover:text-violet-400'}`}>
                            Mis Publicaciones
                        </a>
                    </Link>
                    <Link href="/general" legacyBehavior>
                        <a className={`text-xl font-bold transition duration-300 ${pathname === '/general' ? 'text-violet-500' : 'hover:text-violet-400'}`}>
                            General
                        </a>
                    </Link>
                </div>
                <button
                    onClick={handleLogout}
                    className="ml-6 px-4 py-2 bg-violet-500 text-white rounded-md hover:bg-violet-600 transition duration-300"
                >
                    Cerrar Sesión
                </button>
            </nav>
            <main className="p-6">{children}</main>
        </div>
    );
}
