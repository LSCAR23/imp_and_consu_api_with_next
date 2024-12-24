import { useState, useEffect } from 'react';

export default function EditPostForm({ post, onSave }) {
    const [editedPost, setEditedPost] = useState({ title: '', body: '' });

    useEffect(() => {
        if (post) {
            setEditedPost(post);
        }
    }, [post]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(editedPost);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-full mx-4 p-4 bg-black shadow-md rounded-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 text-white">Editar Publicación</h2>
            <input
                type="text"
                placeholder="Título"
                value={editedPost.title}
                onChange={(e) => setEditedPost({ ...editedPost, title: e.target.value })}
                className="border border-violet-500 p-2 w-full mb-4 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                required
            />
            <textarea
                placeholder="Contenido"
                value={editedPost.body}
                onChange={(e) => setEditedPost({ ...editedPost, body: e.target.value })}
                className="border border-violet-500 p-2 w-full mb-4 rounded bg-black text-white resize-none focus:outline-none focus:ring-2 focus:ring-violet-500"
                required
                rows="6"
            ></textarea>
            <button type="submit" className="bg-violet-500 text-white px-4 py-2 rounded hover:bg-violet-600 transition-colors duration-300 w-full">
                Guardar
            </button>
        </form>
    );
}
