import { useState } from "react";
import { BiShoppingBag } from "react-icons/bi";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import UserData from "./userData";

export default function Header(){
    const [searchQuery, setSearchQuery] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
            setSearchQuery("");
            setIsMenuOpen(false);
        }
    };

    return(
        <header 
            className="w-full sticky top-0 h-[100px] z-50 shadow-md relative"
            style={{
                background: "linear-gradient(to right, #4facfe, #00f2fe, #a18cd1)"
            }}
        >
            <div className="container mx-auto px-4 h-full flex justify-between items-center relative">
                
                {/* Logo */}
                <div className="h-full flex justify-center items-center">
                    <Link to="/">
                        <img src="/logo.png" alt="Logo" className="h-[80px] sm:h-[120px] md:h-[200px] object-contain transition-all"/>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex justify-center items-center flex-1 mx-4">
                    <Link to="/" className="text-white mx-4 font-medium hover:text-secondary hover:border-b-2 hover:border-secondary transition-all">Home</Link>
                    <Link to="/products" className="text-white mx-4 font-medium hover:text-secondary hover:border-b-2 hover:border-secondary transition-all">Products</Link>
                    <Link to="/about" className="text-white mx-4 font-medium hover:text-secondary hover:border-b-2 hover:border-secondary transition-all">About</Link>
                    <Link to="/contact" className="text-white mx-4 font-medium hover:text-secondary hover:border-b-2 hover:border-secondary transition-all">Contact</Link>
                </div>

                {/* Search Bar (Desktop) */}
                <div className="hidden md:flex items-center mx-4 flex-1 max-w-md">
                    <form onSubmit={handleSearch} className="w-full relative">
                        <input 
                            type="text" 
                            placeholder="Search products..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full py-2 pl-4 pr-10 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-white/50 bg-white/90 text-secondary placeholder-gray-500"
                        />
                        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-accent">
                            <FaSearch />
                        </button>
                    </form>
                </div>

                {/* Right Icons (Cart, User, Mobile Toggle) */}
                <div className="flex h-full justify-end items-center gap-4 sm:gap-5">
                    <Link to="/Cart" className="cursor-pointer hover:scale-110 transition-transform">
                        <BiShoppingBag size={28} color="white" />
                    </Link>
                    <div className="hidden sm:block">
                        <UserData />
                    </div>
                    
                    {/* Mobile Menu Toggle */}
                    <button 
                        className="lg:hidden text-white hover:text-secondary transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Dropdown */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-[100px] left-0 w-full bg-white shadow-xl flex flex-col py-4 px-6 border-t border-gray-100 z-50">
                    <form onSubmit={handleSearch} className="w-full relative mb-6">
                        <input 
                            type="text" 
                            placeholder="Search products..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full py-2 pl-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent text-secondary"
                        />
                        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                            <FaSearch />
                        </button>
                    </form>
                    
                    <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-secondary font-medium py-3 border-b border-gray-100 hover:text-accent">Home</Link>
                    <Link to="/products" onClick={() => setIsMenuOpen(false)} className="text-secondary font-medium py-3 border-b border-gray-100 hover:text-accent">Products</Link>
                    <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-secondary font-medium py-3 border-b border-gray-100 hover:text-accent">About</Link>
                    <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="text-secondary font-medium py-3 border-b border-gray-100 hover:text-accent">Contact</Link>
                    
                    <div className="py-4 sm:hidden flex justify-center">
                        <UserData />
                    </div>
                </div>
            )}
        </header>
    )
}