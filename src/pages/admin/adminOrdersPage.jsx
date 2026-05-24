import axios from "axios";
import { useEffect, useState } from "react"
import LoadingAnimation from "../../components/loadingAnimation";
import getFormattedPrice from "../../utils/price-format";
import getFormattedDate from "../../utils/date-format";
import toast from "react-hot-toast";
import ViewOrderInfoModal from "../../components/viewOrderinfoModal";

export default function AdminOrdersPage() {

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

    return (
        <div className="w-full h-full overflow-y-auto hide-scroll-track relative">

            {/* HEADER */}
            <h1
                className="w-full text-3xl font-bold mb-4 sticky top-0 text-white p-3 rounded-lg z-10"
                style={{
                    background: "linear-gradient(to right, #4facfe, #00f2fe, #a18cd1)",
                }}
            >
                Orders
                <p className="text-blue-50 mt-3 text-sm leading-6">
                    View and manage all customer orders with ease.
                </p>
            </h1>

            {/* TABLE CONTAINER */}
            <div className="overflow-x-auto rounded-xl shadow-lg border border-[var(--color-primary)] bg-white relative pb-[80px]">

                {/* LOADING */}
                {!isLoaded ? (
                    <div className="w-full min-h-[300px] flex justify-center items-center bg-white">
                        <LoadingAnimation />
                    </div>
                ) : (
                    <table className="min-w-full text-sm text-[var(--color-secondary)]">

                        <thead>
                            <tr style={{
                                background: "linear-gradient(to right, #4facfe, #00f2fe, #a18cd1)",
                            }}>
                                <th className="px-4 py-3 text-left text-white uppercase text-xs">Order ID</th>
                                <th className="px-4 py-3 text-left text-white uppercase text-xs">Customer Name</th>
                                <th className="px-4 py-3 text-left text-white uppercase text-xs">Email</th>
                                <th className="px-4 py-3 text-left text-white uppercase text-xs">Date</th>
                                <th className="px-4 py-3 text-left text-white uppercase text-xs">Total</th>
                                <th className="px-4 py-3 text-left text-white uppercase text-xs">Status</th>
                                <th className="px-4 py-3 text-left text-white uppercase text-xs">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-[var(--color-primary)]">

                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-[var(--color-primary)] transition">

                                    <td className="px-4 py-3">{order.orderId}</td>

                                    <td className="px-4 py-3">
                                        {order.firstName} {order.lastName}
                                    </td>

                                    <td className="px-4 py-3">{order.email}</td>

                                    <td className="px-4 py-3">
                                        {getFormattedDate(order.date)}
                                    </td>

                                    <td className="px-4 py-3 font-semibold text-red-500">
                                        {getFormattedPrice(order.total)}
                                    </td>

                                    <td className="px-4 py-3">
                                        <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                                            {order.status}
                                        </span>
                                    </td>

                                    <td className="px-4 py-3">
                                        <ViewOrderInfoModal order={order} />
                                    </td>

                                </tr>
                            ))}

                        </tbody>

                    </table>
                )}

                {/* FOOTER (PAGINATION AREA) */}
                <div className="w-full h-[70px] flex justify-center items-center absolute bottom-0 left-0 backdrop-blur-md border-t border-white/10">

                    <div className="w-[500px] h-[70px] bg-secondary shadow-xl rounded-2xl flex items-center justify-center px-4 gap-7 justify-between px-2 ">

                        <button className="bg-accent w-[100px] text-white p-2 rounded-full cursor-pointer hover:bg-accent/80"
                            onClick={() => {
                                if (pageNumber > 1) {
                                    setPageNumber(pageNumber - 1);
                                    setIsLoaded(true);
                                } else {
                                    toast.success("You are on the First Page");
                                }
                            }}
                        >
                            Previous
                        </button>

                        <span className="text-sm text-white w-[100px] text-center">
                            page {pageNumber} of {totalPages}
                        </span>

                        <button className="bg-accent text-white p-2 rounded-full w-[100px] cursor-pointer hover:bg-accent/80"
                            onClick={() => {
                                if (pageNumber < totalPages) {
                                    setPageNumber(pageNumber + 1);
                                    setIsLoaded(true);
                                } else {
                                    toast.success("You are on the Last Page");
                                }
                            }}
                        >
                            Next
                        </button>

                        <select
                            value={pageSize}
                            onChange={(e) => {
                                setPageSize(parseInt(e.target.value));
                                setPageNumber(1);   
                                setIsLoaded(false); 
                            }}
                            className="ml-5 border border-gray-300 rounded-full px-4 py-2 text-sm
               bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400
               hover:border-blue-400 transition"
                        >
                            {/* <option value={2}>2 per page</option>
                            <option value={5}>5 per page</option> */}
                            <option value={10}>10 per page</option>
                            <option value={20}>20 per page</option>
                            <option value={50}>50 per page</option>
                        </select>

                    </div>

                </div>

            </div>

        </div>
    );
}