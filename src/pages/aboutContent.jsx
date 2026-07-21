import { Link } from 'react-router-dom';
import { FaLaptopCode, FaShippingFast, FaHeadset, FaShieldAlt } from 'react-icons/fa';

export default function AboutContent() {
    return (
        <div className="w-full bg-[#0b0f19] text-white overflow-hidden">
            
            {/* Banner Section */}
            <div className="relative py-24 md:py-32 flex items-center justify-center text-center px-4 overflow-hidden border-b border-[#1f2937]">
                <div className="absolute inset-0 bg-[#111827] z-0"></div>
                <div className="absolute top-0 right-[-10%] w-[50%] h-full bg-[#0ea5e9]/10 blur-[120px] rounded-full z-0 pointer-events-none"></div>
                
                <div className="relative z-10 max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Empowering Your <span className="text-[#0ea5e9]">Digital Journey</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                        ISURU COMPUTERS is your premium destination for cutting-edge technology, expert IT solutions, and unparalleled customer service.
                    </p>
                    <Link to="/contact" className="inline-block px-8 py-3 bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-bold rounded-full shadow-[0_0_20px_rgba(14,165,233,0.4)] transition-all hover:scale-105">
                        Get in Touch
                    </Link>
                </div>
            </div>

            {/* Statistics Section */}
            <div className="py-12 bg-[#0ea5e9]/5 border-b border-[#1f2937]">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <h3 className="text-4xl font-bold text-[#0ea5e9] mb-2">5+</h3>
                            <p className="text-gray-400 uppercase tracking-wider text-sm font-semibold">Years Experience</p>
                        </div>
                        <div>
                            <h3 className="text-4xl font-bold text-[#0ea5e9] mb-2">10k+</h3>
                            <p className="text-gray-400 uppercase tracking-wider text-sm font-semibold">Happy Customers</p>
                        </div>
                        <div>
                            <h3 className="text-4xl font-bold text-[#0ea5e9] mb-2">500+</h3>
                            <p className="text-gray-400 uppercase tracking-wider text-sm font-semibold">Products Available</p>
                        </div>
                        <div>
                            <h3 className="text-4xl font-bold text-[#0ea5e9] mb-2">99%</h3>
                            <p className="text-gray-400 uppercase tracking-wider text-sm font-semibold">Satisfaction Rate</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mission & Vision */}
            <div className="py-20 container mx-auto px-4 max-w-7xl">
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="bg-[#111827] p-10 rounded-2xl border border-[#1f2937] hover:border-[#0ea5e9]/30 transition-colors shadow-lg">
                        <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                            <span className="w-12 h-1 bg-[#0ea5e9] rounded-full"></span> Our Mission
                        </h2>
                        <p className="text-gray-400 leading-relaxed text-lg">
                            To provide top-tier computer hardware and innovative IT solutions that empower individuals and businesses to achieve their full technological potential. We strive to offer an unmatched shopping experience through expert guidance and premium products.
                        </p>
                    </div>
                    <div className="bg-[#111827] p-10 rounded-2xl border border-[#1f2937] hover:border-[#8b5cf6]/30 transition-colors shadow-lg">
                        <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                            <span className="w-12 h-1 bg-[#8b5cf6] rounded-full"></span> Our Vision
                        </h2>
                        <p className="text-gray-400 leading-relaxed text-lg">
                            To become the leading and most trusted technology retail partner in the region, known for our commitment to quality, authenticity, and pushing the boundaries of customer satisfaction in the digital retail space.
                        </p>
                    </div>
                </div>
            </div>

            {/* Why Choose Us & Services */}
            <div className="py-20 bg-[#111827] border-y border-[#1f2937]">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose <span className="text-[#0ea5e9]">Us?</span></h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">We don't just sell computers; we provide complete technology solutions tailored to your specific needs.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-[#0b0f19] p-8 rounded-xl border border-[#1f2937] text-center hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-16 h-16 bg-[#0ea5e9]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#0ea5e9]">
                                <FaShieldAlt size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Genuine Products</h3>
                            <p className="text-gray-400 text-sm">100% authentic hardware sourced directly from authorized global distributors with official warranty.</p>
                        </div>

                        <div className="bg-[#0b0f19] p-8 rounded-xl border border-[#1f2937] text-center hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-16 h-16 bg-[#0ea5e9]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#0ea5e9]">
                                <FaLaptopCode size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Expert Assembly</h3>
                            <p className="text-gray-400 text-sm">Professional PC building and cable management services by certified IT technicians.</p>
                        </div>

                        <div className="bg-[#0b0f19] p-8 rounded-xl border border-[#1f2937] text-center hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-16 h-16 bg-[#0ea5e9]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#0ea5e9]">
                                <FaShippingFast size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Fast Delivery</h3>
                            <p className="text-gray-400 text-sm">Express island-wide secure shipping with real-time tracking for all your urgent tech needs.</p>
                        </div>

                        <div className="bg-[#0b0f19] p-8 rounded-xl border border-[#1f2937] text-center hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-16 h-16 bg-[#0ea5e9]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#0ea5e9]">
                                <FaHeadset size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">24/7 Support</h3>
                            <p className="text-gray-400 text-sm">Dedicated after-sales support team ready to assist you with troubleshooting and queries.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-24 text-center px-4 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[100%] bg-[#0ea5e9]/10 blur-[120px] rounded-full z-0 pointer-events-none"></div>
                <div className="relative z-10 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Upgrade Your Setup?</h2>
                    <p className="text-gray-400 text-lg mb-8">Browse our latest collection of premium hardware and peripherals.</p>
                    <Link to="/products" className="inline-block px-10 py-4 bg-white text-[#0b0f19] font-bold rounded-full shadow-lg hover:bg-gray-200 transition-all hover:scale-105">
                        Shop Now
                    </Link>
                </div>
            </div>
            
        </div>
    );
}
