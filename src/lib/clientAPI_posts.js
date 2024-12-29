import api from "@/utils/api";

export async function fetchPosts() {
    try {
        const res = await api.get('/posts');
        console.log(res.data);
        return res.data;
    } catch (error) {
        throw new Error('Error al cargar las publicaciones');
    }
}

export async function createPost(post) {
    try {
        const res = await api.post('/posts', post);
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
        const res = await api.patch(`/posts/${post.id}`, post); 
        return res.data;
    } catch (error) {
        throw new Error('Error al actualizar la publicación');
    }
}

export async function deletePost(id) {
    try {
        const res = await api.delete('/posts', {
            data: { id }, 
        });
        return res.data;
    } catch (error) {
        throw new Error('Error al eliminar la publicación');
    }
}
