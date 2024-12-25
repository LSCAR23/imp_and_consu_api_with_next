"use client";

import { useState, useEffect } from 'react';
import PostList from '../components/PostList';
import CreatePostForm from '../components/CreatePostForm';
import EditPostForm from '../components/EditPostForm';
import ToastMessage from '../components/ToastMessage';
import Pagination from '../components/Pagination';
import Spinner from '../components/Spinner';
import { fetchPosts, createPost, updatePost, deletePost } from '../lib/api';

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    const [error, setError] = useState(null);
    const [toastMessage, setToastMessage] = useState(null);
    const [toastType, setToastType] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [editedPostId, setEditedPostId] = useState(null);
    const [deletingPostId, setDeletingPostId] = useState(null);
    
    useEffect(() => {
        const loadPosts = async () => {
            setLoading(true);
            try {
                const data = await fetchPosts();
                setPosts(data); // Cargar todas las publicaciones
            } catch (err) {
                setError('Error al cargar las publicaciones.');
                setToastMessage('Error al cargar las publicaciones'); 
                setToastType('error');
            } finally {
                setLoading(false);
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
            setEditedPostId(updatedPost.id); 
            setTimeout(() => setEditedPostId(null), 800);
            setEditingPost(null);
            setToastMessage('Publicación actualizada exitosamente');
            setToastType('success');
        } catch (err) {
            setError('Error al actualizar la publicación.');
            setToastMessage('Error al actualizar la publicación');
            setToastType('error');
        }
    };
    

    const handleDeletePost = async (postId) => {
        setDeletingPostId(postId);
        setTimeout(async () => {
            try {
                await deletePost(postId);
                setPosts(posts.filter((post) => post.id !== postId));
                setToastMessage('Publicación eliminada exitosamente');
                setToastType('success');
            } catch (err) {
                setError('Error al eliminar la publicación.');
                setToastMessage('Error al eliminar la publicación');
                setToastType('error');
            } finally {
                setDeletingPostId(null);
            }
        }, 300);
    };

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mx-auto p-4" style={{ color: 'var(--foreground)', backgroundColor: 'var(--background)' }}>
            <h1 className="text-3xl font-bold mb-6 text-center text-white">Publicaciones</h1>

            {error && <p className="text-red-500">{error}</p>}

            {loading ? (
                <Spinner />
            ) : (
                <>
                    <CreatePostForm onCreate={handleCreatePost} />

                    <PostList
                        posts={currentPosts}
                        onEdit={(post) => setEditingPost(post)}
                        onDelete={(postId) => handleDeletePost(postId)}
                        editedPostId={editedPostId}
                        deletingPostId={deletingPostId}
                    />

                    <Pagination
                        postsPerPage={postsPerPage}
                        totalPosts={posts.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                </>
            )}

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