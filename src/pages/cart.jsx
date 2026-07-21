import { useState, useEffect } from "react"
import { updateQuantity, getCart, getCartTotal, removeFromCart } from "../utils/cartManager"
import { BiMinus, BiPlus, BiTrash, BiChevronRight, BiShoppingBag } from "react-icons/bi"
import getFormattedPrice from "../utils/price-format"
import { Link, useNavigate } from "react-router-dom"
import { FaShoppingCart, FaArrowRight, FaArrowLeft, FaTag, FaCheckCircle, FaExclamationCircle } from "react-icons/fa"
import Swal from "sweetalert2"
import { confirmAction } from "../utils/confirmAction"

export default function Cart(){
    const [cart, setCart] = useState([])
    const navigate = useNavigate();

    const refreshCart = () => {
        setCart(getCart());
    }

    useEffect(() => {
        refreshCart();
        window.addEventListener('cartUpdated', refreshCart);
        return () => window.removeEventListener('cartUpdated', refreshCart);
    }, [])

    const handleCheckout = (e) => {
        e.preventDefault();
        
        if (cart.length === 0) {
            Swal.fire({
                title: "Empty Cart",
                text: "Cart is empty.",
                icon: "warning",
                background: '#1f2937',
                color: '#fff',
                confirmButtonColor: '#0ea5e9'
            });
            return;
        }

        Swal.fire({
            title: "Ready?",
            text: "Proceeding to checkout.",
            icon: "info",
            timer: 1500,
            showConfirmButton: false,
            background: '#1f2937',
            color: '#fff',
        }).then(() => {
            navigate("/checkout", { state: cart });
        });
    }

    // Calculations
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = getCartTotal();
    const shipping = cart.length > 0 ? 0 : 0; // Free shipping
    const discount = 0;
    const tax = 0;
    const grandTotal = subtotal + shipping - discount + tax;

    return(
        <div className="w-full min-h-[calc(100vh-80px)] bg-[#0b0f19] text-white py-10">
            <div className="container mx-auto px-4 max-w-7xl">
                
                {/* Breadcrumb & Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                        <Link to="/" className="hover:text-[#0ea5e9] transition-colors">Home</Link>
                        <BiChevronRight />
                        <span className="text-[#0ea5e9]">Cart</span>
                    </div>
                    <h1 className="text-4xl font-bold flex items-center gap-3">
                        Shopping Cart
                    </h1>
                </div>

                {cart.length === 0 ? (
                    <div className="bg-[#111827] rounded-3xl p-16 flex flex-col items-center justify-center border border-[#1f2937] shadow-xl text-center">
                        <div className="w-32 h-32 bg-[#1f2937] rounded-full flex items-center justify-center mb-8">
                            <BiShoppingBag size={64} className="text-gray-500" />
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
                        <p className="text-gray-400 text-lg mb-8 max-w-md">Looks like you haven't added any products to your cart yet. Explore our store and find something you love!</p>
                        <Link to="/products" className="px-10 py-4 bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-bold text-lg rounded-xl shadow-[0_0_20px_rgba(14,165,233,0.3)] transition-all hover:-translate-y-1 flex items-center gap-2">
                            <FaArrowLeft /> Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col xl:flex-row gap-8">
                        
                        {/* Left: Cart Items */}
                        <div className="xl:w-2/3 flex flex-col gap-4">
                            {cart.map((cartItem, index) => (
                                <div key={index} className="bg-[#111827] rounded-2xl p-5 flex flex-col md:flex-row gap-6 border border-[#1f2937] hover:border-[#374151] transition-all shadow-lg items-center relative">
                                    
                                    {/* Image */}
                                    <div className="w-full md:w-32 h-32 bg-white rounded-xl p-2 flex-shrink-0 flex items-center justify-center border border-gray-200">
                                        <img className="max-w-full max-h-full object-contain" src={cartItem.image || '/placeholder.png'} alt={cartItem.name} />
                                    </div>
                                    
                                    {/* Product Details */}
                                    <div className="flex-1 flex flex-col w-full">
                                        
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    {(cartItem.productCode && cartItem.productCode !== "CODE-NA") && (
                                                        <span className="px-2 py-1 bg-[#1f2937] text-[#0ea5e9] text-xs font-bold font-mono tracking-widest rounded-md">
                                                            {cartItem.productCode}
                                                        </span>
                                                    )}
                                                    <span className="px-2 py-1 bg-[#1f2937] text-xs font-semibold text-gray-300 rounded-md">
                                                        {cartItem.category || "General"}
                                                    </span>
                                                    {cartItem.quantity >= cartItem.maxStock ? (
                                                        <span className="flex items-center gap-1 text-xs text-amber-500 font-semibold bg-amber-500/10 px-2 py-1 rounded-md">
                                                            <FaExclamationCircle /> Max Stock Reached
                                                        </span>
                                                    ) : (
                                                        <span className="flex items-center gap-1 text-xs text-green-500 font-semibold bg-green-500/10 px-2 py-1 rounded-md">
                                                            <FaCheckCircle /> In Stock
                                                        </span>
                                                    )}
                                                </div>
                                                <h2 className="text-xl font-bold text-white leading-tight mb-1 hover:text-[#0ea5e9] transition-colors">
                                                    <Link to={`/overview/${cartItem.productId}`}>{cartItem.name}</Link>
                                                </h2>
                                                <p className="text-[#0ea5e9] font-bold">
                                                    Unit Price: {getFormattedPrice(cartItem.price)}
                                                </p>
                                            </div>
                                            
                                            <button 
                                                onClick={() => {
                                                    confirmAction({
                                                        title: "Remove Item?",
                                                        text: "Are you sure you want to remove this item from your cart?",
                                                        icon: "warning",
                                                        confirmButtonText: "Yes, Remove",
                                                        confirmButtonColor: "#ef4444",
                                                        successTitle: "Removed",
                                                        successText: "Item has been removed from your cart.",
                                                        onConfirm: () => {
                                                            removeFromCart(cartItem.productId);
                                                        }
                                                    });
                                                }}
                                                className="hidden md:flex w-10 h-10 bg-[#1f2937] hover:bg-red-500/20 text-gray-400 hover:text-red-500 rounded-lg justify-center items-center transition-colors shadow-sm"
                                                title="Remove item"
                                            >
                                                <BiTrash size={20} />
                                            </button>
                                        </div>
                                        
                                        {/* Bottom Row: Qty & Subtotal */}
                                        <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-[#1f2937] w-full">
                                            <div className="flex items-center bg-[#1f2937] rounded-lg border border-[#374151] overflow-hidden shadow-inner">
                                                <button 
                                                    onClick={() => updateQuantity(cartItem.productId, cartItem.quantity - 1)} 
                                                    className="w-12 h-10 flex justify-center items-center text-gray-400 hover:text-white hover:bg-[#374151] transition-colors"
                                                >
                                                    <BiMinus />
                                                </button>
                                                <span className="w-14 h-10 flex justify-center items-center font-bold text-white bg-[#0b0f19]">
                                                    {cartItem.quantity}
                                                </span>
                                                <button 
                                                    onClick={() => updateQuantity(cartItem.productId, cartItem.quantity + 1)} 
                                                    className="w-12 h-10 flex justify-center items-center text-gray-400 hover:text-white hover:bg-[#374151] transition-colors"
                                                >
                                                    <BiPlus />
                                                </button>
                                            </div>
                                            
                                            <div className="text-right flex-1 md:flex-none flex items-center justify-between md:block">
                                                <span className="text-gray-400 text-sm md:hidden block">Subtotal:</span>
                                                <span className="text-xl font-bold text-white">
                                                    {getFormattedPrice(cartItem.price * cartItem.quantity)}
                                                </span>
                                            </div>

                                            <button 
                                                onClick={() => {
                                                    confirmAction({
                                                        title: "Remove Item?",
                                                        text: "Are you sure you want to remove this item from your cart?",
                                                        icon: "warning",
                                                        confirmButtonText: "Yes, Remove",
                                                        confirmButtonColor: "#ef4444",
                                                        successTitle: "Removed",
                                                        successText: "Item has been removed from your cart.",
                                                        onConfirm: () => {
                                                            removeFromCart(cartItem.productId);
                                                        }
                                                    });
                                                }}
                                                className="md:hidden flex items-center gap-2 text-sm text-red-400 hover:text-red-500 transition-colors"
                                            >
                                                <BiTrash size={16} /> Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                            <div className="mt-4">
                                <Link to="/products" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#0ea5e9] transition-colors font-medium">
                                    <FaArrowLeft /> Continue Shopping
                                </Link>
                            </div>
                        </div>

                        {/* Right: Order Summary Card */}
                        <div className="xl:w-1/3">
                            <div className="bg-[#111827] rounded-3xl p-8 border border-[#1f2937] sticky top-24 shadow-2xl">
                                <h3 className="text-2xl font-bold mb-6 border-b border-[#374151] pb-4">Order Summary</h3>
                                
                                <div className="space-y-4 text-[15px] mb-8">
                                    <div className="flex justify-between text-gray-400">
                                        <span>Total Items</span>
                                        <span className="text-white font-semibold">{totalItems}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400">
                                        <span>Subtotal</span>
                                        <span className="text-white font-semibold">{getFormattedPrice(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400">
                                        <span>Shipping Cost</span>
                                        <span className="text-green-500 font-semibold">Free</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400">
                                        <span className="flex items-center gap-2"><FaTag size={12}/> Discount</span>
                                        <span className="text-white font-semibold">{getFormattedPrice(discount)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400">
                                        <span>Tax</span>
                                        <span className="text-white font-semibold">{getFormattedPrice(tax)}</span>
                                    </div>
                                </div>
                                
                                <div className="border-t border-[#374151] pt-6 mb-8">
                                    <div className="flex justify-between items-end">
                                        <span className="text-lg text-gray-300">Grand Total</span>
                                        <span className="text-3xl font-bold text-[#0ea5e9]">{getFormattedPrice(grandTotal)}</span>
                                    </div>
                                </div>
                                
                                <button 
                                    onClick={handleCheckout}
                                    disabled={cart.length === 0}
                                    className="w-full py-4 bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-bold text-lg rounded-xl flex justify-center items-center gap-3 transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                                >
                                    Proceed to Checkout <FaArrowRight />
                                </button>
                                
                                <div className="mt-6 flex justify-center items-center gap-4 text-gray-500 text-sm">
                                    <span className="flex items-center gap-1"><FaCheckCircle className="text-green-500"/> Secure Checkout</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}