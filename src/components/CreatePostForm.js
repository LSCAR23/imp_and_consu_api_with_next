import { useState } from 'react';

export default function CreatePostForm({ onCreate }) {
    const [newPost, setNewPost] = useState({ title: '', body: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate(newPost);
        setNewPost({ title: '', body: '' });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-full mx-4 p-4 bg-black shadow-md rounded-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 text-white">Crear Publicación</h2>
            <input
                type="text"
                placeholder="Título"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                className="border border-violet-500 p-2 w-full mb-4 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                required
            />
            <textarea
                placeholder="Contenido"
                value={newPost.body}
                onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
                className="border border-violet-500 p-2 w-full mb-4 rounded bg-black text-white resize-none focus:outline-none focus:ring-2 focus:ring-violet-500"
                required
                rows="6"
            ></textarea>
            <button type="submit" className="bg-violet-500 text-white px-4 py-2 rounded hover:bg-violet-600 transition-colors duration-300 w-full">
                Agregar
            </button>
        </form>
    );
}
