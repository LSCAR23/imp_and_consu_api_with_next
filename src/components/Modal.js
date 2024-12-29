const Modal = ({ children, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-lg z-50">
            <div className="bg-black text-white p-6 rounded-lg shadow-lg shadow-violet-500 max-w-md w-full relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-300 hover:text-red-500 transition duration-300"
                >
                    ✕
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
