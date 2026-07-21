import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash, FaUserPlus } from "react-icons/fa";
import Swal from 'sweetalert2';

export default function RegisterPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
            Swal.fire({
                title: "Validation Error",
                text: "Please fill in all required fields",
                icon: "warning",
                background: '#1f2937',
                color: '#fff',
                confirmButtonColor: '#0ea5e9'
            });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Swal.fire({
                title: "Invalid Email",
                text: "Please enter a valid email address",
                icon: "warning",
                background: '#1f2937',
                color: '#fff',
                confirmButtonColor: '#0ea5e9'
            });
            return;
        }

        if (password !== confirmPassword) {
            Swal.fire({
                title: "Password Mismatch",
                text: "Your passwords do not match. Please try again.",
                icon: "error",
                background: '#1f2937',
                color: '#fff',
                confirmButtonColor: '#ef4444'
            });
            return;
        }
        
        if (password.length < 6) {
            Swal.fire({
                title: "Weak Password",
                text: "Password should be at least 6 characters long",
                icon: "warning",
                background: '#1f2937',
                color: '#fff',
                confirmButtonColor: '#0ea5e9'
            });
            return;
        }

        setIsLoading(true);
        
        try {
            await axios.post(import.meta.env.VITE_API_URL + "/users/", {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                // Passing phone and address in case backend supports it in the future
                phone: phone,
                address: address
            });

            // If signup successful
            Swal.fire({
                title: "Welcome!",
                text: "Account created successfully.",
                icon: "success",
                background: '#1f2937',
                color: '#fff',
                confirmButtonColor: '#10b981'
            }).then(() => {
                navigate("/login");
            });
            
        } catch (err) {
            // Check for duplicate email error (usually 400 from backend "Email already exists" or 11000 from mongoose)
            const errorMsg = err?.response?.data?.message || "Failed to create account. Please try again.";
            
            Swal.fire({
                title: "Registration Failed",
                text: errorMsg,
                icon: "error",
                background: '#1f2937',
                color: '#fff',
                confirmButtonColor: '#ef4444'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full h-screen bg-[#0b0f19] flex relative overflow-y-auto">
            
            {/* Background elements */}
            <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#0ea5e9]/10 blur-[120px] pointer-events-none"></div>
            <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#4facfe]/10 blur-[120px] pointer-events-none"></div>
            
            {/* Left side branding */}
            <div className="hidden lg:flex w-1/2 min-h-screen fixed left-0 justify-center items-center flex-col z-10 border-r border-[#1f2937] bg-[#111827]/50 backdrop-blur-sm">
                <div className="text-center">
                    <img src="/logo.png" alt="Logo" className="w-[400px] h-auto object-contain drop-shadow-2xl mx-auto" />
                    <h2 className="text-2xl font-bold text-white mt-8 tracking-wider">JOIN <span className="text-[#0ea5e9]">ISURU COMPUTERS</span></h2>
                    <p className="text-gray-400 mt-2 max-w-md mx-auto">Create an account to unlock exclusive deals, track orders, and experience premium tech shopping.</p>
                </div>
            </div>

            {/* Right side register form */}
            <div className="w-full lg:w-1/2 lg:ml-[50%] min-h-screen flex justify-center items-center z-10 p-4 py-12">
                <div className="bg-[#111827] w-[90%] max-w-[500px] rounded-2xl border border-[#1f2937] shadow-2xl p-8 flex flex-col relative overflow-hidden transition-all duration-500">
                    
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-[#0ea5e9]/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#0ea5e9]/20">
                            <FaUserPlus className="text-2xl text-[#0ea5e9]" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">Create an Account</h1>
                        <p className="text-gray-400 text-sm">Please fill in your details to register</p>
                    </div>

                    <form onSubmit={handleRegister} className="flex flex-col gap-5">
                        
                        <div className="flex gap-4 w-full">
                            <div className="w-1/2">
                                <label className="block text-sm font-medium text-gray-400 mb-1">First Name *</label>
                                <input 
                                    type="text" 
                                    placeholder="John" 
                                    value={firstName}
                                    onChange={(e)=>setFirstName(e.target.value)}
                                    className="w-full bg-[#1f2937] border border-[#374151] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0ea5e9] transition-colors placeholder-gray-500"
                                />
                            </div>
                            <div className="w-1/2">
                                <label className="block text-sm font-medium text-gray-400 mb-1">Last Name *</label>
                                <input 
                                    type="text" 
                                    placeholder="Doe" 
                                    value={lastName}
                                    onChange={(e)=>setLastName(e.target.value)}
                                    className="w-full bg-[#1f2937] border border-[#374151] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0ea5e9] transition-colors placeholder-gray-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Email Address *</label>
                            <input 
                                type="email" 
                                placeholder="name@example.com" 
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                className="w-full bg-[#1f2937] border border-[#374151] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0ea5e9] transition-colors placeholder-gray-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Phone Number (Optional)</label>
                            <input 
                                type="tel" 
                                placeholder="+1 234 567 8900" 
                                value={phone}
                                onChange={(e)=>setPhone(e.target.value)}
                                className="w-full bg-[#1f2937] border border-[#374151] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0ea5e9] transition-colors placeholder-gray-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Shipping Address (Optional)</label>
                            <input 
                                type="text" 
                                placeholder="123 Tech Street, City" 
                                value={address}
                                onChange={(e)=>setAddress(e.target.value)}
                                className="w-full bg-[#1f2937] border border-[#374151] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0ea5e9] transition-colors placeholder-gray-500"
                            />
                        </div>

                        <div className="flex flex-col gap-5 sm:flex-row">
                            <div className="w-full sm:w-1/2">
                                <label className="block text-sm font-medium text-gray-400 mb-1">Password *</label>
                                <div className="relative">
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        placeholder="••••••••" 
                                        value={password}
                                        onChange={(e)=>setPassword(e.target.value)}
                                        className="w-full bg-[#1f2937] border border-[#374151] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0ea5e9] transition-colors placeholder-gray-500 pr-10"
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>

                            <div className="w-full sm:w-1/2">
                                <label className="block text-sm font-medium text-gray-400 mb-1">Confirm Password *</label>
                                <div className="relative">
                                    <input 
                                        type={showConfirmPassword ? "text" : "password"} 
                                        placeholder="••••••••" 
                                        value={confirmPassword}
                                        onChange={(e)=>setConfirmPassword(e.target.value)}
                                        className="w-full bg-[#1f2937] border border-[#374151] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0ea5e9] transition-colors placeholder-gray-500 pr-10"
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                    >
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full py-3.5 mt-4 bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(14,165,233,0.3)] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating Account...
                                </>
                            ) : "Create Account"}
                        </button>

                    </form>

                    <div className="mt-8 pt-6 border-t border-[#1f2937] text-center">
                        <p className="text-gray-400 text-sm">
                            Already have an account? {" "}
                            <Link to="/login" className="text-[#0ea5e9] hover:text-[#4facfe] font-bold transition-colors">
                                Sign In here
                            </Link>
                        </p>
                    </div>
                    
                </div> 
            </div>
        </div> 
    )
}
