import axios from "axios";
import { useEffect, useState } from "react";
import { BiDownArrow } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function UserData() {
    
    const [user, setUser] = useState(null)
    const [state , setState] = useState("me")

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
                        console.log(response.data)
                        setUser(response.data)
                     }
                )
            }
        },[]
    )

    return (
        <>
            {user==null?<div className="flex items-center gap-2">

                <Link
                    to="/login"
                    className="px-5 py-2 rounded-lg border border-white/20 text-white font-medium hover:bg-white hover:text-black transition-all duration-200"
                >
                    Login
                </Link>

                <Link
                    to="/register"
                    className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-800 transition-all duration-200 shadow-lg"
                >
                    Register
                </Link>

            </div>
                
                : <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-2 py-2 shadow-lg hover:bg-white/15 transition-all duration-200">

                    {/* PROFILE IMAGE */}
                    <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white/20 shadow-md">

                        <img
                            src={user.image}
                            alt="profile"
                            className="w-full h-full object-cover"
                        />

                    </div>

                    {/* USER MENU */}
                    <div className="pr-2">

                        <select value={state}
                            onChange={(e) => {
                                setState(e.target.value)
                                if (e.target.value == "orders") {
                                    window.location.href="/my-orders"
                                }

                                if (e.target.value == "settings") {
                                    window.location.href = "/settings"
                                }

                                if (e.target.value == "logout") {
                                    localStorage.removeItem("token")
                                    window.location.href = "/login"
                                }
                                setState("me")
                            }}


                            className="bg-transparent text-white text-1xl font-medium outline-none cursor-pointer"
                        >
                            <option value="me" className="bg-secondary/80 text-white">
                               👋 {user.firstName}
                            </option>

                            <option value="orders" className="bg-secondary/80 text-white">
                                My Orders
                            </option>

                            <option value="settings" className="bg-secondary/80 text-white">
                                Settings
                            </option>

                            <option value="logout" className="bg-secondary/80 text-red-500">
                                Logout
                            </option>

                        </select>

                    </div>

                </div>


            }
        </>
    )
}