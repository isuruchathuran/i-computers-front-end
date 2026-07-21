import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { confirmAction } from "../utils/confirmAction";

export default function UserData() {
    
    const [user, setUser] = useState(null)
    const [state , setState] = useState("me")
    const navigate = useNavigate();

    useEffect(
        () => {
            const token = localStorage.getItem("token")
            if (token != null) {
                axios.get(import.meta.env.VITE_API_URL + "/users/profile", {
                    headers: {
                        "Authorization" : `Bearer ${token}`
                    }
                }).then(
                    (response) => {
                        setUser(response.data)
                     }
                ).catch(
                    () => {
                        localStorage.removeItem("token")
                        navigate("/login")
                    }
                )
            }
        },[navigate]
    )

    return (
        <>
            {user==null ? (
                <div className="flex items-center gap-2">
                    <Link
                        to="/login"
                        className="px-5 py-2 rounded-lg border border-[#374151] text-gray-300 font-medium hover:bg-[#1f2937] hover:text-white transition-all duration-200"
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="px-5 py-2 rounded-lg bg-[#0ea5e9] text-white font-semibold hover:bg-[#0284c7] transition-all duration-200 shadow-[0_0_10px_rgba(14,165,233,0.3)]"
                    >
                        Register
                    </Link>
                </div>
            ) : ( 
                <div className="flex items-center gap-3 bg-[#111827] border border-[#1f2937] rounded-full px-2 py-1.5 shadow-lg hover:bg-[#1f2937]/80 transition-all duration-200">

                    {/* PROFILE IMAGE */}
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-[#374151]">
                        <img
                            src={user.image || "/images/default-profile.png"}
                            alt="profile"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* USER MENU */}
                    <div className="pr-2">
                        <select value={state}
                            onChange={(e) => {
                                setState(e.target.value)
                                
                                if (e.target.value === "admin") {
                                    navigate("/admin/dashboard")
                                }
                                else if (e.target.value === "orders") {
                                    navigate("/my-orders")
                                }
                                else if (e.target.value === "settings") {
                                    navigate("/settings")
                                }
                                else if (e.target.value === "logout") {
                                    confirmAction({
                                        title: "Logout?",
                                        text: "Are you sure you want to log out of your account?",
                                        icon: "question",
                                        confirmButtonText: "Yes, Logout",
                                        confirmButtonColor: "#ef4444",
                                        successTitle: "Logged Out",
                                        successText: "You have been logged out successfully.",
                                        onConfirm: async () => {
                                            localStorage.removeItem("token");
                                        },
                                        onSuccess: () => {
                                            navigate("/login");
                                        }
                                    });
                                }
                                setState("me")
                            }}
                            className="bg-transparent text-white font-medium outline-none cursor-pointer text-sm"
                        >
                            <option value="me" className="bg-[#1f2937] text-white">
                               👋 {user.firstName}
                            </option>
                            
                            {user.role === "admin" && (
                                <option value="admin" className="bg-[#1f2937] text-[#0ea5e9] font-bold">
                                    Admin Dashboard
                                </option>
                            )}

                            <option value="orders" className="bg-[#1f2937] text-gray-300">
                                My Orders
                            </option>

                            <option value="settings" className="bg-[#1f2937] text-gray-300">
                                Settings
                            </option>

                            <option value="logout" className="bg-[#1f2937] text-red-400">
                                Logout
                            </option>

                        </select>
                    </div>

                </div>
            )}
        </>
    )
}