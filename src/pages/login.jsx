import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash, FaUserGraduate, FaUserShield } from "react-icons/fa";
import Swal from 'sweetalert2';

export default function LoginPage() {
    const [loginMode, setLoginMode] = useState("student"); // 'student' or 'admin'
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        if (!email.trim() || !password.trim()) {
            toast.error("Please enter both email and password.");
            return;
        }

        setIsLoading(true);
        
        try {
            const response = await axios.post(import.meta.env.VITE_API_URL + "/users/login", {
                email: email,
                password: password
            });

            const role = response.data.role;

            // Strict Role Checking based on the form used
            if (loginMode === "admin" && role !== "admin") {
                // They tried to login as Admin using Student credentials
                Swal.fire({
                    title: "Access Denied",
                    text: "Invalid Admin Credentials",
                    icon: "error",
                    background: '#1f2937',
                    color: '#fff',
                    confirmButtonColor: '#ef4444'
                });
                return;
            }

            // If login successful
            toast.success("Login successful. Redirecting...");
            
            // Store token based on remember me preference
            if (rememberMe) {
                localStorage.setItem("token", response.data.token);
            } else {
                localStorage.setItem("token", response.data.token);
            }
            
            // Redirect based on role
            if (role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/");
            }
            
        } catch (err) {
            if (loginMode === "admin") {
                Swal.fire({
                    title: "Access Denied",
                    text: "Invalid Admin Credentials",
                    icon: "error",
                    background: '#1f2937',
                    color: '#fff',
                    confirmButtonColor: '#ef4444'
                });
            } else {
                toast.error(err?.response?.data?.message || "Failed to login. Please try again later.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const toggleMode = (mode) => {
        setLoginMode(mode);
        setEmail("");
        setPassword("");
        setShowPassword(false);
    };

    return (
        <div className="w-full h-screen bg-[#0b0f19] flex relative overflow-hidden">
            
            {/* Background elements */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#0ea5e9]/10 blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#4facfe]/10 blur-[120px] pointer-events-none"></div>
            
            {/* Left side branding */}
            <div className="hidden lg:flex w-1/2 h-full justify-center items-center flex-col z-10 border-r border-[#1f2937] bg-[#111827]/50 backdrop-blur-sm">
                <div className="text-center">
                    <img src="/logo.png" alt="Logo" className="w-[400px] h-auto object-contain drop-shadow-2xl mx-auto" />
                    <h2 className="text-2xl font-bold text-white mt-8 tracking-wider">WELCOME TO <span className="text-[#0ea5e9]">ISURU COMPUTERS</span></h2>
                    <p className="text-gray-400 mt-2 max-w-md mx-auto">Your premium destination for high-performance computing, accessories, and tech solutions.</p>
                </div>
            </div>

            {/* Right side login form */}
            <div className="w-full lg:w-1/2 h-full flex justify-center items-center z-10 p-4">
                <div className={`bg-[#111827] w-[90%] max-w-[450px] rounded-2xl border ${loginMode === 'admin' ? 'border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.15)]' : 'border-[#1f2937] shadow-2xl'} p-8 flex flex-col transition-all duration-500 relative overflow-hidden`}>
                    
                    {/* Admin glowing effect */}
                    {loginMode === 'admin' && (
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-orange-500"></div>
                    )}

                    {/* Mode Switcher */}
                    <div className="flex bg-[#1f2937] rounded-xl p-1 mb-8 relative z-20">
                        <button 
                            onClick={() => toggleMode('student')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 ${loginMode === 'student' ? 'bg-[#0ea5e9] text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
                        >
                            <FaUserGraduate /> Student Login
                        </button>
                        <button 
                            onClick={() => toggleMode('admin')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 ${loginMode === 'admin' ? 'bg-red-500 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
                        >
                            <FaUserShield /> Admin Login
                        </button>
                    </div>
                    
                    <div className="text-center mb-8 transform transition-all duration-500">
                        <h1 className="text-3xl font-bold text-white mb-2">
                            {loginMode === 'admin' ? 'Admin Portal' : 'Welcome Back'}
                        </h1>
                        <p className="text-gray-400 text-sm">
                            {loginMode === 'admin' ? 'Sign in to access the control panel' : 'Please sign in to your student account'}
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="flex flex-col gap-5">
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                            <input 
                                type="email" 
                                placeholder="name@example.com" 
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                className={`w-full bg-[#1f2937] border rounded-lg px-4 py-3 text-white focus:outline-none transition-colors placeholder-gray-500 ${loginMode === 'admin' ? 'border-[#374151] focus:border-red-500' : 'border-[#374151] focus:border-[#0ea5e9]'}`}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
                            <div className="relative">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="••••••••" 
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}
                                    className={`w-full bg-[#1f2937] border rounded-lg px-4 py-3 text-white focus:outline-none transition-colors placeholder-gray-500 pr-12 ${loginMode === 'admin' ? 'border-[#374151] focus:border-red-500' : 'border-[#374151] focus:border-[#0ea5e9]'}`}
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-between items-center text-sm">
                            <label className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-white transition-colors">
                                <input 
                                    type="checkbox" 
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className={`w-4 h-4 rounded border-gray-600 bg-[#1f2937] ${loginMode === 'admin' ? 'text-red-500 focus:ring-red-500' : 'text-[#0ea5e9] focus:ring-[#0ea5e9]'}`}
                                />
                                Remember me
                            </label>
                            
                            <Link to="/forgot-password" className={`transition-colors font-medium ${loginMode === 'admin' ? 'text-red-400 hover:text-red-500' : 'text-[#0ea5e9] hover:text-[#4facfe]'}`}>
                                Forgot Password?
                            </Link>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className={`w-full py-3.5 mt-2 text-white font-bold rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2 ${loginMode === 'admin' ? 'bg-red-500 hover:bg-red-600 shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'bg-[#0ea5e9] hover:bg-[#0284c7] shadow-[0_0_15px_rgba(14,165,233,0.3)]'}`}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Authenticating...
                                </>
                            ) : (loginMode === 'admin' ? 'Login as Admin' : 'Sign In')}
                        </button>

                    </form>

                    {loginMode === 'student' && (
                        <div className="mt-8 pt-6 border-t border-[#1f2937] text-center">
                            <p className="text-gray-400 text-sm">
                                Don't have an account? {" "}
                                <Link to="/register" className="text-[#0ea5e9] hover:text-[#4facfe] font-bold transition-colors">
                                    Create an account
                                </Link>
                            </p>
                        </div>
                    )}
                    
                </div> 
            </div>
        </div> 
    )
}
