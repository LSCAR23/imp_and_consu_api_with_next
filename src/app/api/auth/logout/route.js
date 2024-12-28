export async function POST() {
    return new Response(JSON.stringify({ message: 'Sesión cerrada exitosamente' }), {
        status: 200,
        headers: {
            'Set-Cookie': 'token=; HttpOnly; Path=/; Max-Age=0', // Elimina la cookie del token
        },
    });
}
