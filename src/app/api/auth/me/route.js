import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
    const token = req.cookies.get('token')?.value;

    if (!token) {
        return new Response(JSON.stringify({ error: 'Token no encontrado' }), { status: 401 });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
        });

        if (!user) {
            return new Response(JSON.stringify({ error: 'Usuario no encontrado' }), { status: 404 });
        }
        console.log(user);
        return new Response(JSON.stringify({ id: user.id, userName: user.userName }), { status: 200 });
    } catch (error) {
        console.error('Error al verificar el token:', error);
        return new Response(JSON.stringify({ error: 'Token inválido' }), { status: 401 });
    }
}
