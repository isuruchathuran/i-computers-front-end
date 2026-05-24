import { useState } from "react";
import getFormattedDate from "../utils/date-format";
import getFormattedPrice from "../utils/price-format";
import { CgClose } from "react-icons/cg";

export default function ViewOrderInfoModal(props) {

    const [isVisible, setIsVisible] = useState(false);
    const order = props.order;

    return (
        <>
        <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-600 hover:text-white transition cursor-pointer"
            onClick={() => setIsVisible(true)}
        >
            View Details
            </button>

            {isVisible && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">

                    <div className="w-full max-w-[900px] h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex relative">

                       
                        <button
                            onClick={() => setIsVisible(false)}
                            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-red-500 hover:text-white flex items-center justify-center transition"
                        >
                            <CgClose />
                        </button>

                        
                        <div className="w-[40%] bg-gradient-to-b bg-secondary text-white p-6 flex flex-col justify-between">

                            <div>
                                <h1 className="text-2xl font-bold">
                                    Order ID: {order.orderId}
                                </h1>

                                <p className="text-sm mt-1 opacity-90">
                                    {getFormattedDate(order.date)}
                                </p>

                                <div className="mt-6 space-y-3">
                                    <div>
                                        <p className="text-xs opacity-70">Customer</p>
                                        <p className="font-semibold">
                                            {order.firstName} {order.lastName}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs opacity-70">Email</p>
                                        <p className="text-sm">{order.email}</p>
                                    </div>

                                    <div>
                                        <p className="text-xs opacity-70">Status</p>
                                        <span className="inline-block mt-1 px-3 py-1 bg-green-400 rounded-full text-sm">
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <p className="text-xs opacity-70">Total Amount</p>
                                <h2 className="text-2xl font-bold">
                                    {getFormattedPrice(order.total)}
                                </h2>
                            </div>

                        </div>

                        
                        <div className="w-[60%] p-6 bg-gray-50 overflow-y-auto">

                            <h2 className="text-xl font-bold text-gray-800 mb-4 border-l-4 border-indigo-500 pl-3">
                                Ordered Items :
                            </h2>

                            <div className="grid gap-4">

                                {order.items.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"
                                    >
                                        <div className="flex items-center gap-4">

                                            <img
                                                src={item.images}
                                                alt={item.name}
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

                        </div>

                    </div>
                </div>
            )}

        </>
    );
}