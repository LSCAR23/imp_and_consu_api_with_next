import SkeletonPostGeneral from "./SkeletonPostGeneral";

const SkeletonPostsGeneral = () => {
    return (
        <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array(8).fill(0).map((_, index) => (
                <li key={index}>
                    <SkeletonPostGeneral />
                </li>
            ))}
        </ul>
    );
};

export default SkeletonPostsGeneral;
