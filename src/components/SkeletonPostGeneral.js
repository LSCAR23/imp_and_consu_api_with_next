const SkeletonPostGeneral = () => {
    return (
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg animate-pulse">
            <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        </div>
    );
};

export default SkeletonPostGeneral;
