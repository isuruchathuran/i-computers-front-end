import { useState, useEffect } from "react"
import { getCartTotal, saveCart } from "../utils/cartManager"
import getFormattedPrice from "../utils/price-format"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import Swal from "sweetalert2"
import { FaCheckCircle, FaCreditCard, FaMoneyBillWave } from "react-icons/fa"

export default function Checkout(){
    const location = useLocation();
    const navigate = useNavigate();
    
    // Fallback to empty array if no cart in state
    const [cart, setCart] = useState(location.state || [])
    
    // User Details Form
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [phone, setPhone] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!location.state || location.state.length === 0) {
            navigate("/products");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            Swal.fire({
                title: "Login Required",
                text: "Please log in to continue to checkout.",
                icon: "info",
                background: '#1f2937',
                color: '#fff',
                confirmButtonColor: '#0ea5e9'
            }).then(() => {
                navigate("/login");
            });
            return;
        }

        axios.get(import.meta.env.VITE_API_URL + "/users/profile", {
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        })
        .then((response) => {
            setFirstName(response.data.firstName || "")
            setLastName(response.data.lastName || "")
        })
        .catch(() => {
            localStorage.removeItem("token")
            navigate("/login")
        })
    }, [location, navigate]);

    async function placeOrder(e) {
        e.preventDefault();
        
        const token = localStorage.getItem("token");
        if (!token) {
            Swal.fire({
                title: "Login Required",
                text: "You must be logged in to place an order.",
                icon: "error",
                background: '#1f2937',
                color: '#fff',
                confirmButtonColor: '#ef4444'
            });
            navigate("/login");
            return;
        }

        // Validation for missing fields
        if (!firstName.trim() || !lastName.trim() || !addressLine1.trim() || !city.trim() || !postalCode.trim() || !phone.trim()) {
            Swal.fire({
                title: "Missing Fields",
                text: "Please fill in all required shipping fields.",
                icon: "warning",
                background: '#1f2937',
                color: '#fff',
                confirmButtonColor: '#0ea5e9'
            });
            return;
        }

        setLoading(true);

        const order = {
            firstName,
            lastName,
            addressLine1,
            addressLine2,
            city,
            postalCode,
            phone,
            country: "Sri Lanka",
            paymentMethod,
            items: cart.map(item => ({
                productId: item.productId,
                productCode: item.productCode || "CODE-NA",
                qty: item.quantity
            }))
        }

        try {
            await axios.post(import.meta.env.VITE_API_URL + "/orders", order, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Clear cart globally
            saveCart([]);

            Swal.fire({
                title: "Order Placed Successfully!",
                text: "Thank you for shopping with ISURU COMPUTERS. Your order has been placed.",
                icon: "success",
                background: '#1f2937',
                color: '#fff',
                confirmButtonColor: '#10b981'
            }).then(() => {
                navigate("/my-orders");
            });

        } catch (err) {
            Swal.fire({
                title: "Order Failed",
                text: err?.response?.data?.message || "Failed to place the order. Please try again.",
                icon: "error",
                background: '#1f2937',
                color: '#fff',
                confirmButtonColor: '#ef4444'
            });
        } finally {
            setLoading(false);
        }
    }

    if (cart.length === 0) return null;

    return(
        <div className="w-full min-h-[calc(100vh-80px)] bg-[#0b0f19] text-white py-12">
            <div className="container mx-auto px-4 max-w-6xl">
                <h1 className="text-3xl font-bold mb-8 text-white">Checkout</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* Left Column: Form */}
                    <div className="lg:w-2/3">
                        <form onSubmit={placeOrder} className="bg-[#111827] rounded-2xl p-8 border border-[#1f2937] shadow-xl">
                            
                            <h2 className="text-xl font-bold mb-6 pb-2 border-b border-[#374151]">Shipping Information</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">First Name *</label>
                                    <input required type="text" value={firstName} onChange={e => setFirstName(e.target.value)} className="w-full bg-[#1f2937] border border-[#374151] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0ea5e9] transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Last Name *</label>
                                    <input required type="text" value={lastName} onChange={e => setLastName(e.target.value)} className="w-full bg-[#1f2937] border border-[#374151] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0ea5e9] transition-colors" />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-400 mb-1">Address Line 1 *</label>
                                <input required type="text" value={addressLine1} onChange={e => setAddressLine1(e.target.value)} className="w-full bg-[#1f2937] border border-[#374151] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0ea5e9] transition-colors" placeholder="Street address, P.O. box, company name, c/o" />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-400 mb-1">Address Line 2</label>
                                <input type="text" value={addressLine2} onChange={e => setAddressLine2(e.target.value)} className="w-full bg-[#1f2937] border border-[#374151] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0ea5e9] transition-colors" placeholder="Apartment, suite, unit, building, floor, etc. (Optional)" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">City *</label>
                                    <input required type="text" value={city} onChange={e => setCity(e.target.value)} className="w-full bg-[#1f2937] border border-[#374151] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0ea5e9] transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Postal Code *</label>
                                    <input required type="text" value={postalCode} onChange={e => setPostalCode(e.target.value)} className="w-full bg-[#1f2937] border border-[#374151] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0ea5e9] transition-colors" />
                                </div>
                            </div>

                            <div className="mb-10">
                                <label className="block text-sm font-medium text-gray-400 mb-1">Phone Number *</label>
                                <input required type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-[#1f2937] border border-[#374151] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0ea5e9] transition-colors" />
                            </div>


                            <h2 className="text-xl font-bold mb-6 pb-2 border-b border-[#374151]">Payment Method</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                <label className={`cursor-pointer rounded-xl border p-4 flex items-center gap-4 transition-colors ${paymentMethod === 'Cash on Delivery' ? 'border-[#0ea5e9] bg-[#0ea5e9]/10' : 'border-[#374151] bg-[#1f2937] hover:border-gray-500'}`}>
                                    <input 
                                        type="radio" 
                                        name="paymentMethod" 
                                        value="Cash on Delivery"
                                        checked={paymentMethod === 'Cash on Delivery'}
                                        onChange={() => setPaymentMethod('Cash on Delivery')}
                                        className="w-5 h-5 text-[#0ea5e9] bg-[#0b0f19] border-gray-600 focus:ring-[#0ea5e9]"
                                    />
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-[#0b0f19] flex items-center justify-center text-green-500">
                                            <FaMoneyBillWave size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white">Cash on Delivery</h4>
                                            <p className="text-xs text-gray-400">Pay when you receive</p>
                                        </div>
                                    </div>
                                </label>
                                
                                <label className={`cursor-pointer rounded-xl border p-4 flex items-center gap-4 transition-colors ${paymentMethod === 'Card Payment' ? 'border-[#0ea5e9] bg-[#0ea5e9]/10' : 'border-[#374151] bg-[#1f2937] hover:border-gray-500'}`}>
                                    <input 
                                        type="radio" 
                                        name="paymentMethod" 
                                        value="Card Payment"
                                        checked={paymentMethod === 'Card Payment'}
                                        onChange={() => setPaymentMethod('Card Payment')}
                                        className="w-5 h-5 text-[#0ea5e9] bg-[#0b0f19] border-gray-600 focus:ring-[#0ea5e9]"
                                    />
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-[#0b0f19] flex items-center justify-center text-blue-500">
                                            <FaCreditCard size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white">Card Payment</h4>
                                            <p className="text-xs text-gray-400">Pay securely via card</p>
                                        </div>
                                    </div>
                                </label>
                            </div>

                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full py-4 bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-bold text-lg rounded-xl flex justify-center items-center gap-2 transition-colors shadow-[0_0_15px_rgba(14,165,233,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Processing..." : (
                                    <>
                                        <FaCheckCircle /> Place Order
                                    </>
                                )}
                            </button>

                        </form>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:w-1/3">
                        <div className="bg-[#111827] rounded-2xl p-6 border border-[#1f2937] sticky top-24 shadow-xl">
                            <h3 className="text-xl font-bold mb-6 pb-2 border-b border-[#374151]">Order Summary</h3>
                            
                            <div className="max-h-[300px] overflow-y-auto pr-2 mb-6 space-y-4 custom-scrollbar">
                                {cart.map((item, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <div className="w-16 h-16 bg-white rounded-md p-1 flex-shrink-0">
                                            <img src={item.image || '/placeholder.png'} alt={item.name} className="w-full h-full object-contain" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-bold text-white line-clamp-2">
                                                <span className="text-[#0ea5e9] mr-1">{item.productCode}</span> 
                                                {item.name}
                                            </h4>
                                            <div className="flex justify-between items-center mt-1">
                                                <span className="text-xs text-gray-400">Qty: {item.quantity}</span>
                                                <span className="text-sm font-bold text-[#0ea5e9]">{getFormattedPrice(item.price * item.quantity)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-[#374151] pt-4 space-y-3 mb-6">
                                <div className="flex justify-between text-gray-400 text-sm">
                                    <span>Total Items</span>
                                    <span>{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
                                </div>
                                <div className="flex justify-between text-gray-400 text-sm">
                                    <span>Subtotal</span>
                                    <span>{getFormattedPrice(getCartTotal())}</span>
                                </div>
                                <div className="flex justify-between text-gray-400 text-sm">
                                    <span>Shipping</span>
                                    <span className="text-white">Free</span>
                                </div>
                            </div>
                            
                            <div className="border-t border-[#374151] pt-4 flex justify-between items-end">
                                <span className="text-lg font-bold">Grand Total</span>
                                <span className="text-2xl font-bold text-[#0ea5e9]">{getFormattedPrice(getCartTotal())}</span>
                            </div>
                            
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}