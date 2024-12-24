"use client";

import { useState, useEffect } from 'react';
import PostList from '../components/PostList';
import CreatePostForm from '../components/CreatePostForm';
import EditPostForm from '../components/EditPostForm';
import ToastMessage from '../components/ToastMessage';
import Pagination from '../components/Pagination';
import { fetchPosts, createPost, updatePost } from '../lib/api';

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [editingPost, setEditingPost] = useState(null);
    const [error, setError] = useState(null);
    const [toastMessage, setToastMessage] = useState(null);
    const [toastType, setToastType] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const data = await fetchPosts();
                setPosts(data); // Cargar todas las publicaciones
            } catch (err) {
                setError('Error al cargar las publicaciones.');
                setToastMessage('Error al cargar las publicaciones'); 
                setToastType('error');
            }
        };
        loadPosts();
    }, []);

    const handleCreatePost = async (newPost) => {
        try {
            const createdPost = await createPost(newPost);
            setPosts([createdPost, ...posts]);
            setToastMessage('Publicación creada exitosamente');
            setToastType('success');
        } catch (err) {
            setError('Error al crear la publicación.');
            setToastMessage('Error al crear la publicación');
            setToastType('error');
        }
    };

    const handleUpdatePost = async (updatedPost) => {
        try {
            const savedPost = await updatePost(updatedPost);
            setPosts(posts.map((post) => (post.id === savedPost.id ? savedPost : post)));
            setEditingPost(null);
            setToastMessage('Publicación actualizada exitosamente');
            setToastType('success');
        } catch (err) {
            setError('Error al actualizar la publicación.');
            setToastMessage('Error al actualizar la publicación');
            setToastType('error');
        }
    };

    // Obtener los posts actuales
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // Cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mx-auto p-4" style={{ color: 'var(--foreground)', backgroundColor: 'var(--background)' }}>
            <h1 className="text-3xl font-bold mb-6 text-center text-white">Publicaciones</h1>

            {error && <p className="text-red-500">{error}</p>}

            <CreatePostForm onCreate={handleCreatePost} />

            <PostList
                posts={currentPosts}
                onEdit={(post) => setEditingPost(post)}
            />

            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={posts.length}
                paginate={paginate}
                currentPage={currentPage}
            />

            {editingPost && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                    <div className="relative p-6 rounded shadow-lg max-w-md w-full" style={{ backgroundColor: 'var(--background)' }}>
                        <button
                            onClick={() => setEditingPost(null)}
                            className="absolute top-2 right-1 text-white px-2 py-1 rounded-full hover:bg-red-600 transition-colors duration-300"
                        >
                            ✕
                        </button>
                        <EditPostForm
                            post={editingPost}
                            onSave={handleUpdatePost}
                        />
                    </div>
                </div>
            )}
            {toastMessage && <ToastMessage message={toastMessage} type={toastType} onClose={() => setToastMessage(null)} />}
        </div>
    );
}
