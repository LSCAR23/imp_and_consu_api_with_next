export default function SkeletonPosts() {
    return (
        <div className="animate-pulse space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
                <div
                    key={index}
                    className="border border-violet-500 p-4 rounded-lg shadow-sm bg-gray-200 dark:bg-gray-700 text-transparent mb-2"
                >
                    <div className="h-6 bg-gray-300 dark:bg-gray-800 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-800 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-800 rounded w-1/2"></div>
                </div>
            ))}
        </div>
    );
}
