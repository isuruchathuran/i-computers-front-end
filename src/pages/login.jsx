import { Link } from "react-router-dom";

export default function LoginPage(){
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
                        className="m-5 p-3 w-[90%] h-[50px] rounded-lg border border-secondary outline-none"
                    />

                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="m-5 p-3 w-[90%] h-[50px] rounded-lg border border-secondary outline-none"
                    />

                    <p className="w-full text-right pr-5">
                        Forgot Password? 
                        <Link to="/forgot-password" className="text-accent">
                            Reset
                        </Link>
                    </p>

                    <button 
                        className="m-5 p-3 w-[90%] h-[50px] bg-accent rounded-lg text-white font-bold">
                            Login
                        </button>

                    <button 
                        className="m-5 p-3 w-[90%] h-[50px] border border-accent rounded-lg text-white font-bold">
                            Login with Google
                    </button>

                    <p 
                        className="w-full text-right pr-5">
                            Don't have an account? {" "}
                                <Link to="/register" className="text-accent">
                                    Register
                                </Link>
                    </p>
                    
                </div> 
            </div>
        </div> 
    )
}
