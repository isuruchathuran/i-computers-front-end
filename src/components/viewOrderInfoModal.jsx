import { useState } from "react";
import getFormattedDate from "../utils/date-format";
import getFormattedPrice from "../utils/price-format";
import { CgClose } from "react-icons/cg";
import axios from "axios";
import toast from "react-hot-toast";

export default function ViewOrderInfoModal(props) {

    const [isVisible, setIsVisible] = useState(false);
    const order = props.order;

    const [status, setStatus] = useState(order.status);
    const [notes, setNotes] = useState(order.notes);

    async function handleChange() {
        try {
            const token = localStorage.getItem("token")
            await axios.put(import.meta.env.VITE_API_URL + "/orders/" + order.orderId, {
                status: status,
                notes: notes
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            toast.success("Order updated successfully.")
            window.location.reload()


        } catch {
            toast.error("Failed to update order.")
        }
    }

    return (
        <>
            <button
                className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-600 hover:text-white transition cursor-pointer"
                onClick={() => setIsVisible(true)}
            >
                View Details
            </button>

            {isVisible && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">


                    <div className="w-full max-w-[900px] min-h-[85vh] max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex relative">

                        <button
                            onClick={() => setIsVisible(false)}
                            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-red-500 hover:text-white flex items-center justify-center transition"
                        >
                            <CgClose />
                        </button>


                        <div className="w-[40%] bg-gradient-to-b bg-secondary text-white p-7 flex flex-col justify-between">

                            <div className="space-y-6 overflow-y-auto pr-2">

                                <div className="border-b border-white/20 pb-5">
                                    <p className="text-xs uppercase tracking-[3px] text-white/60 mb-2">
                                        Order Details
                                    </p>

                                    <h1 className="text-3xl font-bold break-words leading-snug">
                                        #{order.orderId}
                                    </h1>

                                    <div className="mt-3 inline-flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full">
                                        <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                                        <p className="text-xs text-gray-300">
                                            {getFormattedDate(order.date)}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-5">

                                    <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                                        <p className="text-xs uppercase tracking-wide text-white/60 mb-1">
                                            Customer
                                        </p>

                                        <p className="font-semibold text-lg">
                                            {order.firstName} {order.lastName}
                                        </p>
                                    </div>

                                    <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                                        <p className="text-xs uppercase tracking-wide text-white/60 mb-1">
                                            Email
                                        </p>

                                        <p className="text-sm break-words">
                                            {order.email}
                                        </p>
                                    </div>

                                    <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                                        <p className="text-xs uppercase tracking-wide text-white/60 mb-3">
                                            Order Status
                                        </p>

                                        <div className="flex items-center gap-3 flex-wrap">

                                            <span className={`
                                                px-4 py-1 rounded-full text-sm font-semibold shadow-sm
                                                ${status === "Processing" && "bg-yellow-400 text-black"}
                                                ${status === "Shipped" && "bg-blue-500 text-white"}
                                                ${status === "Delivered" && "bg-green-500 text-white"}
                                                ${status === "Cancelled" && "bg-red-500 text-white"}
                                            `}>
                                                {status}
                                            </span>

                                            <select
                                                value={status}
                                                onChange={(e) => setStatus(e.target.value)}
                                                className="bg-white text-gray-800 border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>

                                        </div>
                                    </div>

                                    <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                                        <p className="text-xs uppercase tracking-wide text-white/60 mb-3">
                                            Admin Notes
                                        </p>


                                        <textarea
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                            placeholder="Add order notes here..."
                                            className="w-full h-20 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md p-4 text-sm text-white placeholder:text-gray-200 resize-none outline-none focus:ring-2 focus:ring-white shadow-inner"
                                        />
                                    </div>

                                </div>
                            </div>


                            <div className="mt-6 bg-white/10 rounded-2xl p-5 backdrop-blur-sm">
                                <p className="text-xs uppercase tracking-wide text-white/60 mb-2">
                                    Total Amount
                                </p>

                                <h2 className="text-3xl font-bold">
                                    {getFormattedPrice(order.total)}
                                </h2>
                            </div>



                        </div>


                        <div className="w-[60%] p-6 bg-gray-50 overflow-y-auto">

                            <h2 className="text-xl font-bold text-gray-800 mb-4 border-l-4 border-indigo-500 pl-3">
                                Ordered Items :
                            </h2>

                            <div className="grid gap-4 pb-24">

                                {order.items.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"
                                    >
                                        <div className="flex items-center gap-4">

                                            <img
                                                src={item.image}
                                                alt={item.image}
                                                className="w-16 h-16 rounded-lg object-cover border"
                                            />

                                            <div>
                                                <p className="font-semibold text-gray-800">
                                                    {item.name}
                                                </p>

                                                <p className="text-xs text-gray-500">
                                                    Quantity: {item.qty}
                                                </p>
                                            </div>

                                        </div>

                                        <div className="text-right">
                                            <p className="font-semibold text-gray-700">
                                                {getFormattedPrice(item.price)}
                                            </p>
                                        </div>
                                    </div>
                                ))}

                            </div>

                            {/* BUTTON */}
                            <div className="sticky bottom-0 mt-6 bg-gray-50 pt-4 border-t border-gray-200">

                                {

                                    (order.status != status || order.notes != notes) &&
                                    <button onClick={handleChange} className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-95 transition-all duration-200">
                                        Save Changes
                                    </button>

                                }

                            </div>

                        </div>

                    </div>
                </div>
            )}

        </>
    );
}