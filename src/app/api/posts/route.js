import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const posts = await prisma.post.findMany();
        return new Response(JSON.stringify(posts), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error al obtener los posts' }), { status: 500 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        const newPost = await prisma.post.create({ data: body });
        return new Response(JSON.stringify(newPost), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error al crear el post' }), { status: 500 });
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
