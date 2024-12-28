import './custom_styles/post.css'

export default function PostList({ posts, onEdit, onDelete, deletingPostId, editedPostId, newPostId}) {
    return (
        <ul className="space-y-4">
            {posts.map((post) => (
                <li key={posts.indexOf(post)+1} className={`border border-violet-500 p-4 rounded-lg shadow-sm bg-black text-white transition-all duration-300 ${ deletingPostId === post.id ? 'fade-out' : editedPostId === post.id ? 'flash' : newPostId === post.id ? 'fade-in' : ''}`}>
                    <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                    <p>{post.body}</p>
                    <button
                        onClick={() => onEdit(post)}
                        className="bg-violet-500 text-white px-4 py-2 rounded mt-2 hover:bg-violet-600 transition-colors duration-300 mr-2"
                    >
                        Editar
                    </button>
                    <button
                        onClick={() => onDelete(post.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded mt-2 hover:bg-red-600 transition-colors duration-300"
                    >
                        Eliminar
                    </button>
                </li>
            ))}
        </ul>
    );
}