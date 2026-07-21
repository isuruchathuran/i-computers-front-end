import { useEffect, useState } from 'react';
import axios from 'axios';
import { MdOutlineInventory2 } from "react-icons/md";
import { FaRegListAlt, FaMoneyBillWave } from "react-icons/fa";
import { LuUsersRound } from "react-icons/lu";
import LoadingAnimation from '../../components/loadingAnimation';
import getFormattedPrice from '../../utils/price-format';
import getFormattedDate from '../../utils/date-format';
import toast from 'react-hot-toast';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
        return (
            <div className="w-full h-full flex justify-center items-center">
                <LoadingAnimation />
            </div>
        );
    }

    if (!data) {
        return (
            <div className="w-full h-full flex flex-col justify-center items-center text-gray-500">
                <p className="text-xl font-bold">No dashboard data available</p>
            </div>
        );
    }

    // Format monthly revenue for recharts
    const chartData = data.monthlyRevenue?.map(item => ({
        name: `Month ${item._id.month}`,
        Revenue: item.revenue
    })).reverse() || []; // Reverse to show chronological order if backend sorts descending

    return (
        <div className="w-full h-full flex flex-col hide-scroll-track overflow-y-auto pb-10">
            
            <div className="w-full mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
                <p className="text-gray-400">Welcome back, here's what's happening with your store today.</p>
            </div>

            {/* Statistic Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                
                {/* Products Card */}
                <div className="bg-[#111827] rounded-2xl p-6 border border-[#1f2937] shadow-xl hover:border-[#0ea5e9]/50 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] transition-all duration-300 group">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-gray-400 text-sm font-medium mb-1">Total Products</p>
                            <h2 className="text-3xl font-bold text-white group-hover:text-[#0ea5e9] transition-colors">{data.totalProducts || 0}</h2>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 flex items-center justify-center text-[#0ea5e9] text-2xl group-hover:scale-110 transition-transform">
                            <MdOutlineInventory2 />
                        </div>
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                        <span className="text-[#0ea5e9] font-bold">In {data.totalCategories || 0} Categories</span>
                    </div>
                </div>

                {/* Orders Card */}
                <div className="bg-[#111827] rounded-2xl p-6 border border-[#1f2937] shadow-xl hover:border-[#10b981]/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all duration-300 group">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-gray-400 text-sm font-medium mb-1">Total Orders</p>
                            <h2 className="text-3xl font-bold text-white group-hover:text-[#10b981] transition-colors">{data.totalOrders || 0}</h2>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-[#10b981]/10 border border-[#10b981]/20 flex items-center justify-center text-[#10b981] text-2xl group-hover:scale-110 transition-transform">
                            <FaRegListAlt />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                        <span className="text-yellow-500 font-bold">{data.pendingOrders || 0} Pending</span>
                        <span className="text-gray-600">|</span>
                        <span className="text-[#10b981] font-bold">{data.deliveredOrders || 0} Delivered</span>
                    </div>
                </div>

                {/* Customers Card */}
                <div className="bg-[#111827] rounded-2xl p-6 border border-[#1f2937] shadow-xl hover:border-[#8b5cf6]/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] transition-all duration-300 group">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-gray-400 text-sm font-medium mb-1">Total Customers</p>
                            <h2 className="text-3xl font-bold text-white group-hover:text-[#8b5cf6] transition-colors">{data.totalUsers || 0}</h2>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 flex items-center justify-center text-[#8b5cf6] text-2xl group-hover:scale-110 transition-transform">
                            <LuUsersRound />
                        </div>
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                        <span className="text-[#8b5cf6] font-bold">Registered Users</span>
                    </div>
                </div>

                {/* Revenue Card */}
                <div className="bg-[#111827] rounded-2xl p-6 border border-[#1f2937] shadow-xl hover:border-[#f59e0b]/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] transition-all duration-300 group">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-gray-400 text-sm font-medium mb-1">Total Revenue</p>
                            <h2 className="text-3xl font-bold text-white group-hover:text-[#f59e0b] transition-colors">{getFormattedPrice(data.totalRevenue || 0)}</h2>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-[#f59e0b]/10 border border-[#f59e0b]/20 flex items-center justify-center text-[#f59e0b] text-2xl group-hover:scale-110 transition-transform">
                            <FaMoneyBillWave />
                        </div>
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                        <span className="text-[#f59e0b] font-bold">Lifetime Earnings</span>
                    </div>
                </div>
            </div>

            {/* Main Analytics Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                
                {/* Sales Overview Chart */}
                <div className="lg:col-span-2 bg-[#111827] rounded-2xl border border-[#1f2937] shadow-xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-white">Sales Overview</h3>
                        <select className="bg-[#1f2937] border border-[#374151] text-sm text-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#0ea5e9]">
                            <option>This Year</option>
                            <option>Last Year</option>
                        </select>
                    </div>
                    
                    <div className="h-[300px] w-full">
                        {chartData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                                    <XAxis dataKey="name" stroke="#6b7280" tick={{fill: '#9ca3af', fontSize: 12}} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#6b7280" tick={{fill: '#9ca3af', fontSize: 12}} tickLine={false} axisLine={false} tickFormatter={(value) => `Rs.${value/1000}k`} />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '8px', color: '#fff' }}
                                        itemStyle={{ color: '#0ea5e9', fontWeight: 'bold' }}
                                    />
                                    <Area type="monotone" dataKey="Revenue" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-500">
                                No sales data available for chart
                            </div>
                        )}
                    </div>
                </div>

                {/* Low Stock Alerts */}
                <div className="bg-[#111827] rounded-2xl border border-[#1f2937] shadow-xl p-6 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                            Low Stock Alerts
                        </h3>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-3">
                        {data.lowStockProducts?.length > 0 ? (
                            data.lowStockProducts.map((product, index) => (
                                <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-[#1f2937]/50 border border-red-500/20 hover:border-red-500/50 hover:bg-[#1f2937] transition-all">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-gray-800 overflow-hidden shrink-0">
                                            <img src={product.images?.[0] || '/placeholder.png'} alt={product.productName} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white line-clamp-1">{product.productName}</p>
                                            <p className="text-xs text-gray-400">{product.category}</p>
                                        </div>
                                    </div>
                                    <div className="text-center px-3 py-1 rounded-lg bg-red-500/10 border border-red-500/20">
                                        <span className="block text-sm font-bold text-red-500">{product.qty}</span>
                                        <span className="text-[9px] uppercase font-bold text-red-400/80">Left</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 py-10">
                                <MdOutlineInventory2 size={40} className="mb-2 text-gray-600" />
                                <p>All products well stocked!</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>

            {/* Recent Orders Table Row */}
            <div className="bg-[#111827] rounded-2xl border border-[#1f2937] shadow-xl overflow-hidden">
                <div className="p-6 border-b border-[#1f2937] flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white">Recent Orders</h3>
                    <button className="text-sm text-[#0ea5e9] hover:text-white transition-colors font-medium">View All</button>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-[#1f2937]/50 text-gray-400 text-sm uppercase tracking-wider">
                            <tr>
                                <th className="p-4 font-semibold">Order ID</th>
                                <th className="p-4 font-semibold">Customer</th>
                                <th className="p-4 font-semibold">Date</th>
                                <th className="p-4 font-semibold">Amount</th>
                                <th className="p-4 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {data.recentOrders?.length > 0 ? (
                                data.recentOrders.map((order, index) => (
                                    <tr key={index} className="border-b border-[#1f2937] hover:bg-[#1f2937]/30 transition-colors">
                                        <td className="p-4 font-mono text-gray-300">#{order.orderId.substring(0,8)}</td>
                                        <td className="p-4 font-medium text-white">{order.email}</td>
                                        <td className="p-4 text-gray-400">{getFormattedDate(order.date)}</td>
                                        <td className="p-4 font-bold text-[#0ea5e9]">{getFormattedPrice(order.total)}</td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                order.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                                                order.status === 'Shipped' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                                                order.status === 'Delivered' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                                                'bg-red-500/10 text-red-500 border border-red-500/20'
                                            }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-gray-500">
                                        No recent orders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}
