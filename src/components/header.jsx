import { BiShoppingBag } from "react-icons/bi";
import { Link } from "react-router-dom";
import UserData from "./userData";

export default function Header(){
    return(
        <header 
            className="w-full sticky top-0 bg-accent h-[100px] flex justify-center items-center relative"
            style={{
                background: "linear-gradient(to right, #4facfe, #00f2fe, #a18cd1)"
            }}
        >

            <div className="h-full flex justify-center items-center absolute left-0.5">
                 <img src="/logo.png" alt="Logo" className="h-[200px] flex justify-center items-center"/>
            </div>

            <div className="h-full flex justify-center items-center">
                <Link to="/" className="text-white mx-4 hover:border-b-2">Home</Link>
                <Link to="/products" className="text-white mx-4 hover:border-b-2">Product</Link>
                <Link to="/about" className="text-white mx-4 hover:border-b-2">About</Link>
                <Link to="/contact" className="text-white mx-4 hover:border-b-2">Contact</Link>
            </div>

            <div className="0 absolute right-10 flex h-full justify-center items-center gap-5">
                <Link to="/Cart" className="cursor-pointer"><BiShoppingBag size={30} color="white" /></Link>
                <UserData />
            </div>
        </header>
    )
}