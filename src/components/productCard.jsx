import { Link } from "react-router-dom";
import getFormattedPrice from "../utils/price-format";
import { FaShoppingCart, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { addToCart } from "../utils/cartManager";

export default function ProductCard({ product }) {
    
    // Safety check for images
    const imageSrc = product.images && product.images.length > 0 ? product.images[0] : '/placeholder.png';
    const imageSrcHover = product.images && product.images.length > 1 ? product.images[1] : imageSrc;
    const isOutOfStock = product.qty <= 0;

    return (
        <div className="w-[300px] h-[480px] m-4 rounded-xl shadow-lg bg-[#111827] border border-[#374151] overflow-hidden hover:border-[#0ea5e9]/50 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] transition-all duration-300 group relative flex flex-col justify-between">
            <Link to={"/overview/" + (product.productId || product._id)} className="absolute inset-0 z-10"></Link>
            
            <div className="w-full h-[250px] bg-white relative overflow-hidden flex justify-center items-center p-4">
                <img src={imageSrcHover} alt={product.productName || product.name} className="max-h-[220px] object-contain absolute opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:scale-105" />
                <img src={imageSrc} alt={product.productName || product.name} className="max-h-[220px] object-contain absolute group-hover:opacity-0 transition-opacity duration-500" />
                
                {product.labeledPrice > product.price && (
                    <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md z-20 shadow-md">
                        SALE
                    </span>
                )}
                
                {isOutOfStock ? (
                    <span className="absolute top-3 right-3 bg-red-500/90 text-white text-xs font-bold px-2 py-1 flex items-center gap-1 rounded-md z-20 shadow-md">
                        <FaExclamationCircle /> Out of Stock
                    </span>
                ) : (
                    <span className="absolute top-3 right-3 bg-green-500/90 text-white text-xs font-bold px-2 py-1 flex items-center gap-1 rounded-md z-20 shadow-md">
                        <FaCheckCircle /> In Stock
                    </span>
                )}
            </div>

            <div className="flex-1 p-5 flex flex-col justify-between relative z-20 bg-[#111827]">
                <div>
                    <div className="flex justify-between items-start mb-1">
                        <span className="text-[10px] text-gray-500 font-mono font-bold uppercase tracking-wider">{product.productCode || "CODE-NA"}</span>
                        <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">{product.brand || product.category || "General"}</span>
                    </div>
                    <h1 className="font-semibold text-lg text-white mt-1 line-clamp-2 group-hover:text-[#0ea5e9] transition-colors">
                        {product.productName || product.name}
                    </h1>
                    
                    {/* Short Description */}
                    <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                        {product.description || "High quality computing product available at ISURU COMPUTERS."}
                    </p>
                </div>

                <div className="mt-4 flex items-end justify-between border-t border-[#1f2937] pt-4">
                    <div>
                        {product.labeledPrice > product.price && (
                            <p className="text-xs text-gray-500 line-through mb-0.5">
                                {getFormattedPrice(product.labeledPrice)}
                            </p>
                        )}
                        <p className="text-xl font-bold text-[#0ea5e9]">
                            {getFormattedPrice(product.price)}
                        </p>
                    </div>
                    
                    <button 
                        disabled={isOutOfStock}
                        className={`p-3 rounded-xl transition-all duration-300 z-20 relative flex items-center justify-center shadow-lg ${isOutOfStock ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-[#0ea5e9] hover:bg-[#0284c7] text-white hover:scale-110'}`}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addToCart(product);
                        }}
                    >
                        <FaShoppingCart size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}