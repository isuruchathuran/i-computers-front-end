import { useState, useEffect } from "react";
import { BiShoppingBag } from "react-icons/bi";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import UserData from "./userData";
import { getCartItemCount } from "../utils/cartManager";

export default function Header(){
    const [searchQuery, setSearchQuery] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    // Listen for custom 'cartUpdated' event triggered from cartManager
    useEffect(() => {
        const updateCartCount = () => {
            setCartCount(getCartItemCount());
        };

        updateCartCount();
        window.addEventListener('cartUpdated', updateCartCount);
        return () => window.removeEventListener('cartUpdated', updateCartCount);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
            setSearchQuery("");
            setIsMenuOpen(false);
        }
    };

    const getLinkClass = (path) => {
        const isActive = location.pathname === path;
        return `font-medium transition-colors ${isActive ? 'text-[#0ea5e9]' : 'text-gray-300 hover:text-[#0ea5e9]'}`;
    };

    const getMobileLinkClass = (path) => {
        const isActive = location.pathname === path;
        return `font-medium py-3 border-b border-[#374151] transition-colors ${isActive ? 'text-[#0ea5e9]' : 'text-gray-300 hover:text-[#0ea5e9]'}`;
    };

    return(
        <header className="w-full sticky top-0 h-[80px] z-50 bg-[#0b0f19]/80 backdrop-blur-md border-b border-[#374151]">
            <div className="container mx-auto px-4 h-full flex justify-between items-center relative">
                
                {/* Logo */}
                <div className="h-full flex justify-center items-center">
                    <Link to="/" className="text-2xl font-bold text-white tracking-widest flex items-center gap-2">
                        <span className="text-[#0ea5e9]">ISURU</span> COMPUTERS
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex justify-center items-center flex-1 mx-4 gap-6">
                    <Link to="/" className={getLinkClass("/")}>Home</Link>
                    <Link to="/products" className={getLinkClass("/products")}>Products</Link>
                    <Link to="/categories" className={getLinkClass("/categories")}>Categories</Link>
                    <Link to="/about" className={getLinkClass("/about")}>About Us</Link>
                    <Link to="/contact" className={getLinkClass("/contact")}>Contact</Link>
                </div>

                {/* Search Bar (Desktop) */}
                <div className="hidden md:flex items-center mx-4 flex-1 max-w-sm">
                    <form onSubmit={handleSearch} className="w-full relative">
                        <input 
                            type="text" 
                            placeholder="Search products..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full py-2 pl-4 pr-10 rounded-full border border-[#374151] bg-[#111827] text-white focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] placeholder-gray-500 transition-all"
                        />
                        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0ea5e9]">
                            <FaSearch />
                        </button>
                    </form>
                </div>

                {/* Right Icons (Cart, User, Mobile Toggle) */}
                <div className="flex h-full justify-end items-center gap-4 sm:gap-6">
                    <Link to="/cart" className="relative cursor-pointer group">
                        <BiShoppingBag size={26} className={`transition-colors ${location.pathname === '/cart' ? 'text-[#0ea5e9]' : 'text-gray-300 group-hover:text-[#0ea5e9]'}`} />
                        <span className="absolute -top-1 -right-2 bg-[#0ea5e9] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(14,165,233,0.5)]">
                            {cartCount}
                        </span>
                    </Link>
                    <div className="hidden sm:block">
                        <UserData />
                    </div>
                    
                    {/* Mobile Menu Toggle */}
                    <button 
                        className="lg:hidden text-gray-300 hover:text-[#0ea5e9] transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Dropdown */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-[80px] left-0 w-full bg-[#111827] flex flex-col py-4 px-6 border-b border-[#374151] z-50 shadow-2xl">
                    <form onSubmit={handleSearch} className="w-full relative mb-6">
                        <input 
                            type="text" 
                            placeholder="Search products..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full py-2 pl-4 pr-10 rounded-lg border border-[#374151] bg-[#0b0f19] text-white focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
                        />
                        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#0ea5e9]">
                            <FaSearch />
                        </button>
                    </form>
                    
                    <Link to="/" onClick={() => setIsMenuOpen(false)} className={getMobileLinkClass("/")}>Home</Link>
                    <Link to="/products" onClick={() => setIsMenuOpen(false)} className={getMobileLinkClass("/products")}>Products</Link>
                    <Link to="/categories" onClick={() => setIsMenuOpen(false)} className={getMobileLinkClass("/categories")}>Categories</Link>
                    <Link to="/about" onClick={() => setIsMenuOpen(false)} className={getMobileLinkClass("/about")}>About Us</Link>
                    <Link to="/contact" onClick={() => setIsMenuOpen(false)} className={getMobileLinkClass("/contact")}>Contact</Link>
                    
                    <div className="py-4 sm:hidden flex justify-center border-t border-[#374151] mt-2">
                        <UserData />
                    </div>
                </div>
            )}
        </header>
    )
}