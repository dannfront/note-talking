

interface ModalProps {
    title: string;
    description: string;
    archiveButtonText: string;
    cancelButtonText: string;
    onHandler: () => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    Icon: React.ReactNode;
    disabled?: boolean;
}

export default function Modal({
    title,
    description,
    archiveButtonText,
    cancelButtonText,
    onHandler,
    isOpen,
    setIsOpen,
    Icon,
    disabled = false,
}: ModalProps) {

    const handleCancel = () => {
        setIsOpen(false);
    };

    if (isOpen === false) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-custom-neutral-700 rounded-xl max-w-md w-full shadow-lg">
                <div className="p-6">
                    <div className="flex items-start">
                        <div className="bg-gray-100 dark:bg-custom-neutral-600 p-3 rounded-lg mr-4">
                            {Icon}
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
                            <p className="mt-2 text-gray-700 dark:text-custom-neutral-200">{description}</p>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-200 dark:border-custom-neutral-600 p-4 flex flex-col sm:flex-row-reverse space-y-3 sm:space-y-0 sm:space-x-3 sm:space-x-reverse">
                    <button
                        onClick={onHandler}
                        className="cursor-pointer w-full sm:w-auto px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                    >
                        {archiveButtonText}
                    </button>

                    <button
                        disabled={disabled}
                        onClick={handleCancel}
                        className={` disabled:cursor-none cursor-pointer w-full sm:w-auto px-6 py-3 bg-gray-100 dark:bg-custom-neutral-500 hover:bg-gray-200 dark:hover:bg-gray-400 text-gray-800 dark:text-custom-neutral-200 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors`}
                    >
                        {cancelButtonText}
                    </button>
                </div>
            </div>
        </div>
    );
}