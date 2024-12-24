export default function Pagination({ postsPerPage, totalPosts, paginate, currentPage }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="my-4">
            <ul className="flex justify-center space-x-2">
                {pageNumbers.map(number => (
                    <li key={number} className="inline-block">
                        <button
                            onClick={() => paginate(number)}
                            className={`px-4 py-2 rounded border-2 ${currentPage === number ? 'bg-violet-500 text-white border-violet-500' : 'bg-black text-violet-500 border-violet-500'} hover:bg-violet-500 hover:text-black transition-colors duration-300`}
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
