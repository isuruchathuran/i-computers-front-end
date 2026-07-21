import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="w-full bg-[#0b0f19] text-white pt-12 pb-6 border-t border-[#374151]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    
                    {/* Company Info */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center">
                            <span className="text-2xl font-bold tracking-widest flex items-center gap-2">
                                <span className="text-[#0ea5e9]">ISURU</span> COMPUTERS
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm mt-2">
                            Your trusted partner in premium computers, accessories, and reliable IT solutions.
                        </p>
                        <div className="flex gap-4 mt-4">
                            <a href="#" className="w-10 h-10 rounded-full flex justify-center items-center bg-[#1f2937] hover:bg-[#0ea5e9] hover:text-white transition-colors text-gray-400">
                                <FaFacebook size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full flex justify-center items-center bg-[#1f2937] hover:bg-[#0ea5e9] hover:text-white transition-colors text-gray-400">
                                <FaInstagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full flex justify-center items-center bg-[#1f2937] hover:bg-[#0ea5e9] hover:text-white transition-colors text-gray-400">
                                <FaTwitter size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full flex justify-center items-center bg-[#1f2937] hover:bg-[#0ea5e9] hover:text-white transition-colors text-gray-400">
                                <FaYoutube size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-lg font-semibold mb-2 relative inline-block text-white">
                            Quick Links
                            <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-[#0ea5e9]"></span>
                        </h3>
                        <Link to="/" className="text-gray-400 hover:text-[#0ea5e9] transition-colors text-sm">Home</Link>
                        <Link to="/products" className="text-gray-400 hover:text-[#0ea5e9] transition-colors text-sm">Products</Link>
                        <Link to="/about" className="text-gray-400 hover:text-[#0ea5e9] transition-colors text-sm">About Us</Link>
                        <Link to="/contact" className="text-gray-400 hover:text-[#0ea5e9] transition-colors text-sm">Contact</Link>
                        <Link to="/my-orders" className="text-gray-400 hover:text-[#0ea5e9] transition-colors text-sm">My Orders</Link>
                    </div>

                    {/* Categories */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-lg font-semibold mb-2 relative inline-block text-white">
                            Categories
                            <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-[#0ea5e9]"></span>
                        </h3>
                        <Link to="/products?category=Laptops" className="text-gray-400 hover:text-[#0ea5e9] transition-colors text-sm">Laptops</Link>
                        <Link to="/products?category=Desktops" className="text-gray-400 hover:text-[#0ea5e9] transition-colors text-sm">Desktops</Link>
                        <Link to="/products?category=Components" className="text-gray-400 hover:text-[#0ea5e9] transition-colors text-sm">PC Components</Link>
                        <Link to="/products?category=Accessories" className="text-gray-400 hover:text-[#0ea5e9] transition-colors text-sm">Accessories</Link>
                    </div>

                    {/* Contact & Newsletter */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-lg font-semibold mb-1 relative inline-block text-white">
                            Contact Us
                            <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-[#0ea5e9]"></span>
                        </h3>
                        <ul className="flex flex-col gap-3 text-sm text-gray-400 mt-2">
                            <li className="flex items-start gap-3">
                                <FaMapMarkerAlt className="mt-1 text-[#0ea5e9] flex-shrink-0" />
                                <span>123 Main Street, Colombo 03, Sri Lanka</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaPhone className="text-[#0ea5e9] flex-shrink-0" />
                                <span>+94 11 234 5678</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaEnvelope className="text-[#0ea5e9] flex-shrink-0" />
                                <span>info@isurucomputers.lk</span>
                            </li>
                        </ul>
                        
                        <div className="mt-4">
                            <h4 className="text-sm font-medium mb-2 text-white">Subscribe to Newsletter</h4>
                            <div className="flex w-full">
                                <input 
                                    type="email" 
                                    placeholder="Your email" 
                                    className="px-3 py-2 w-full bg-[#1f2937] border border-[#374151] text-white outline-none text-sm rounded-l-md focus:border-[#0ea5e9] transition-colors"
                                />
                                <button className="px-3 py-2 bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-medium rounded-r-md text-sm transition-colors">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="mt-12 pt-6 border-t border-[#1f2937] flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} ISURU COMPUTERS. All rights reserved.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
