import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function RegisterPage() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    function signup() {
        if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim()) {
            toast.error("Please fill in all fields");
            return;
        }

        if (password != confirmPassword) {
            toast.error("Passwords do not match")
            return
        }

        setIsLoading(true);
        axios.post(import.meta.env.VITE_API_URL + "/users/",
            {
                firstName: firstName,
                lastName : lastName,
                email : email,
                password : password
            }
        ).then(
            (response)=>{
                toast.success("Signed up Successfully !")
                navigate("/login")
            }
        ).catch(
            (err)=>{
                toast.error(err?.response?.data?.message || "Failed to sign up. Please try again later.");
            }
        ).finally(() => {
            setIsLoading(false);
        })
    }

    return(
        <div className="w-full h-full bg-[url('/background.jpg')] bg-cover no-repeat bg-center flex justify-center items-center">
            <div className="w-[50%] h-full flex justify-center items-center flex-col">
                <img src="/logo.png" alt="Logo" className="w-[700px] h-[700px] ml-[120px] mt-[70px] object-cover"/>
                <h1 className="mt-0 text-4xl font-bold mt-5 text-white"></h1>
            </div>

            <div className="w-[50%] h-ful flex justify-center items-center">

                <div className="backdrop-blur-md w-[450px] h-[600px] shadow-2xl rounded-lg flex flex-col justify-center">

                    <div className="w-full h-[50px] flex items-center justify-between px-5">
                        <input
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-[48%] p-3 h-[50px] rounded-lg border border-secondary outline-none text-gray-800"
                            type="text"
                            placeholder="First Name"
                        />

                        <input
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-[48%] p-3 h-[50px] rounded-lg border border-secondary outline-none text-gray-800"
                            type="text"
                            placeholder="Last Name"
                        />
                    </div>
                
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        className="m-5 p-3 w-[90%] h-[50px] rounded-lg border border-secondary outline-none text-gray-800"
                    />

                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        className="m-5 p-3 w-[90%] h-[50px] rounded-lg border border-secondary outline-none text-gray-800"
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="m-5 p-3 w-[90%] h-[50px] rounded-lg border border-secondary outline-none text-gray-800"
                    />

                    <button onClick={signup} disabled={isLoading}
                        className="m-5 p-3 w-[90%] h-[50px] bg-accent rounded-lg text-white font-bold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                            {isLoading ? "Signing up..." : "Sign up"}
                        </button>

                    <button 
                        className="m-5 p-3 w-[90%] h-[50px] border border-accent rounded-lg text-white font-bold hover:bg-white hover:text-accent transition-colors">
                            Sign up with Google
                    </button>

                    <p className="w-full text-center mt-4 text-white">
                        Already have an account? {" "}
                        <Link to="/login" className="text-accent hover:underline font-bold">
                            Login
                        </Link>
                    </p>
                    
                </div> 
            </div>
        </div> 
    )
}
