import { Link } from "react-router-dom";
import { FaGem, FaUsers, FaEye, FaBullseye, FaCheckCircle, FaLaptopCode, FaWrench, FaSmile } from "react-icons/fa";

export default function AboutContent() {
    return (
        <div className="w-full bg-white min-h-screen">
            {/* Hero Section */}
            <section className="w-full py-20 px-4 text-center text-white" style={{ background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 50%, #a18cd1 100%)" }}>
                <div className="container mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">About Isuru Computers</h1>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
                        Pioneering the tech landscape in Sri Lanka with premium quality products and unmatched customer service.
                    </p>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-16 container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <img 
                            src="https://images.unsplash.com/photo-1531297172867-4f50ef916428?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                            alt="Computer Store" 
                            className="rounded-2xl shadow-xl w-full object-cover h-[400px]"
                        />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-secondary mb-6 relative inline-block">
                            Our Story
                            <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-accent"></span>
                        </h2>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            Founded in 2015, Isuru Computers started with a simple mission: to make high-quality computing accessible to everyone in Sri Lanka. What began as a small shop in Colombo has grown into a trusted destination for tech enthusiasts, professionals, and students alike.
                        </p>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            We believe that technology should empower people. That's why we don't just sell computers; we provide solutions tailored to your specific needs, backed by expert advice and comprehensive after-sales support.
                        </p>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <FaCheckCircle className="text-accent" />
                                <span className="font-medium text-secondary">Authorized Dealer</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaCheckCircle className="text-accent" />
                                <span className="font-medium text-secondary">Certified Technicians</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-accent mb-6">
                                <FaBullseye size={28} />
                            </div>
                            <h3 className="text-2xl font-bold text-secondary mb-4">Our Mission</h3>
                            <p className="text-gray-600 leading-relaxed">
                                To provide our customers with top-tier technological products and solutions, ensuring quality, affordability, and exceptional service that enhances their personal and professional lives.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-accent mb-6">
                                <FaEye size={28} />
                            </div>
                            <h3 className="text-2xl font-bold text-secondary mb-4">Our Vision</h3>
                            <p className="text-gray-600 leading-relaxed">
                                To become the most trusted and innovative technology retailer in Sri Lanka, setting the benchmark for customer satisfaction and technological advancement.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-16 container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-secondary mb-12 relative">
                    Our Core Values
                    <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-1" style={{ background: "linear-gradient(to right, #4facfe, #00f2fe, #a18cd1)" }}></span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center p-6 border border-gray-100 rounded-xl hover:border-accent transition-colors">
                        <FaGem className="text-4xl text-accent mx-auto mb-4" />
                        <h4 className="font-bold text-secondary mb-2">Quality</h4>
                        <p className="text-sm text-gray-500">We never compromise on the authenticity and quality of our products.</p>
                    </div>
                    <div className="text-center p-6 border border-gray-100 rounded-xl hover:border-accent transition-colors">
                        <FaUsers className="text-4xl text-accent mx-auto mb-4" />
                        <h4 className="font-bold text-secondary mb-2">Customer First</h4>
                        <p className="text-sm text-gray-500">Your satisfaction is the driving force behind everything we do.</p>
                    </div>
                    <div className="text-center p-6 border border-gray-100 rounded-xl hover:border-accent transition-colors">
                        <FaLaptopCode className="text-4xl text-accent mx-auto mb-4" />
                        <h4 className="font-bold text-secondary mb-2">Innovation</h4>
                        <p className="text-sm text-gray-500">We stay ahead of the curve to bring you the latest technology.</p>
                    </div>
                    <div className="text-center p-6 border border-gray-100 rounded-xl hover:border-accent transition-colors">
                        <FaWrench className="text-4xl text-accent mx-auto mb-4" />
                        <h4 className="font-bold text-secondary mb-2">Reliability</h4>
                        <p className="text-sm text-gray-500">Dependable repairs and honest advice you can count on.</p>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #01303f 0%, #031a22 100%)" }}>
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-accent mb-2">10+</div>
                            <div className="text-gray-300 font-medium">Years Experience</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-accent mb-2">15k+</div>
                            <div className="text-gray-300 font-medium">Happy Customers</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-accent mb-2">500+</div>
                            <div className="text-gray-300 font-medium">Products</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-accent mb-2">50+</div>
                            <div className="text-gray-300 font-medium">Corporate Clients</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 text-center container mx-auto px-4">
                <h2 className="text-3xl font-bold text-secondary mb-6">Ready to upgrade your tech?</h2>
                <p className="text-gray-600 mb-8 max-w-xl mx-auto">Explore our extensive collection of laptops, desktops, and accessories tailored for every need and budget.</p>
                <Link to="/products" className="inline-block px-8 py-3 text-white font-bold rounded-full hover:shadow-lg transition-transform hover:-translate-y-1" style={{ background: "linear-gradient(to right, #4facfe, #00f2fe, #a18cd1)" }}>
                    Explore Products
                </Link>
            </section>
        </div>
    );
}
