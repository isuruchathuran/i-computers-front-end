import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaLaptop, FaDesktop, FaHeadphones, FaKeyboard, FaMicrochip, FaShieldAlt, FaTruck, FaHeadset, FaTag, FaStar } from "react-icons/fa";
import ProductCard from "../components/productCard";
import LoadingAnimation from "../components/loadingAnimation";
import toast from "react-hot-toast";

export default function HomeContent() {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [offerProducts, setOfferProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_API_URL + "/products");
                const allProducts = response.data;
                
                // Set first 4 products as featured
                setFeaturedProducts(allProducts.slice(0, 4));
                
                // Find products with labeledPrice > price for special offers
                const discounted = allProducts.filter(p => p.labeledPrice > p.price);
                setOfferProducts(discounted.slice(0, 3));
            } catch (error) {
                console.error("Error fetching products", error);
                toast.error("Failed to load products");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const categories = [
        { name: "Laptops", icon: <FaLaptop size={32} />, desc: "High-performance laptops for work and play" },
        { name: "Desktops", icon: <FaDesktop size={32} />, desc: "Powerful desktop PCs and workstations" },
        { name: "Components", icon: <FaMicrochip size={32} />, desc: "Processors, GPUs, RAM, and Motherboards" },
        { name: "Accessories", icon: <FaHeadphones size={32} />, desc: "Headphones, bags, cables, and more" },
        { name: "Peripherals", icon: <FaKeyboard size={32} />, desc: "Keyboards, mice, monitors, and printers" }
    ];

    const testimonials = [
        { name: "Kamal Perera", role: "Software Engineer", quote: "Bought a gaming laptop here. The service was excellent and prices are the best in Colombo.", rating: 5 },
        { name: "Sarah Silva", role: "Student", quote: "Got my study laptop at a great discount. Very friendly staff who helped me choose the right one.", rating: 5 },
        { name: "Nuwan Jayasooriya", role: "Graphic Designer", quote: "They have a great collection of monitors for designers. Highly recommend Isuru Computers!", rating: 4 }
    ];

    return (
        <div className="w-full bg-[#0b0f19] text-white">
            {/* 1. Hero Section */}
            <section 
                className="w-full min-h-[600px] flex items-center justify-center relative overflow-hidden"
            >
                {/* Dark tech gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0b0f19] via-[#111827] to-[#0ea5e9]/20 z-0"></div>
                
                {/* Glowing accents */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0ea5e9] opacity-20 rounded-full blur-[100px] z-0"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600 opacity-20 rounded-full blur-[100px] z-0"></div>

                <div className="container mx-auto px-4 z-10 text-center flex flex-col items-center">
                    <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#0ea5e9] mb-6 tracking-tight drop-shadow-lg">
                        Power Your Digital World
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl">
                        Premium Computers, Laptops & IT Solutions at Isuru Computers. Find the perfect device for your professional or gaming needs.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6">
                        <Link to="/products" className="px-8 py-4 bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-bold rounded-lg shadow-[0_0_15px_rgba(14,165,233,0.5)] hover:shadow-[0_0_25px_rgba(14,165,233,0.8)] transition-all duration-300">
                            Shop Now
                        </Link>
                        <button 
                            onClick={() => {
                                document.getElementById('categories-section').scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="px-8 py-4 border border-[#374151] bg-[#1f2937]/50 hover:bg-[#374151] text-white font-bold rounded-lg backdrop-blur-sm transition-all duration-300"
                        >
                            Explore Categories
                        </button>
                    </div>
                </div>
            </section>

            {/* 2. Quick Features */}
            <section className="w-full py-12 bg-[#111827] border-y border-[#1f2937]">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div className="flex flex-col items-center p-6 bg-[#0b0f19] rounded-xl border border-[#1f2937] hover:border-[#0ea5e9] transition-colors group">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-[#1f2937] text-[#0ea5e9] group-hover:scale-110 transition-transform mb-4">
                                <FaShieldAlt size={24} />
                            </div>
                            <h3 className="font-bold text-white">Genuine Products</h3>
                            <p className="text-sm text-gray-400 mt-2">100% authentic brands</p>
                        </div>
                        <div className="flex flex-col items-center p-6 bg-[#0b0f19] rounded-xl border border-[#1f2937] hover:border-[#0ea5e9] transition-colors group">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-[#1f2937] text-[#0ea5e9] group-hover:scale-110 transition-transform mb-4">
                                <FaTruck size={24} />
                            </div>
                            <h3 className="font-bold text-white">Fast Delivery</h3>
                            <p className="text-sm text-gray-400 mt-2">Island-wide shipping</p>
                        </div>
                        <div className="flex flex-col items-center p-6 bg-[#0b0f19] rounded-xl border border-[#1f2937] hover:border-[#0ea5e9] transition-colors group">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-[#1f2937] text-[#0ea5e9] group-hover:scale-110 transition-transform mb-4">
                                <FaHeadset size={24} />
                            </div>
                            <h3 className="font-bold text-white">24/7 Support</h3>
                            <p className="text-sm text-gray-400 mt-2">Expert technical help</p>
                        </div>
                        <div className="flex flex-col items-center p-6 bg-[#0b0f19] rounded-xl border border-[#1f2937] hover:border-[#0ea5e9] transition-colors group">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-[#1f2937] text-[#0ea5e9] group-hover:scale-110 transition-transform mb-4">
                                <FaTag size={24} />
                            </div>
                            <h3 className="font-bold text-white">Best Prices</h3>
                            <p className="text-sm text-gray-400 mt-2">Unbeatable daily deals</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Featured Categories */}
            <section id="categories-section" className="w-full py-20">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white relative">
                            Shop by Category
                            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-[#0ea5e9]"></span>
                        </h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-8">
                        {categories.map((cat, index) => (
                            <div 
                                key={index}
                                onClick={() => navigate(`/products?category=${cat.name}`)}
                                className="bg-[#111827] p-6 rounded-2xl shadow-lg border border-[#1f2937] hover:border-[#0ea5e9] hover:shadow-[0_0_15px_rgba(14,165,233,0.3)] transition-all duration-300 cursor-pointer flex flex-col items-center text-center group"
                            >
                                <div className="w-20 h-20 rounded-full flex items-center justify-center bg-[#1f2937] text-gray-300 group-hover:text-[#0ea5e9] transition-colors duration-300 mb-4">
                                    {cat.icon}
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#0ea5e9] transition-colors">{cat.name}</h3>
                                <p className="text-sm text-gray-400">{cat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Featured Products */}
            <section className="w-full py-20 bg-[#111827]">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white relative inline-block">
                                Featured Products
                                <span className="absolute -bottom-4 left-0 w-16 h-1 bg-[#0ea5e9]"></span>
                            </h2>
                        </div>
                        <Link to="/products" className="hidden sm:block text-[#0ea5e9] font-medium hover:underline">
                            View All Products &rarr;
                        </Link>
                    </div>

                    {loading ? (
                        <div className="flex justify-center w-full py-20"><LoadingAnimation /></div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                                {featuredProducts.map((product) => (
                                    <ProductCard key={product.productId} product={product} />
                                ))}
                            </div>
                            <div className="mt-10 text-center sm:hidden">
                                <Link to="/products" className="inline-block px-8 py-3 border border-[#0ea5e9] text-[#0ea5e9] font-medium rounded-lg hover:bg-[#0ea5e9] hover:text-white transition-colors">
                                    View All Products
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* 5. Special Offers Section */}
            {!loading && offerProducts.length > 0 && (
                <section className="w-full py-20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[#0ea5e9]/10 z-0"></div>
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="flex flex-col items-center mb-12">
                            <span className="px-4 py-1 bg-red-600 text-white rounded-full text-xs font-bold tracking-widest mb-4 uppercase shadow-[0_0_10px_rgba(220,38,38,0.5)]">Limited Time</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-white text-center relative inline-block">
                                Special Offers
                                <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-[#0ea5e9]"></span>
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center mt-10">
                            {offerProducts.map((product) => {
                                const discountPercentage = Math.round(((product.labeledPrice - product.price) / product.labeledPrice) * 100);
                                return (
                                    <div key={product.productId} className="bg-[#111827] rounded-2xl overflow-hidden shadow-2xl border border-[#374151] relative group transform hover:-translate-y-2 hover:border-[#0ea5e9] transition-all duration-300 w-full max-w-sm">
                                        <div className="absolute top-4 right-4 bg-red-600 text-white font-bold px-3 py-1 rounded-md z-10 shadow-lg">
                                            {discountPercentage}% OFF
                                        </div>
                                        <div className="h-56 w-full bg-white p-6 flex justify-center items-center relative overflow-hidden">
                                            <img src={product.images?.[0] || 'https://via.placeholder.com/300'} alt={product.name} className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{product.name}</h3>
                                            <div className="flex items-center gap-3 mb-6">
                                                <span className="text-2xl font-bold text-[#0ea5e9]">Rs. {product.price.toLocaleString()}</span>
                                                <span className="text-sm text-gray-500 line-through">Rs. {product.labeledPrice.toLocaleString()}</span>
                                            </div>
                                            <button 
                                                onClick={() => navigate(`/overview/${product.productId}`)}
                                                className="w-full py-3 rounded-lg text-white font-bold bg-[#1f2937] hover:bg-[#0ea5e9] border border-[#374151] hover:border-[#0ea5e9] transition-all"
                                            >
                                                View Deal
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* 6. Testimonials */}
            <section className="w-full py-20 bg-[#111827]">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-center text-white relative">
                            What Our Customers Say
                            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-[#0ea5e9]"></span>
                        </h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((test, index) => (
                            <div key={index} className="bg-[#0b0f19] p-8 rounded-2xl relative shadow-lg border border-[#1f2937]">
                                <div className="text-[#0ea5e9] opacity-20 absolute top-4 left-4 text-7xl font-serif">"</div>
                                <div className="relative z-10 mt-4">
                                    <div className="flex gap-1 mb-4 text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} className={i < test.rating ? "" : "text-gray-600"} />
                                        ))}
                                    </div>
                                    <p className="text-gray-300 italic mb-6">"{test.quote}"</p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-[#1f2937] rounded-full flex items-center justify-center text-white font-bold">
                                            {test.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white">{test.name}</h4>
                                            <span className="text-xs text-[#0ea5e9]">{test.role}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
