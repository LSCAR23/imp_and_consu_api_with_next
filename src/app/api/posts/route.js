import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
    try {
        const posts = await prisma.post.findMany({
            include: {
                user: {
                    select: { userName: true }, 
                },
            },
        });

        return new Response(JSON.stringify(posts), { status: 200 });
    } catch (error) {
        console.error('Error al obtener los posts:', error);
        return new Response(
            JSON.stringify({ error: 'Error interno del servidor' }),
            { status: 500 }
        );
    }
}

export async function POST(req) {
    try {
        const body = await req.json();

        const { userId, title, body: postBody } = body;

        if (!userId) {
            return new Response(JSON.stringify({ error: "El userId es obligatorio" }), { status: 400 });
        }

        const newPost = await prisma.post.create({
            data: {
                title,
                body: postBody,
                userId,
            },
        });

        return new Response(JSON.stringify(newPost), { status: 201 });
    } catch (error) {
        console.error("Error al crear el post:", error);
        return new Response(JSON.stringify({ error: "Error al crear el post" }), { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const { id } = await req.json();
        await prisma.post.delete({ where: { id } });
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error al eliminar el post' }), { status: 500 });
    }
}
