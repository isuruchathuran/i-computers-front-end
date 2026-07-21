import axios from "axios";
import { useEffect, useState } from "react"

import toast from "react-hot-toast";
import CustomersViewOrderInfoModal from "../components/CustomersviewOrderInfoModal";
import LoadingAnimation from "../components/loadingAnimation";
import getFormattedDate from "../utils/date-format";
import getFormattedPrice from "../utils/price-format";

export default function MyOrdersPage() {

    const [orders, setOrders] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);


    useEffect(
    
        
        () => {
            if (!isLoaded) {
                const token = localStorage.getItem("token");

                axios.get(import.meta.env.VITE_API_URL + "/orders/" + pageSize + "/" + pageNumber, {
                    headers : {
                        Authorization : "Bearer "+token
                    }
                }).then(
                    (response)=>{
                        setOrders(response.data.orders);
                        setTotalPages(response.data.totalPages);
                        setIsLoaded(true);
                    }
                )
            }
        }
        ,[isLoaded]
    )

    const getStatusColor = (status) => {
        switch ((status || "").toLowerCase()) {
            case 'pending': return 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20';
            case 'processing': return 'bg-blue-500/10 text-blue-500 border border-blue-500/20';
            case 'shipped': return 'bg-purple-500/10 text-purple-500 border border-purple-500/20';
            case 'delivered': return 'bg-green-500/10 text-green-500 border border-green-500/20';
            case 'cancelled': return 'bg-red-500/10 text-red-500 border border-red-500/20';
            default: return 'bg-gray-500/10 text-gray-400 border border-gray-500/20';
        }
    }

    return (
        <div className="w-full min-h-[calc(100vh-80px)] bg-[#0b0f19] pt-10 pb-20">
            <div className="container mx-auto px-4 max-w-7xl">
                
                {/* HEADER */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">My Orders</h1>
                        <p className="text-gray-400 text-sm">
                            View and track your past orders here.
                        </p>
                    </div>
                </div>

                {/* TABLE CONTAINER */}
                <div className="bg-[#111827] rounded-2xl border border-[#1f2937] overflow-hidden shadow-xl flex flex-col min-h-[500px] relative pb-20">

                    {/* LOADING */}
                    {!isLoaded ? (
                        <div className="w-full flex-1 flex justify-center items-center">
                            <LoadingAnimation />
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm text-left">

                                <thead className="bg-[#1f2937] text-gray-300 text-xs uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold border-b border-[#374151]">Order ID</th>
                                        <th className="px-6 py-4 font-semibold border-b border-[#374151]">Date</th>
                                        <th className="px-6 py-4 font-semibold border-b border-[#374151]">Payment</th>
                                        <th className="px-6 py-4 font-semibold border-b border-[#374151]">Total</th>
                                        <th className="px-6 py-4 font-semibold border-b border-[#374151]">Status</th>
                                        <th className="px-6 py-4 font-semibold border-b border-[#374151] text-right">Actions</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-[#1f2937] text-gray-300">
                                    {orders.map((order) => (
                                        <tr key={order.orderId} className="hover:bg-[#1f2937]/50 transition-colors">
                                            <td className="px-6 py-4 font-mono text-xs">{order.orderId}</td>
                                            
                                            <td className="px-6 py-4 text-gray-400 whitespace-nowrap">
                                                {getFormattedDate(order.date)}
                                            </td>
                                            
                                            <td className="px-6 py-4 text-gray-400 whitespace-nowrap">
                                                {order.paymentMethod || "Cash on Delivery"}
                                            </td>

                                            <td className="px-6 py-4 font-bold text-[#0ea5e9] whitespace-nowrap">
                                                {getFormattedPrice(order.total)}
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1 text-xs rounded-full font-medium capitalize ${getStatusColor(order.status)}`}>
                                                    {order.status || 'pending'}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-right">
                                                <CustomersViewOrderInfoModal order={order} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            
                            {orders.length === 0 && (
                                <div className="w-full py-12 flex flex-col items-center justify-center text-gray-500">
                                    <p>You haven't placed any orders yet.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* PAGINATION */}
                    <div className="absolute bottom-0 left-0 w-full bg-[#1f2937] border-t border-[#374151] p-4 flex justify-between items-center">
                        
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span>Show</span>
                            <select
                                value={pageSize}
                                onChange={(e) => {
                                    setPageSize(parseInt(e.target.value));
                                    setPageNumber(1);   
                                    setIsLoaded(false); 
                                }}
                                className="bg-[#0b0f19] border border-[#374151] rounded px-2 py-1 text-white focus:outline-none focus:border-[#0ea5e9]"
                            >
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                            </select>
                            <span>entries</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <button 
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${pageNumber > 1 ? 'bg-[#0b0f19] text-white hover:bg-[#374151] border border-[#374151]' : 'bg-[#0b0f19] text-gray-600 border border-[#1f2937] cursor-not-allowed'}`}
                                onClick={() => {
                                    if (pageNumber > 1) {
                                        setPageNumber(pageNumber - 1);
                                        setIsLoaded(false);
                                    }
                                }}
                                disabled={pageNumber <= 1}
                            >
                                Previous
                            </button>

                            <span className="text-sm text-gray-400">
                                Page <span className="text-white font-medium">{pageNumber}</span> of <span className="text-white font-medium">{totalPages || 1}</span>
                            </span>

                            <button 
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${pageNumber < totalPages ? 'bg-[#0b0f19] text-white hover:bg-[#374151] border border-[#374151]' : 'bg-[#0b0f19] text-gray-600 border border-[#1f2937] cursor-not-allowed'}`}
                                onClick={() => {
                                    if (pageNumber < totalPages) {
                                        setPageNumber(pageNumber + 1);
                                        setIsLoaded(false);
                                    }
                                }}
                                disabled={pageNumber >= totalPages}
                            >
                                Next
                            </button>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}