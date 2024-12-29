'use client';

import { useState, useEffect } from 'react';
import Modal from '@/components/Modal';
import SearchBar from '@/components/SearchBar';
import { fetchPosts } from '../../lib/clientAPI_posts';
import SkeletonPostsGeneral from '@/components/SkeletonPostsGeneral';

export default function GeneralPostsPage() {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        const loadAllPosts = async () => {
            setLoading(true);
            try {
                const allPosts = await fetchPosts();
                setPosts(allPosts);
                setFilteredPosts(allPosts);
            } catch (err) {
                console.log('Error al cargar los posts:', err);
            } finally {
                setLoading(false);
            }
        };
        loadAllPosts();
    }, []);

    const handleSearch = (searchTerm) => {
        if (searchTerm === '') {
            setFilteredPosts(posts);
        } else {
            setFilteredPosts(
                posts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }
    };

    const handlePostClick = (post) => {
        setSelectedPost(post);
    };

    const closeModal = () => {
        setSelectedPost(null);
    };

    return (
        <div
            className="container mx-auto p-4"
            style={{ color: 'var(--foreground)', backgroundColor: 'var(--background)' }}
        >
            <h1 className="text-3xl font-bold mb-6 text-center text-white">Explora todos los posts</h1>

            <SearchBar onSearch={handleSearch} />

            {loading ? (
                <SkeletonPostsGeneral />
            ) : filteredPosts.length === 0 ? (
                <p className="text-center text-white">No hay posts disponibles.</p>
            ) : (
                <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredPosts.map((post) => (
                        <li
                            key={post.id}
                            className="bg-black text-white p-4 rounded-lg shadow-lg shadow-violet-500 hover:bg-gray-700 transition duration-300 cursor-pointer"
                            onClick={() => handlePostClick(post)}
                        >
                            <h2 className="text-xl font-bold text-violet-500 hover:underline">{post.title}</h2>
                            <p className="text-sm text-gray-400">Por: {post.user.userName}</p>
                            <p className="mt-2 text-gray-300 line-clamp-3">{post.body}</p>
                        </li>
                    ))}
                </ul>
            )}

            {selectedPost && (
                <Modal onClose={closeModal}>
                    <div className="p-6 bg-black rounded-lg shadow-lg w-full max-w-4xl overflow-auto max-h-[80vh]">
                        <h2 className="text-2xl font-bold mb-2 text-white">{selectedPost.title}</h2>
                        <p className="text-sm text-gray-400 mb-4">Por: {selectedPost.user.userName}</p>
                        <div className="text-gray-300 mb-4">
                            <p>{selectedPost.body}</p>
                        </div>
                        <button
                            onClick={closeModal}
                            className="px-4 py-2 bg-violet-500 text-white rounded-md hover:bg-violet-600 transition duration-300"
                        >
                            Cerrar
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
}
