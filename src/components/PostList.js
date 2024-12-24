export default function PostList({ posts, onEdit }) {
    return (
        <ul className="space-y-4">
            {posts.map((post) => (
                <li key={post.id} className="border border-violet-500 p-4 rounded-lg shadow-sm bg-black text-white">
                    <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                    <p>{post.body}</p>
                    <button
                        onClick={() => onEdit(post)}
                        className="bg-violet-500 text-white px-4 py-2 rounded mt-2 hover:bg-violet-600 transition-colors duration-300"
                    >
                        Editar
                    </button>
                </li>
            ))}
        </ul>
    );
}
