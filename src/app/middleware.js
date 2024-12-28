import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req) {
    const token = req.cookies.get('token')?.value;

    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url)); // Redirige si no hay token
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET);
        return NextResponse.next();
    } catch (error) {
        console.error('JWT inválido:', error);
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
    matcher: ['/protected-route/:path*'],
};
