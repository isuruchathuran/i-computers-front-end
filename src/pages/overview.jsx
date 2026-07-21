import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingAnimation from "../components/loadingAnimation";
import ImageSlideShow from "../components/imageSlideShow";
import getFormattedPrice from "../utils/price-format";
import { addToCart } from "../utils/cart";
import toast from "react-hot-toast";
import { FaCheckCircle, FaTimesCircle, FaShoppingCart, FaBolt } from "react-icons/fa";

export default function Overview(){
    const params = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(import.meta.env.VITE_API_URL + "/products/" + params.productId)
        .then((response) => {
            setProduct(response.data);
            setLoading(false);
        })
        .catch(() => {
            toast.error("Failed to load product details.");
            setLoading(false);
        });
    }, [params.productId]);

    if (loading) {
        return (
            <div className="w-full min-h-[calc(100vh-80px)] flex justify-center items-center bg-[#0b0f19]">
                <LoadingAnimation/>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="w-full min-h-[calc(100vh-80px)] flex justify-center items-center bg-[#0b0f19] text-white">
                <h1 className="text-2xl font-bold">Product not found</h1>
            </div>
        );
    }

    const discountPercentage = product.labeledPrice > product.price 
        ? Math.round(((product.labeledPrice - product.price) / product.labeledPrice) * 100) 
        : 0;

    const inStock = product.qty > 0;

    return (
        <div className="w-full min-h-[calc(100vh-80px)] bg-[#0b0f19] text-white py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-12 bg-[#111827] rounded-3xl p-6 lg:p-12 shadow-2xl border border-[#1f2937]">
                    
                    {/* Image Gallery */}
                    <div className="w-full lg:w-1/2 flex flex-col items-center">
                        <div className="w-full max-w-lg bg-white rounded-2xl p-6 relative overflow-hidden shadow-inner">
                            {discountPercentage > 0 && (
                                <span className="absolute top-4 left-4 bg-red-600 text-white font-bold px-3 py-1 rounded-md z-10 shadow-lg">
                                    {discountPercentage}% OFF
                                </span>
                            )}
                            <ImageSlideShow images={product.images}/>
                        </div>
                    </div>
                    
                    {/* Product Details */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-start">
                        <div className="mb-2 flex items-center gap-2">
                            <span className="px-3 py-1 bg-[#1f2937] text-[#0ea5e9] text-xs font-bold uppercase tracking-wider rounded-md">
                                {product.category || "General"}
                            </span>
                            <span className="text-xs text-gray-500 font-mono font-bold tracking-widest">{product.productCode || "CODE-NA"}</span>
                        </div>

                        <h1 className="text-3xl lg:text-4xl font-extrabold mb-2 leading-tight">
                            {product.name}
                        </h1>

                        {(product.brand || product.model) && (
                            <p className="text-lg text-gray-400 mb-6 font-medium">
                                {product.brand && <span className="text-white">{product.brand}</span>}
                                {product.brand && product.model && <span> - </span>}
                                {product.model && <span>{product.model}</span>}
                            </p>
                        )}

                        <div className="flex items-end gap-4 mb-6">
                            <p className="text-4xl font-bold text-[#0ea5e9]">
                                {getFormattedPrice(product.price)}
                            </p>
                            {product.labeledPrice > product.price && (
                                <p className="text-xl text-gray-500 line-through mb-1">
                                    {getFormattedPrice(product.labeledPrice)}
                                </p>
                            )}
                        </div>

                        {/* Stock Status */}
                        <div className="flex items-center gap-2 mb-8">
                            {inStock ? (
                                <>
                                    <FaCheckCircle className="text-green-500" />
                                    <span className="text-green-500 font-medium">In Stock ({product.qty} available)</span>
                                </>
                            ) : (
                                <>
                                    <FaTimesCircle className="text-red-500" />
                                    <span className="text-red-500 font-medium">Out of Stock</span>
                                </>
                            )}
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <h3 className="text-xl font-bold mb-3 border-b border-[#374151] pb-2">Description</h3>
                            <p className="text-gray-300 leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        {/* Specifications */}
                        {product.specifications && product.specifications.length > 0 && (
                            <div className="mb-8">
                                <h3 className="text-xl font-bold mb-3 border-b border-[#374151] pb-2">Specifications</h3>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                                    {product.specifications.map((spec, index) => (
                                        <li key={index} className="flex flex-col bg-[#0b0f19] p-3 rounded-lg border border-[#1f2937]">
                                            <span className="text-xs text-gray-500 uppercase tracking-wider">{spec.key}</span>
                                            <span className="text-sm font-medium text-white">{spec.value}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        
                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-auto pt-6">
                            <button 
                                disabled={!inStock}
                                onClick={() => {
                                    addToCart(product, 1);
                                    toast.success(`${product.name} added to cart!`);
                                }}
                                className={`flex-1 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                                    inStock 
                                    ? "bg-[#1f2937] hover:bg-[#374151] text-white border border-[#374151]" 
                                    : "bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700"
                                }`}
                            >
                                <FaShoppingCart size={20} />
                                Add to Cart
                            </button>
                            
                            <Link 
                                to={inStock ? "/checkout" : "#"}
                                state={inStock ? [{ product: { name: product.name, price: product.price, labeledPrice: product.labeledPrice, image: product.images[0], productId: product.productId }, qty: 1 }] : null}
                                onClick={(e) => {
                                    if (!inStock) {
                                        e.preventDefault();
                                        toast.error("This product is out of stock.");
                                    }
                                }}
                                className={`flex-1 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                                    inStock 
                                    ? "bg-[#0ea5e9] hover:bg-[#0284c7] text-white shadow-[0_0_15px_rgba(14,165,233,0.4)] hover:shadow-[0_0_25px_rgba(14,165,233,0.6)]" 
                                    : "bg-gray-800 text-gray-500 cursor-not-allowed"
                                }`}
                            >
                                <FaBolt size={20} />
                                Buy Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}