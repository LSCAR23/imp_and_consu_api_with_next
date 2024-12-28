import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { userName, password } = await req.json();
        console.log(userName);
        console.log(password);
        const user = await prisma.user.findUnique({
            where: { userName },
        });

        if (!user) {
            return new Response(JSON.stringify({ error: 'Usuario no encontrado' }), { status: 404 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return new Response(JSON.stringify({ error: 'Contraseña incorrecta' }), { status: 401 });
        }

        const token = jwt.sign(
            { id: user.id, userName: user.userName },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        return new Response(JSON.stringify({ message: 'Inicio de sesión exitoso'}), {
            status: 200,
            headers: {
                'Set-Cookie': `token=${token}; HttpOnly; Path=/; Max-Age=86400`,
            },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Error al iniciar sesión' }), { status: 500 });
    }
}
