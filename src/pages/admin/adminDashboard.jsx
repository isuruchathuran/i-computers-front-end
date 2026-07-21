import { useEffect, useState } from 'react';
import axios from 'axios';
import { MdOutlineInventory2 } from "react-icons/md";
import { FaRegListAlt, FaMoneyBillWave } from "react-icons/fa";
import { LuUsersRound } from "react-icons/lu";
import LoadingAnimation from '../../components/loadingAnimation';
import getFormattedPrice from '../../utils/price-format';
import getFormattedDate from '../../utils/date-format';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const response = await axios.get(`${import.meta.env.VITE_API_URL}/dashboard`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setData(response.data);
            } catch (error) {
                toast.error("Failed to fetch dashboard data");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return <LoadingAnimation />;
    }

    if (!data) {
        return <div className="p-4 text-center">No data available</div>;
    }

    return (
        <div className="w-full h-full flex flex-col hide-scroll-track overflow-y-auto">
            <div className="w-full p-6 text-white rounded-xl mb-6 shadow-md" style={{ background: 'linear-gradient(to right, #4facfe, #00f2fe, #a18cd1)' }}>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-white/80 mt-1">Overview of your store performance</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-blue-500 flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm font-semibold mb-1">Total Products</p>
                        <h2 className="text-3xl font-bold text-secondary">{data.totalProducts || 0}</h2>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 text-2xl">
                        <MdOutlineInventory2 />
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-green-500 flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm font-semibold mb-1">Total Orders</p>
                        <h2 className="text-3xl font-bold text-secondary">{data.totalOrders || 0}</h2>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-500 text-2xl">
                        <FaRegListAlt />
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-purple-500 flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm font-semibold mb-1">Total Customers</p>
                        <h2 className="text-3xl font-bold text-secondary">{data.totalUsers || 0}</h2>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-500 text-2xl">
                        <LuUsersRound />
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-amber-500 flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm font-semibold mb-1">Total Revenue</p>
                        <h2 className="text-3xl font-bold text-secondary">{getFormattedPrice(data.totalRevenue || 0)}</h2>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-500 text-2xl">
                        <FaMoneyBillWave />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-lg p-4 shadow text-center">
                    <p className="text-gray-500 text-xs uppercase font-bold">Categories</p>
                    <p className="text-xl font-bold text-secondary mt-1">{data.totalCategories || 0}</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow text-center">
                    <p className="text-gray-500 text-xs uppercase font-bold">Pending Orders</p>
                    <p className="text-xl font-bold text-yellow-600 mt-1">{data.pendingOrders || 0}</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow text-center">
                    <p className="text-gray-500 text-xs uppercase font-bold">Delivered</p>
                    <p className="text-xl font-bold text-green-600 mt-1">{data.deliveredOrders || 0}</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow text-center">
                    <p className="text-gray-500 text-xs uppercase font-bold">Cancelled</p>
                    <p className="text-xl font-bold text-red-600 mt-1">{data.cancelledOrders || 0}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-4 border-b">
                        <h3 className="text-lg font-bold text-secondary">Recent Orders</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead style={{ background: 'linear-gradient(to right, #4facfe, #00f2fe, #a18cd1)' }} className="text-white">
                                <tr>
                                    <th className="p-3">Order ID</th>
                                    <th className="p-3">Customer</th>
                                    <th className="p-3">Total</th>
                                    <th className="p-3">Status</th>
                                    <th className="p-3">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.recentOrders?.map((order, index) => (
                                    <tr key={index} className="border-b hover:bg-gray-50">
                                        <td className="p-3 font-mono text-sm">{order._id || order.orderId}</td>
                                        <td className="p-3">{order.email}</td>
                                        <td className="p-3">{getFormattedPrice(order.total || 0)}</td>
                                        <td className="p-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                                                order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="p-3 text-sm">{getFormattedDate(order.date || order.createdAt)}</td>
                                    </tr>
                                ))}
                                {(!data.recentOrders || data.recentOrders.length === 0) && (
                                    <tr>
                                        <td colSpan="5" className="p-4 text-center text-gray-500">No recent orders found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-4 border-b">
                        <h3 className="text-lg font-bold text-secondary">Low Stock Alerts</h3>
                    </div>
                    <div className="p-4 flex flex-col gap-3">
                        {data.lowStockProducts?.map((product, index) => (
                            <div key={index} className="flex justify-between items-center p-3 border rounded-lg bg-red-50 border-red-100">
                                <div>
                                    <p className="font-semibold text-sm text-secondary">{product.name}</p>
                                    <p className="text-xs text-gray-500">{product.category}</p>
                                </div>
                                <div className="text-center">
                                    <span className="block text-lg font-bold text-red-600">{product.quantity || product.stock}</span>
                                    <span className="text-[10px] uppercase text-red-500 font-bold">Left</span>
                                </div>
                            </div>
                        ))}
                        {(!data.lowStockProducts || data.lowStockProducts.length === 0) && (
                            <p className="text-center text-gray-500 mt-4">All products are well stocked</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <h3 className="text-lg font-bold text-secondary mb-6">Monthly Revenue Summary</h3>
                <div className="flex items-end gap-2 h-48">
                    {data.monthlyRevenue?.map((month, index) => {
                        const maxRevenue = Math.max(...data.monthlyRevenue.map(m => m.amount || 0), 1);
                        const height = `${((month.amount || 0) / maxRevenue) * 100}%`;
                        return (
                            <div key={index} className="flex-1 flex flex-col justify-end items-center group relative">
                                <div 
                                    className="w-full bg-accent hover:bg-secondary transition-colors rounded-t-sm"
                                    style={{ height, minHeight: '4px' }}
                                >
                                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10 pointer-events-none transition-opacity">
                                        {getFormattedPrice(month.amount || 0)}
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-2 truncate w-full text-center">{month.month}</p>
                            </div>
                        )
                    })}
                    {(!data.monthlyRevenue || data.monthlyRevenue.length === 0) && (
                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                            No revenue data available
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
