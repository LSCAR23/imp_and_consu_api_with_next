import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
    const userId = request.headers.get('user-id');

    if (!userId) {
        return new Response(
            JSON.stringify({ error: 'userId es requerido' }),
            { status: 400 }
        );
    }

    try {
        const posts = await prisma.post.findMany({
            where: { userId: parseInt(userId, 10) },
        });

        return new Response(JSON.stringify(posts || []), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ error: 'Error interno del servidor' }),
            { status: 500 }
        );
    }
}
