import { useState } from "react";
import getFormattedDate from "../utils/date-format";
import getFormattedPrice from "../utils/price-format";
import { CgClose } from "react-icons/cg";
import axios from "axios";
import toast from "react-hot-toast";
import { confirmAction } from "../utils/confirmAction";

export default function ViewOrderInfoModal({ order }) {
    const [isVisible, setIsVisible] = useState(false);
    const [status, setStatus] = useState(order.status || "pending");
    const [notes, setNotes] = useState(order.notes || "");

    async function handleChange() {
        confirmAction({
            title: "Update Order?",
            text: "Are you sure you want to save these changes to the order?",
            icon: "question",
            confirmButtonText: "Yes, Update",
            confirmButtonColor: "#10b981",
            successTitle: "Order Updated",
            successText: "The order status and notes have been updated.",
            onConfirm: async () => {
                const token = localStorage.getItem("token")
                await axios.put(import.meta.env.VITE_API_URL + "/orders/" + order.orderId, {
                    status: status,
                    notes: notes
                }, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
            },
            onSuccess: () => {
                window.location.reload()
            }
        });
    }

    const getStatusColor = (currentStatus) => {
        const s = currentStatus.toLowerCase();
        if (s === "pending") return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
        if (s === "shipped") return "bg-blue-500/10 text-blue-500 border-blue-500/20";
        if (s === "delivered") return "bg-green-500/10 text-green-500 border-green-500/20";
        if (s === "cancelled") return "bg-red-500/10 text-red-500 border-red-500/20";
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    };

    return (
        <>
            <button
                className="px-3 py-1.5 text-[#0ea5e9] border border-[#0ea5e9]/30 rounded-lg text-sm font-semibold hover:bg-[#0ea5e9]/10 transition-colors shadow-sm"
                onClick={() => setIsVisible(true)}
            >
                View Details
            </button>

            {isVisible && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] px-4 text-left">
                    
                    <div className="w-full max-w-[1000px] min-h-[80vh] max-h-[90vh] bg-[#111827] rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-[#1f2937] overflow-hidden flex flex-col md:flex-row relative">
                        
                        <button
                            onClick={() => setIsVisible(false)}
                            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#1f2937] text-gray-400 hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors z-10"
                        >
                            <CgClose size={20} />
                        </button>

                        {/* LEFT COLUMN: Info & Controls */}
                        <div className="w-full md:w-[40%] bg-[#0b0f19] border-r border-[#1f2937] p-8 flex flex-col justify-between overflow-y-auto hide-scroll-track">
                            
                            <div className="space-y-8">
                                <div className="border-b border-[#1f2937] pb-6">
                                    <p className="text-xs uppercase tracking-widest text-[#0ea5e9] mb-2 font-bold">
                                        Order Details
                                    </p>
                                    <h1 className="text-3xl font-bold text-white mb-3">
                                        {order.orderId}
                                    </h1>
                                    <div className="inline-flex items-center gap-2 bg-[#1f2937] px-3 py-1.5 rounded-full border border-[#374151]">
                                        <span className="w-2 h-2 bg-[#0ea5e9] rounded-full animate-pulse"></span>
                                        <p className="text-xs text-gray-300 font-medium">
                                            {getFormattedDate(order.date)}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <p className="text-xs uppercase tracking-wider text-gray-500 mb-1 font-semibold">Customer</p>
                                        <p className="font-bold text-lg text-white">{order.firstName} {order.lastName}</p>
                                        <p className="text-sm text-gray-400">{order.email}</p>
                                        <p className="text-sm text-gray-400 mt-1">{order.phone}</p>
                                    </div>

                                    <div>
                                        <p className="text-xs uppercase tracking-wider text-gray-500 mb-1 font-semibold">Shipping Address</p>
                                        <p className="text-sm text-gray-300">{order.addressLine1}</p>
                                        {order.addressLine2 && <p className="text-sm text-gray-300">{order.addressLine2}</p>}
                                        <p className="text-sm text-gray-300">{order.city}, {order.postalCode}</p>
                                        <p className="text-sm text-gray-300">{order.country}</p>
                                    </div>

                                    <div>
                                        <p className="text-xs uppercase tracking-wider text-gray-500 mb-3 font-semibold">Order Status</p>
                                        <div className="flex flex-col gap-3">
                                            <span className={`w-fit px-4 py-1.5 rounded-full text-sm font-bold border capitalize ${getStatusColor(status)}`}>
                                                {status}
                                            </span>
                                            <select
                                                value={status}
                                                onChange={(e) => setStatus(e.target.value)}
                                                className="bg-[#1f2937] text-white border border-[#374151] rounded-lg px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-[#0ea5e9] transition-colors"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="processing">Processing</option>
                                                <option value="shipped">Shipped</option>
                                                <option value="delivered">Delivered</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-xs uppercase tracking-wider text-gray-500 mb-3 font-semibold">Admin Notes</p>
                                        <textarea
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                            placeholder="Add private order notes here..."
                                            className="w-full h-24 rounded-xl border border-[#374151] bg-[#1f2937] p-4 text-sm text-white placeholder-gray-500 resize-none outline-none focus:border-[#0ea5e9] transition-colors hide-scroll-track"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 bg-[#1f2937] rounded-2xl p-6 border border-[#374151]">
                                <p className="text-xs uppercase tracking-wider text-gray-400 mb-2 font-semibold">Total Amount</p>
                                <h2 className="text-3xl font-bold text-[#0ea5e9]">
                                    {getFormattedPrice(order.total)}
                                </h2>
                                <p className="text-xs text-gray-500 mt-2">Paid via {order.paymentMethod || "Cash on Delivery"}</p>
                            </div>
                        </div>


                        {/* RIGHT COLUMN: Items List */}
                        <div className="w-full md:w-[60%] p-8 bg-[#111827] flex flex-col h-full relative">
                            
                            <h2 className="text-xl font-bold text-white mb-6 border-b border-[#1f2937] pb-4 flex items-center gap-2">
                                <span className="w-1 h-6 bg-[#0ea5e9] rounded-full"></span>
                                Ordered Items
                            </h2>

                            <div className="flex-1 overflow-y-auto pr-2 space-y-4 hide-scroll-track mb-20">
                                {order.items?.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-4 bg-[#1f2937] p-4 rounded-xl border border-[#374151] hover:border-[#4b5563] transition-colors"
                                    >
                                        <div className="w-20 h-20 bg-white rounded-lg p-2 flex items-center justify-center flex-shrink-0">
                                            <img
                                                src={item.image || '/placeholder.png'}
                                                alt={item.name}
                                                className="max-w-full max-h-full object-contain"
                                                onError={(e) => { e.target.src = '/placeholder.png' }}
                                            />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-white text-sm line-clamp-2 mb-1">
                                                {(item.productCode && item.productCode !== "CODE-NA") && (
                                                    <span className="text-[#0ea5e9] mr-1">{item.productCode}</span>
                                                )}
                                                {item.name}
                                            </p>
                                            <div className="flex justify-between items-center mt-2">
                                                <p className="text-xs text-gray-400 bg-[#111827] px-2 py-1 rounded">
                                                    Qty: <span className="text-white font-bold">{item.qty}</span>
                                                </p>
                                                <p className="font-bold text-[#0ea5e9]">
                                                    {getFormattedPrice(item.price)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Sticky Save Button */}
                            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#111827] via-[#111827] to-transparent pointer-events-none">
                                <div className="pointer-events-auto">
                                    {(order.status !== status || order.notes !== notes) ? (
                                        <button 
                                            onClick={handleChange} 
                                            className="w-full py-4 rounded-xl bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-bold shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:-translate-y-1 transition-all"
                                        >
                                            Save Changes
                                        </button>
                                    ) : (
                                        <button 
                                            disabled 
                                            className="w-full py-4 rounded-xl bg-[#1f2937] text-gray-500 font-bold border border-[#374151] cursor-not-allowed"
                                        >
                                            No Changes Made
                                        </button>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </>
    );
}