"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function PostLayout({ children }) {
    const pathname = usePathname();

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
            </nav>
            <main className="p-6">{children}</main>
        </div>
    );
}
