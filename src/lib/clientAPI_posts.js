import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchPosts() {
    try {
        const res = await axios.get(`${API_URL}/posts`);
        return res.data;
    } catch (error) {
        throw new Error('Error al cargar las publicaciones');
    }
}

export async function createPost(post) {
    try {
        const res = await axios.post(`${API_URL}/posts`, post, {
            headers: { "Content-Type": "application/json" },
        });
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.error || "Error desconocido al crear la publicación");
        }
        throw new Error("Error de conexión al servidor");
    }
}


export async function updatePost(post) {
    try {
        const res = await axios.patch(`${API_URL}/posts/${post.id}`, post, {
            headers: { 'Content-Type': 'application/json' },
        });
        return res.data;
    } catch (error) {
        throw new Error('Error al actualizar la publicación');
    }
}


export async function deletePost(id) {
    try {
        const res = await axios.delete(`${API_URL}/posts`, {
            data: { id },
            headers: { 'Content-Type': 'application/json' },
        });
        return res.data;
    } catch (error) {
        throw new Error('Error al eliminar la publicación');
    }
}
