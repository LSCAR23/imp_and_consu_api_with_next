import { PrismaClient } from '@prisma/client';
import { authenticator } from 'otplib';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { userName, code } = await req.json();

        const user = await prisma.user.findUnique({
            where: { userName },
        });

        if (!user) {
            return new Response(JSON.stringify({ error: 'Usuario no encontrado' }), { status: 404 });
        }

        
        const isValid = authenticator.verify({
            token: code,
            secret: user.twoFactorSecret,
        });

        if (!isValid) {
            return new Response(JSON.stringify({ error: 'Código inválido' }), { status: 401 });
        }

        return new Response(JSON.stringify({ message: 'Verificación exitosa' }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Error al verificar el código' }), { status: 500 });
    }
}
