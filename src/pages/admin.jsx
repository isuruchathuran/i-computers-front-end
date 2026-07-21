import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaListUl, FaRegListAlt, FaSignOutAlt, FaHome, FaBell, FaSearch, FaUserShield } from "react-icons/fa";
import { MdOutlineInventory2, MdDashboard, MdSettings } from "react-icons/md";
import { LuUsersRound } from "react-icons/lu";
import { BsBarChartFill } from "react-icons/bs";
import AdminProductsPage from "./admin/adminProductsPage";
import AdminAddProductPage from "./admin/adminAddProduct";
import AdminUpdateProductPage from "./admin/adminUpdateProductPage";
import AdminOrdersPage from "./admin/adminOrdersPage";
import AdminDashboard from "./admin/adminDashboard";
import AdminUsersPage from "./admin/adminUsersPage";
import toast from "react-hot-toast";

export default function AdminPage(){
    const location = useLocation();
    const navigate = useNavigate();
    const [adminUser, setAdminUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.get(import.meta.env.VITE_API_URL + "/users/profile", {
                headers: { "Authorization" : `Bearer ${token}` }
            }).then((res) => {
                setAdminUser(res.data);
            }).catch(() => {
                localStorage.removeItem("token");
                navigate("/login");
            });
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return(
        <div className="w-full h-screen flex bg-[#0b0f19] overflow-hidden text-white">
            
            {/* Sidebar */}
            <div className="w-[280px] h-full flex flex-col bg-[#111827] border-r border-[#1f2937] shrink-0 z-20">
                
                <div className="p-6 border-b border-[#1f2937] flex items-center justify-center">
                    <Link to="/" className="text-2xl font-bold tracking-widest flex items-center gap-2 transition-transform hover:scale-105">
                        <FaUserShield className="text-[#0ea5e9]" size={28} />
                        <span className="text-[#0ea5e9]">ISURU</span> ADMIN
                    </Link>
                </div>

                <div className="flex flex-col p-4 gap-2 flex-1 overflow-y-auto hide-scroll-track">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 mt-4 px-4">Menu</p>
                    
                    <Link className={`flex w-full px-4 py-3.5 gap-4 items-center rounded-xl transition-all duration-300 font-medium ${location.pathname === '/admin/dashboard' || location.pathname === '/admin' || location.pathname === '/admin/' ? 'bg-[#0ea5e9] text-white shadow-[0_0_15px_rgba(14,165,233,0.3)]' : 'text-gray-400 hover:bg-[#1f2937] hover:text-white'}`} to="/admin/dashboard">
                        <MdDashboard size={22} /> Dashboard
                    </Link>
                    <Link className={`flex w-full px-4 py-3.5 gap-4 items-center rounded-xl transition-all duration-300 font-medium ${location.pathname.includes('/admin/products') || location.pathname.includes('/admin/add-product') || location.pathname.includes('/admin/update-product') ? 'bg-[#0ea5e9] text-white shadow-[0_0_15px_rgba(14,165,233,0.3)]' : 'text-gray-400 hover:bg-[#1f2937] hover:text-white'}`} to="/admin/products">
                        <MdOutlineInventory2 size={22} /> Manage Products
                    </Link>
                    <Link className={`flex w-full px-4 py-3.5 gap-4 items-center rounded-xl transition-all duration-300 font-medium ${location.pathname.includes('/admin/orders') ? 'bg-[#0ea5e9] text-white shadow-[0_0_15px_rgba(14,165,233,0.3)]' : 'text-gray-400 hover:bg-[#1f2937] hover:text-white'}`} to="/admin/orders">
                        <FaRegListAlt size={22} /> Manage Orders
                    </Link>
                    <Link className={`flex w-full px-4 py-3.5 gap-4 items-center rounded-xl transition-all duration-300 font-medium ${location.pathname.includes('/admin/users') ? 'bg-[#0ea5e9] text-white shadow-[0_0_15px_rgba(14,165,233,0.3)]' : 'text-gray-400 hover:bg-[#1f2937] hover:text-white'}`} to="/admin/users">
                        <LuUsersRound size={22} /> Manage Users
                    </Link>
                    
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 mt-6 px-4">Analytics & Config</p>
                    
                    <Link className={`flex w-full px-4 py-3.5 gap-4 items-center rounded-xl transition-all duration-300 font-medium ${location.pathname.includes('/admin/reports') ? 'bg-[#0ea5e9] text-white shadow-[0_0_15px_rgba(14,165,233,0.3)]' : 'text-gray-400 hover:bg-[#1f2937] hover:text-white'}`} to="/admin/dashboard">
                        <BsBarChartFill size={22} /> Reports
                    </Link>
                    <Link className={`flex w-full px-4 py-3.5 gap-4 items-center rounded-xl transition-all duration-300 font-medium ${location.pathname.includes('/admin/settings') ? 'bg-[#0ea5e9] text-white shadow-[0_0_15px_rgba(14,165,233,0.3)]' : 'text-gray-400 hover:bg-[#1f2937] hover:text-white'}`} to="/settings">
                        <MdSettings size={22} /> Settings
                    </Link>
                </div>

                <div className="p-4 border-t border-[#1f2937] flex flex-col gap-2">
                    <Link className="flex w-full px-4 py-3.5 gap-4 items-center rounded-xl text-gray-400 hover:bg-[#1f2937] hover:text-white transition-all duration-300 font-medium" to="/">
                        <FaHome size={22} /> Go to Store
                    </Link>
                    <button onClick={handleLogout} className="flex w-full px-4 py-3.5 gap-4 items-center rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-500 transition-all duration-300 font-medium">
                        <FaSignOutAlt size={22} /> Logout
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-full bg-[#0b0f19] relative z-10 overflow-hidden">
                
                {/* Top Navigation Bar */}
                <header className="h-[80px] w-full bg-[#111827]/80 backdrop-blur-md border-b border-[#1f2937] flex items-center justify-between px-8 shrink-0 z-20">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-bold text-white capitalize hidden md:block">
                            {location.pathname.split('/').pop().replace('-', ' ') || 'Dashboard'}
                        </h2>
                    </div>

                    <div className="flex items-center gap-6">
                        
                        {/* Search (Mock) */}
                        <div className="hidden md:flex items-center relative">
                            <input 
                                type="text" 
                                placeholder="Search..." 
                                className="bg-[#1f2937] border border-[#374151] rounded-full py-2 pl-4 pr-10 text-sm text-white focus:outline-none focus:border-[#0ea5e9] transition-colors w-64"
                            />
                            <FaSearch className="absolute right-3 text-gray-400" />
                        </div>

                        {/* Notification Icon */}
                        <button className="relative text-gray-400 hover:text-white transition-colors">
                            <FaBell size={20} />
                            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-[#111827]"></span>
                        </button>

                        {/* Admin Profile Section */}
                        <div className="flex items-center gap-3 pl-4 border-l border-[#374151]">
                            <div className="flex flex-col items-end">
                                <span className="text-sm font-bold text-white">{adminUser ? `${adminUser.firstName} ${adminUser.lastName}` : 'Admin User'}</span>
                                <span className="text-xs text-[#0ea5e9] font-medium capitalize">{adminUser?.role || 'Administrator'}</span>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-[#1f2937] border border-[#374151] overflow-hidden flex items-center justify-center cursor-pointer hover:border-[#0ea5e9] transition-colors">
                                {adminUser?.image ? (
                                    <img src={adminUser.image} alt="Admin" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-[#0ea5e9] font-bold">{adminUser?.firstName?.charAt(0) || 'A'}</span>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto p-8 relative">
                    {/* Background glow effects for the content area */}
                    <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-[#0ea5e9]/5 blur-[120px] rounded-full pointer-events-none"></div>
                    
                    <div className="max-w-7xl mx-auto relative z-10">
                        <Routes>
                            <Route path="/" element={<AdminDashboard/>}/>
                            <Route path="/dashboard" element={<AdminDashboard/>}/>
                            <Route path="/orders" element={<AdminOrdersPage/>}/>
                            <Route path="/products" element={<AdminProductsPage/>}/>
                            <Route path="/users" element={<AdminUsersPage/>}/>
                            <Route path="/add-product" element={<AdminAddProductPage/>}/>
                            <Route path="/update-product" element={<AdminUpdateProductPage/>}/>
                        </Routes>
                    </div>
                </div>
            </div>
         </div>
    )
}