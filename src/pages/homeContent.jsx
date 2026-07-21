import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaLaptop, FaDesktop, FaHeadphones, FaKeyboard, FaEllipsisH, FaShieldAlt, FaTruck, FaHeadset, FaTag, FaStar } from "react-icons/fa";
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
        { name: "Accessories", icon: <FaHeadphones size={32} />, desc: "Headphones, bags, cables, and more" },
        { name: "Peripherals", icon: <FaKeyboard size={32} />, desc: "Keyboards, mice, monitors, and printers" },
        { name: "Others", icon: <FaEllipsisH size={32} />, desc: "Software, components, and networking" }
    ];

    const testimonials = [
        { name: "Kamal Perera", role: "Software Engineer", quote: "Bought a gaming laptop here. The service was excellent and prices are the best in Colombo.", rating: 5 },
        { name: "Sarah Silva", role: "Student", quote: "Got my study laptop at a great discount. Very friendly staff who helped me choose the right one.", rating: 5 },
        { name: "Nuwan Jayasooriya", role: "Graphic Designer", quote: "They have a great collection of monitors for designers. Highly recommend Isuru Computers!", rating: 4 }
    ];

    const brands = ["Dell", "HP", "Lenovo", "Asus", "Acer", "Apple", "MSI", "Samsung"];

    return (
        <div className="w-full bg-white">
            {/* 2a. Hero Section */}
            <section 
                className="w-full min-h-[500px] md:min-h-[600px] flex items-center justify-center relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 50%, #a18cd1 100%)" }}
            >
                {/* Decorative background shapes */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
                
                <div className="container mx-auto px-4 z-10 text-center flex flex-col items-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-md">
                        Your One-Stop <br className="md:hidden" /> Computer Shop
                    </h1>
                    <p className="text-lg md:text-xl text-white mb-10 max-w-2xl drop-shadow">
                        Discover premium computers, accessories, and reliable tech support at Isuru Computers Sri Lanka. Find the perfect device for your needs today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link to="/products" className="px-8 py-3 bg-white text-secondary font-bold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300">
                            Shop Now
                        </Link>
                        <button 
                            onClick={() => {
                                document.getElementById('special-offers').scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="px-8 py-3 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-secondary transition-all duration-300"
                        >
                            View Deals
                        </button>
                    </div>
                </div>
            </section>

            {/* 2e. Why Choose Us (Quick Stats/Features) */}
            <section className="w-full py-12 bg-gray-50 border-b border-gray-200">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-primary text-secondary mb-4">
                                <FaShieldAlt size={24} />
                            </div>
                            <h3 className="font-bold text-secondary">Quality Products</h3>
                            <p className="text-sm text-gray-500 mt-2">100% genuine guaranteed</p>
                        </div>
                        <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-primary text-secondary mb-4">
                                <FaTruck size={24} />
                            </div>
                            <h3 className="font-bold text-secondary">Fast Delivery</h3>
                            <p className="text-sm text-gray-500 mt-2">Island-wide shipping</p>
                        </div>
                        <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-primary text-secondary mb-4">
                                <FaHeadset size={24} />
                            </div>
                            <h3 className="font-bold text-secondary">24/7 Support</h3>
                            <p className="text-sm text-gray-500 mt-2">Expert technical assistance</p>
                        </div>
                        <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-primary text-secondary mb-4">
                                <FaTag size={24} />
                            </div>
                            <h3 className="font-bold text-secondary">Best Prices</h3>
                            <p className="text-sm text-gray-500 mt-2">Unbeatable deals daily</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2b. Featured Products */}
            <section className="w-full py-16">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="text-3xl font-bold text-secondary relative inline-block">
                                Featured Products
                                <span className="absolute -bottom-2 left-0 w-1/2 h-1" style={{ background: "linear-gradient(to right, #4facfe, #00f2fe, #a18cd1)" }}></span>
                            </h2>
                        </div>
                        <Link to="/products" className="hidden sm:block text-accent font-medium hover:underline">
                            View All Products &rarr;
                        </Link>
                    </div>

                    {loading ? (
                        <div className="flex justify-center w-full py-10"><LoadingAnimation /></div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {featuredProducts.map((product) => (
                                    <ProductCard key={product.productId} product={product} />
                                ))}
                            </div>
                            <div className="mt-8 text-center sm:hidden">
                                <Link to="/products" className="inline-block px-6 py-2 border-2 border-accent text-accent font-medium rounded-full hover:bg-accent hover:text-white transition-colors">
                                    View All Products
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* 2c. Categories Section */}
            <section className="w-full py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-secondary mb-12 relative">
                        Shop by Category
                        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-1" style={{ background: "linear-gradient(to right, #4facfe, #00f2fe, #a18cd1)" }}></span>
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {categories.map((cat, index) => (
                            <div 
                                key={index}
                                onClick={() => navigate(`/products?category=${cat.name}`)}
                                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col items-center text-center group border border-transparent hover:border-accent"
                            >
                                <div className="w-20 h-20 rounded-full flex items-center justify-center bg-primary text-accent group-hover:text-white transition-colors duration-300 mb-4" 
                                     style={{ backgroundImage: "linear-gradient(to right, transparent, transparent)" }}
                                     onMouseEnter={(e) => { e.currentTarget.style.backgroundImage = "linear-gradient(to right, #4facfe, #00f2fe, #a18cd1)" }}
                                     onMouseLeave={(e) => { e.currentTarget.style.backgroundImage = "none" }}
                                >
                                    {cat.icon}
                                </div>
                                <h3 className="text-lg font-bold text-secondary mb-2 group-hover:text-accent transition-colors">{cat.name}</h3>
                                <p className="text-sm text-gray-500">{cat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 2d. Special Offers Section */}
            <section id="special-offers" className="w-full py-16 text-white" style={{ background: "linear-gradient(135deg, #01303f 0%, #031a22 100%)" }}>
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center mb-12">
                        <span className="px-4 py-1 bg-accent text-white rounded-full text-sm font-bold tracking-wider mb-4 uppercase">Limited Time</span>
                        <h2 className="text-3xl font-bold text-center relative inline-block">
                            Special Offers
                            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-1 bg-accent"></span>
                        </h2>
                    </div>

                    {!loading && offerProducts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {offerProducts.map((product) => {
                                const discountPercentage = Math.round(((product.labeledPrice - product.price) / product.labeledPrice) * 100);
                                return (
                                    <div key={product.productId} className="bg-white rounded-2xl overflow-hidden shadow-2xl relative group transform hover:-translate-y-2 transition-all duration-300">
                                        <div className="absolute top-4 right-4 bg-red-500 text-white font-bold px-3 py-1 rounded-full z-10 shadow-md">
                                            {discountPercentage}% OFF
                                        </div>
                                        <div className="h-48 w-full bg-gray-100 p-4 flex justify-center items-center relative overflow-hidden">
                                            <img src={product.images?.[0] || 'https://via.placeholder.com/300'} alt={product.productName} className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-secondary mb-2 line-clamp-1">{product.productName}</h3>
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="text-2xl font-bold text-accent">Rs. {product.price.toLocaleString()}</span>
                                                <span className="text-sm text-gray-400 line-through">Rs. {product.labeledPrice.toLocaleString()}</span>
                                            </div>
                                            <button 
                                                onClick={() => navigate(`/overview/${product.productId}`)}
                                                className="w-full py-3 rounded-lg text-white font-bold transition-opacity hover:opacity-90"
                                                style={{ background: "linear-gradient(to right, #4facfe, #00f2fe, #a18cd1)" }}
                                            >
                                                View Deal
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-center text-gray-300">No special offers available at the moment. Check back soon!</p>
                    )}
                </div>
            </section>

            {/* 2f. Customer Testimonials */}
            <section className="w-full py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-secondary mb-12 relative">
                        What Our Customers Say
                        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-1" style={{ background: "linear-gradient(to right, #4facfe, #00f2fe, #a18cd1)" }}></span>
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((test, index) => (
                            <div key={index} className="bg-primary/20 p-8 rounded-2xl relative shadow-sm hover:shadow-md transition-shadow">
                                <div className="text-accent opacity-20 absolute top-4 left-4 text-6xl font-serif">"</div>
                                <div className="relative z-10">
                                    <div className="flex gap-1 mb-4 text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} className={i < test.rating ? "" : "text-gray-300"} />
                                        ))}
                                    </div>
                                    <p className="text-gray-700 italic mb-6">"{test.quote}"</p>
                                    <div>
                                        <h4 className="font-bold text-secondary">{test.name}</h4>
                                        <p className="text-sm text-gray-500">{test.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 2g. Brand Logos Section */}
            <section className="w-full py-12 bg-gray-50 overflow-hidden border-y border-gray-200">
                <div className="container mx-auto px-4">
                    <h3 className="text-xl font-bold text-center text-gray-500 mb-8 uppercase tracking-widest">Our Trusted Brands</h3>
                    <div className="flex overflow-x-auto pb-4 hide-scrollbar justify-start md:justify-center items-center gap-8 md:gap-16 px-4">
                        {brands.map((brand, index) => (
                            <div key={index} className="flex-shrink-0 text-2xl md:text-3xl font-black text-gray-300 hover:text-accent transition-colors cursor-default select-none">
                                {brand}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 2h. Newsletter & 2i, 2j Previews */}
            <section className="w-full py-16" style={{ background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 50%, #a18cd1 100%)" }}>
                <div className="container mx-auto px-4">
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            {/* Newsletter / About Preview */}
                            <div className="p-10 md:p-12 flex flex-col justify-center">
                                <h3 className="text-2xl font-bold text-secondary mb-4">About i-Computers</h3>
                                <p className="text-gray-600 mb-6">
                                    We are Sri Lanka's premier destination for high-quality computers and accessories. With over a decade of experience, we pride ourselves on offering the best technology with unmatched customer service.
                                </p>
                                <div className="mb-8">
                                    <Link to="/about" className="text-accent font-bold hover:underline inline-flex items-center">
                                        Learn More About Us &rarr;
                                    </Link>
                                </div>
                                
                                <div className="pt-8 border-t border-gray-200">
                                    <h4 className="font-bold text-secondary mb-2">Stay Updated</h4>
                                    <p className="text-sm text-gray-500 mb-4">Subscribe to receive exclusive offers and tech news.</p>
                                    <form onSubmit={(e) => { e.preventDefault(); toast.success("Subscribed successfully!"); }} className="flex">
                                        <input type="email" placeholder="Email address" required className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:border-accent" />
                                        <button type="submit" className="px-4 py-2 bg-secondary text-white font-medium rounded-r-lg hover:bg-opacity-90 transition-colors">
                                            Subscribe
                                        </button>
                                    </form>
                                </div>
                            </div>
                            
                            {/* Contact Preview */}
                            <div className="bg-gray-50 p-10 md:p-12 border-t md:border-t-0 md:border-l border-gray-200 flex flex-col justify-center">
                                <h3 className="text-2xl font-bold text-secondary mb-6">Visit Our Store</h3>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-primary text-accent flex items-center justify-center flex-shrink-0">
                                            <FaMapMarkerAlt />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-secondary">Location</h4>
                                            <p className="text-gray-600">123 Main Street<br/>Colombo 03, Sri Lanka</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-primary text-accent flex items-center justify-center flex-shrink-0">
                                            <FaPhone />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-secondary">Phone</h4>
                                            <p className="text-gray-600">+94 11 234 5678</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-primary text-accent flex items-center justify-center flex-shrink-0">
                                            <FaHeadset />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-secondary">Business Hours</h4>
                                            <p className="text-gray-600">Mon - Sat: 9:00 AM - 6:00 PM<br/>Sunday: Closed</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <Link to="/contact" className="w-full block text-center py-3 border-2 border-secondary text-secondary font-bold rounded-lg hover:bg-secondary hover:text-white transition-colors">
                                        Get in Touch
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
