import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import toast from "react-hot-toast";

export default function ContactContent() {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission
        setTimeout(() => {
            toast.success("Message sent successfully! We will get back to you soon.");
            e.target.reset();
        }, 800);
    };

    return (
        <div className="w-full bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <section className="w-full py-16 px-4 text-center text-white" style={{ background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 50%, #a18cd1 100%)" }}>
                <div className="container mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
                    <p className="text-lg max-w-2xl mx-auto opacity-90">
                        Have a question about a product, need technical support, or want to partner with us? We're here to help!
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 -mt-16 z-10 relative">
                    
                    {/* Contact Info Cards */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-md flex items-start gap-4">
                            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-accent flex-shrink-0">
                                <FaMapMarkerAlt size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-secondary text-lg mb-1">Our Location</h3>
                                <p className="text-gray-600">123 Main Street,<br />Colombo 03,<br />Sri Lanka</p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md flex items-start gap-4">
                            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-accent flex-shrink-0">
                                <FaPhoneAlt size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-secondary text-lg mb-1">Call Us</h3>
                                <p className="text-gray-600">+94 11 234 5678</p>
                                <p className="text-gray-600">+94 77 123 4567</p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md flex items-start gap-4">
                            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-accent flex-shrink-0">
                                <FaEnvelope size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-secondary text-lg mb-1">Email Us</h3>
                                <p className="text-gray-600">info@isurucomputers.lk</p>
                                <p className="text-gray-600">support@isurucomputers.lk</p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md flex items-start gap-4">
                            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-accent flex-shrink-0">
                                <FaClock size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-secondary text-lg mb-1">Business Hours</h3>
                                <p className="text-gray-600">Mon - Sat: 9:00 AM - 6:00 PM</p>
                                <p className="text-gray-600">Sunday & Public Holidays: Closed</p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h3 className="font-bold text-secondary text-lg mb-4 text-center">Follow Us</h3>
                            <div className="flex justify-center gap-4">
                                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-accent hover:text-white transition-colors">
                                    <FaFacebook size={18} />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-accent hover:text-white transition-colors">
                                    <FaInstagram size={18} />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-accent hover:text-white transition-colors">
                                    <FaTwitter size={18} />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-accent hover:text-white transition-colors">
                                    <FaLinkedin size={18} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form & Map */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white p-8 rounded-xl shadow-md">
                            <h2 className="text-2xl font-bold text-secondary mb-6 border-b pb-4">Send us a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                                        <input 
                                            type="text" 
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Your Email</label>
                                        <input 
                                            type="email" 
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                    <input 
                                        type="text" 
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                                        placeholder="How can we help you?"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                    <textarea 
                                        rows="5"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
                                        placeholder="Write your message here..."
                                    ></textarea>
                                </div>
                                <button 
                                    type="submit" 
                                    className="px-8 py-3 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all"
                                    style={{ background: "linear-gradient(to right, #4facfe, #00f2fe, #a18cd1)" }}
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>

                        {/* Map */}
                        <div className="bg-white p-2 rounded-xl shadow-md h-[400px]">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.58585978135!2d79.77380327339243!3d6.921922576082982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1714571830421!5m2!1sen!2sus" 
                                width="100%" 
                                height="100%" 
                                style={{ border: 0, borderRadius: '0.5rem' }} 
                                allowFullScreen="" 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
