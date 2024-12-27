import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(req, context) {
    try {
        const { params } = context; 
        const { id } = await params;
        const body = await req.json();

        const updatedPost = await prisma.post.update({
            where: { id: parseInt(id) },
            data: body,
        });

        return new Response(JSON.stringify(updatedPost), { status: 200 });
    } catch (error) {
        console.error('Error al actualizar el post:', error);
        return new Response(JSON.stringify({ error: 'Error al actualizar el post' }), { status: 500 });
    }
}
