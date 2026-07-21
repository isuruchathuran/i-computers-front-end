import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { confirmAction } from "../utils/confirmAction";

export default function DeleteModal({ product, setLoading }) {
    
    const handleDelete = () => {
        confirmAction({
            title: "Confirm Deletion",
            text: "Are you sure you want to delete this item? This action cannot be undone.",
            icon: "warning",
            confirmButtonText: 'Yes, delete it!',
            confirmButtonColor: '#ef4444',
            successTitle: "Deleted!",
            successText: "Product deleted successfully.",
            onConfirm: async () => {
                const token = localStorage.getItem("token");
                await axios.delete(import.meta.env.VITE_API_URL + "/products/" + product.productId, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                });
            },
            onSuccess: () => {
                setLoading(true);
            }
        });
    };

    return (
        <div>
            <button 
                onClick={handleDelete} 
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-[#374151] rounded-lg transition-colors cursor-pointer"
                title="Delete this item?"
            >
                <FaTrash size={16} />
            </button>
        </div>
    );
}