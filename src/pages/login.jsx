import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    function Login(){
        if (!email.trim() || !password.trim()) {
            toast.error("Please enter both email and password.");
            return;
        }

        setIsLoading(true);
        axios.post(import.meta.env.VITE_API_URL + "/users/login",
            {
                email : email,
                password : password
            }
        ).then(
            (response)=>{
                toast.success("Login Successful !")
                
                localStorage.setItem("token", response.data.token)

                if(response.data.role == "admin"){
                    navigate("/admin/")
                }else{
                    navigate("/")
                }
            }
        ).catch(
            (err)=>{
                toast.error(err?.response?.data?.message || "Failed to login. Please try again later.");
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

                    <p className="w-full text-right pr-5">
                        Forgot Password? {" "}
                        <Link to="/forgot-password" className="text-accent hover:underline">
                            Reset
                        </Link>
                    </p>

                    <button onClick={Login} disabled={isLoading}
                        className="m-5 p-3 w-[90%] h-[50px] bg-accent rounded-lg text-white font-bold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                            {isLoading ? "Logging in..." : "Login"}
                        </button>

                    <button 
                        className="m-5 p-3 w-[90%] h-[50px] border border-accent rounded-lg text-white font-bold hover:bg-white hover:text-accent transition-colors">
                            Login with Google
                    </button>

                    <p className="w-full text-center mt-4 text-white">
                        Don't have an account? {" "}
                        <Link to="/register" className="text-accent hover:underline font-bold">
                            Sign up
                        </Link>
                    </p>
                    
                </div> 
            </div>
        </div> 
    )
}
