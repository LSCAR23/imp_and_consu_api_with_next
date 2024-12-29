import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';


const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req) {
    const token = req.cookies.get('token')?.value; 

    if (!token) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    try {
        await jwtVerify(token, secret);
        return NextResponse.next();
    } catch (error) {
        console.error('Error al verificar el JWT:', error);
        return NextResponse.redirect(new URL('/', req.url));
    }
}

export const config = {
    matcher: ['/posts/:path*'],
};
