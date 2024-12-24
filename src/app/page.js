"use client";

import { useState, useEffect } from 'react';
import PostList from '../components/PostList';
import CreatePostForm from '../components/CreatePostForm';
import EditPostForm from '../components/EditPostForm';
import { fetchPosts, createPost, updatePost } from '../lib/api';

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [editingPost, setEditingPost] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const data = await fetchPosts();
                setPosts(data.slice(0, 10));
            } catch (err) {
                setError('Error al cargar las publicaciones.');
            }
        };
        loadPosts();
    }, []);

    const handleCreatePost = async (newPost) => {
        try {
            const createdPost = await createPost(newPost);
            setPosts([createdPost, ...posts]);
        } catch (err) {
            setError('Error al crear la publicación.');
        }
    };

    const handleUpdatePost = async (updatedPost) => {
        try {
            const savedPost = await updatePost(updatedPost);
            setPosts(posts.map((post) => (post.id === savedPost.id ? savedPost : post)));
            setEditingPost(null);
        } catch (err) {
            setError('Error al actualizar la publicación.');
        }
    };

    return (
        <div className="container mx-auto p-4" style={{ color: 'var(--foreground)', backgroundColor: 'var(--background)' }}>
            <h1 className="text-3xl font-bold mb-6 text-center text-white">Publicaciones</h1>

            {error && <p className="text-red-500">{error}</p>}

            <CreatePostForm onCreate={handleCreatePost} />

            <PostList
                posts={posts}
                onEdit={(post) => setEditingPost(post)}
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
        </div>
    );
}
